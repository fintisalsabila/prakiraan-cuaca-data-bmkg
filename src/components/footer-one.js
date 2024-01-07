class FooterOne extends HTMLElement {
    render() {
        this.innerHTML = `
            <div class="notification has-text-centered">
                <strong>Data Prakiraan oleh: </strong> <a target="_blank" href="https://data.bmkg.go.id/prakiraan-cuaca/">BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)</a>.
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

customElements.define("footer-one", FooterOne);
