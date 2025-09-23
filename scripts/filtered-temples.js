document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const nav = document.querySelector("nav");

    hamburger.addEventListener("click", () => {
        // Toggle active class on nav
        nav.classList.toggle("active");

        // Change button symbol between ☰ and ✖
        if (hamburger.textContent === "☰") {
            hamburger.textContent = "✖"; // close icon
        } else {
            hamburger.textContent = "☰"; // hamburger icon
        }
    });
});

const templeCards = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // Add more temple objects here...
    {
        templeName: "Oakland California",
        location: "Oakland, California",
        dedicated: "1964, November, 19",
        area: 80157,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/oakland-california-temple/oakland-california-temple-2654-main.jpg"
    },
    {
        templeName: "Snowflake Arizona",
        location: "Snowflake, Arizona",
        dedicated: "2002, March, 3",
        area: 18621,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/snowflake-arizona-temple/snowflake-arizona-temple-46560-main.jpg"
    },
];

function displayTemples(filterTemples) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = ""; /* this will clear out the old cards */

    filterTemples.forEach((temple) => {
        const card = document.createElement("article");
        card.className = "temple-card";

        const h2 = document.createElement("h2");
        h2.textContent = temple.templeName;

        const p1 = document.createElement("p");
        p1.innerHTML = `<strong>Location:</strong> ${temple.location}`;

        const p2 = document.createElement("p");
        p2.innerHTML = `<strong>Dedicated:</strong> ${temple.dedicated}`;

        const p3 = document.createElement("p");
        p3.innerHTML = `<strong>Size:</strong> ${Number(temple.area).toLocaleString()} sq ft`;

        const img = document.createElement("img");
        img.src = temple.imageUrl;
        img.alt = `Image of ${temple.templeName}`;
        img.loading = "lazy";

        card.append(h2, p1, p2, p3, img);
        gallery.appendChild(card);
    });
}

// Show all temples initially
displayTemples(templeCards);


document.getElementById("filter-old").addEventListener("click", (event) => {
    event.preventDefault(); // stop link from jumping
    const oldTemples = templeCards.filter((temple) => {
        // pull out the year from the dedicated string
        const year = parseInt(temple.dedicated.split(",")[0]);
        return year < 1900;
    });
    displayTemples(oldTemples);
});

document.getElementById("filter-new").addEventListener("click", (event) => {
    event.preventDefault(); // stop link from jumping
    const newTemples = templeCards.filter((temple) => {
        // pull out the year from the dedicated string
        const year = parseInt(temple.dedicated.split(",")[0]);
        return year >= 2000;
    });
    displayTemples(newTemples);
});

document.getElementById("filter-large").addEventListener("click", (event) => {
    event.preventDefault();
    const largeTemples = templeCards.filter((temple) => temple.area >= 90000);
    displayTemples(largeTemples);
});

document.getElementById('filter-small').addEventListener("click", (event) => {
    event.preventDefault();
    const smallTemples = templeCards.filter((temple) => temple.area <= 10000);
    displayTemples(smallTemples);
});

document.getElementById("filter-home").addEventListener("click", (event) => {
    event.preventDefault(); // stop the link from reloading page
    displayTemples(templeCards); // show all temples again
});
