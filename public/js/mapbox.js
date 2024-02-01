function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    } else {
        return num.toString();
    }
}

mapboxgl.accessToken = window.mapboxAccessToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID on your HTML
    style: 'mapbox://styles/luismirandad27/cls155ejw00bd01pofo5bae4f', // style URL
    center: [-98.5795, 39.8283], 
    zoom: 3 
});

// Adding zoom and rotation control map
map.addControl(new mapboxgl.NavigationControl());

// Click event State Boundaries
map.on("click", "covid-19-boundaries", (e) => {

    const properties = e.features[0]?.properties;

    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
            `
            <h4 class="popup-title">${properties.NAME}</h4>
            <div class="popup-stats">
                <div class="popup-stat">
                    <span class="popup-stat-label">Total Cases:</span>
                    <span class="popup-stat-value">${formatNumber(properties.TOTAL_CASES)}</span>
                </div>
                <div class="popup-stat">
                    <span class="popup-stat-label">Total Deaths:</span>
                    <span class="popup-stat-value">${formatNumber(properties.TOTAL_DEATHS)}</span>
                </div>
                <div class="popup-stat">
                    <span class="popup-stat-label">Total Recovered:</span>
                    <span class="popup-stat-value">${formatNumber(properties.TOTAL_RECOVERED)}</span>
                </div>
                <div class="popup-stat">
                    <span class="popup-stat-label">Total Tests:</span>
                    <span class="popup-stat-value">${formatNumber(properties.TOTAL_TESTS)}</span>
                </div>
            </div>`
        )
        .addTo(map);
});

