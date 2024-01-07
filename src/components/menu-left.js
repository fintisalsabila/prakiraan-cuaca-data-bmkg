import $ from "jquery";

/* Required Tools */
const convert = require('xml-js');
const CronJob = require('cron').CronJob;
/* Required Tools */

class MenuLeft extends HTMLElement {
    constructor() {
        super();
        this.city = 'DKIJakarta';
    }

    render() {
        console.log(this.city);
        this.innerHTML = `
            <img src="../icon.png" alt="Logo">
            <aside class="menu">
                <ul class="menu-list">
                    <li><a onclick='document.getElementsByTagName("menu-left")[0].setAttribute("city", "DKIJakarta")' class=${this.city === 'DKIJakarta' ? 'is-active':''}>Jakarta</a></li>
                    <li><a onclick='document.getElementsByTagName("menu-left")[0].setAttribute("city", "Bali")' class=${this.city === 'Bali' ? 'is-active':''}>Bali</a></li>
                    <li><a onclick='document.getElementsByTagName("menu-left")[0].setAttribute("city", "DIYogyakarta")' class=${this.city === 'DIYogyakarta' ? 'is-active':''}>DI Yogyakarta</a></li>
                    <li><a onclick='document.getElementsByTagName("menu-left")[0].setAttribute("city", "SumateraUtara")' class=${this.city === 'SumateraUtara' ? 'is-active':''}>Sumatera Utara</a></li>
                    <li><a onclick='document.getElementsByTagName("menu-left")[0].setAttribute("city", "Lampung")' class=${this.city === 'Lampung' ? 'is-active':''}>Lampung</a></li>
                    <li><a onclick='document.getElementsByTagName("menu-left")[0].setAttribute("city", "Aceh")' class=${this.city === 'Aceh' ? 'is-active':''}>Aceh</a></li>
                </ul>
            </aside>
        `;

        this.getWeather(`https://data.bmkg.go.id/datamkg/MEWS/DigitalForecast/DigitalForecast-${this.city}.xml`);
    }

    autoUpdateData() {
        const job = new CronJob('0 0 * * *', () => {
            this.render();
        }, null, true, 'Asia/Jakarta');
        
        job.start();
    }

    connectedCallback() {
        /* Auto fetch everyday at 00:00 */
        this.autoUpdateData();
        /* End Auto fetch */
        this.render();
    }

    disconnectedCallback() {
        this.innerHTML = ``;
    }

    attributeChangedCallback(city, oldValue, newValue) {
        console.log(`woi`);
        if (oldValue !== newValue) {            
            this[city] = newValue;
            this.render();
        }
    }

    static get observedAttributes() {
        return ["city"]
    }

    // Fetching Data
    async getWeather(url) {
        try {
            const weather = await fetch(url)
                .then(response => response.text())
                .then(str => JSON.parse(convert.xml2json(str, { compact: true, spaces: 4 })))

            const tableContent = $("._list-weather tbody");
            tableContent.empty();


            const areas = weather.data.forecast.area || [];
            const { year, month, day, hour, minute, second } = weather.data.forecast.issue;

            const strDate = `${day._text}-${month._text}-${year._text}`;
            const strTime = `${hour._text}:${minute._text}:${second._text}`;

            $(".display-datetime").text(`Last Updated Data: ${strDate} ${strTime} [Otomatis mengambil ulang data setiap hari pada 00:00]`);
            areas.map((area, idx) => {
                tableContent.append(`
                    <tr>
                        <th>${idx+1}</th>
                        <td>${area.name[0]._text}</td>
                        <td>${area._attributes.longitude}</td>
                        <td>${area._attributes.latitude}</td>
                        <td>${area.parameter[3].timerange[0].value._text}% - ${area.parameter[1].timerange[0].value._text}%</td>
                        <td>${area.parameter[4].timerange[0].value[0]._text}°C - ${area.parameter[2].timerange[0].value[0]._text}°C</td>
                        <td>${area.parameter[3].timerange[1].value._text}% - ${area.parameter[1].timerange[1].value._text}%</td>
                        <td>${area.parameter[4].timerange[1].value[0]._text}°C - ${area.parameter[2].timerange[1].value[0]._text}°C</td>
                        <td>${area.parameter[3].timerange[2].value._text}% - ${area.parameter[1].timerange[2].value._text}%</td>
                        <td>${area.parameter[4].timerange[2].value[0]._text}°C - ${area.parameter[2].timerange[2].value[0]._text}°C</td>
                        <td>${area.parameter[5].timerange[2].value[0]._text} m/s</td>
                    </tr>
                `);
            });
        } catch (error) {
            console.log(error);
        }
    }
}

customElements.define("menu-left", MenuLeft);
