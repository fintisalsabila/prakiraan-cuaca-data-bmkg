class TableOne extends HTMLElement{
    render() {
        this.innerHTML = `
                <div class="table-container _list-weather">
                    <h1 class="display-datetime"></h1>
                    <table class="table is-fullwidth">
                        <thead>
                        <tr class="is-selected">
                            <th>#</th>
                            <th>Area</th>
                            <th><abbr title="Longitude">Longitude</abbr></th>
                            <th><abbr title="Latitude">Latitude</abbr></th>
                            <th><abbr title="Kelembaban">Kelembaban</abbr></th>
                            <th><abbr title="Suhu">Suhu</abbr></th>                            
                            <th><abbr title="Tomorrow Kelembaban">H+1 Kelembaban</abbr></th>
                            <th><abbr title="Tomorrow Suhu">H+1 Suhu</abbr></th>                            
                            <th><abbr title="The Day After Tomorrow Kelembaban">H+2 Kelembaban</abbr></th>
                            <th><abbr title="The Day After Tomorrow Suhu">H+2 Suhu</abbr></th>                            
                        </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {
        this.innerHTML = ``;
    }
}

customElements.define("table-one", TableOne);