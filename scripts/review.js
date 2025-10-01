// Determines current year so it can be placed in the footer.
const options = { year: "numeric" }
const currentyear = new Date().toLocaleDateString("en-US", options);
document.querySelector("#currentyear").innerHTML = `&copy; ${currentyear} ║ Kris Akin ║ Arizona`;

// Determines when the file was last modified.
document.getElementById("lastmodified").innerHTML = `Last modified: ${document.lastModified}`;

// Review counter using localStorage
let reviewCount = localStorage.getItem('reviewCount');

// If no count exists, start at 0
if (reviewCount === null) {
    reviewCount = 0;
}

// Increment the counter
reviewCount = parseInt(reviewCount) + 1;

// Save the new count back to localStorage
localStorage.setItem('reviewCount', reviewCount);

// Display the count on the page
document.getElementById('reviewCount').textContent = reviewCount;

// Get form data from URL parameters
const urlParams = new URLSearchParams(window.location.search);

// Product name mapping
const products = [
    { id: "fc-1888", name: "flux capacitor" },
    { id: "fc-2050", name: "power laces" },
    { id: "fs-1987", name: "time circuits" },
    { id: "ac-2000", name: "low voltage reactor" },
    { id: "jj-1969", name: "warp equalizer" }
];

// Get product name from ID
const productId = urlParams.get('productName');
const product = products.find(p => p.id === productId);
const productName = product ? product.name : 'N/A';

// Get other form values
const rating = urlParams.get('rating') || 'N/A';
const installDate = urlParams.get('installDate') || 'N/A';
const features = urlParams.getAll('features');
const reviewText = urlParams.get('reviewText') || 'N/A';
const userName = urlParams.get('userName') || 'Anonymous';

// Display the data
document.getElementById('displayProduct').textContent = productName;
document.getElementById('displayRating').textContent = '⭐'.repeat(rating);
document.getElementById('displayInstallDate').textContent = installDate;
document.getElementById('displayFeatures').textContent = features.length > 0 ? features.join(', ') : 'None selected';
document.getElementById('displayReview').textContent = reviewText;
document.getElementById('displayUserName').textContent = userName;