// Static values for now
const temperature = 5; // °C
const windSpeed = 10;      // km/h

function calculateWindChill(tempC, speedKmh) {
    // Wind chill formula (Environment Canada, Celsius + km/h)
    return (
        13.12 +
        0.6215 * tempC -
        11.37 * Math.pow(speedKmh, 0.16) +
        0.3965 * tempC * Math.pow(speedKmh, 0.16)
    ).toFixed(1);
}

function displayWindChill() {
    const windchillElement = document.getElementById("windchill");

    if (!windchillElement) {
        console.error("Windchill element not found in DOM!");
        return;
    }

    // Only calculate if conditions are met
    if (temperature <= 10 && windSpeed > 4.8) {
        windchillElement.textContent = calculateWindChill(temperature, windSpeed) + " °C";
    } else {
        windchillElement.textContent = "N/A";
    }
}

displayWindChill();



// Inject cards into <section class="gallery">
const gallery = document.querySelector(".gallery");

temples.forEach((temple) => {
    const card = document.createElement("article");
    card.classList.add("temple-card");

    card.innerHTML = `
    <h2>${temple.templeName}</h2>
    <p><strong>Location:</strong> ${temple.location}</p>
    <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
    <p><strong>Size:</strong> ${Number(temple.area).toLocaleString()} sq ft</p>
    <img
      src="${temple.imageUrl}"
      alt="Image of ${temple.templeName}"
      loading="lazy"
    >
  `;

    gallery.appendChild(card);
});
