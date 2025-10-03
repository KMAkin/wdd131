// JavaScript for Stories Page - No Excuse Outdoors

// Array of testimonials
const testimonials = [
    {
        text: `Participating in the adaptive hunting program changed my life. I never thought I would be able to hunt again after my accident, but the team made it possible.`,
        author: `- John D., Participant`
    },
    {
        text: `The accessible fishing trips gave me back a piece of myself I thought was lost forever. Being outdoors again has been incredible for my mental health.`,
        author: `- Sarah M., Participant`
    },
    {
        text: `Volunteering with No Excuse Outdoors has been one of the most rewarding experiences of my life. Seeing participants succeed is truly inspiring.`,
        author: `- Mike R., Volunteer`
    },
    {
        text: `I was hesitant at first, but the supportive community and adaptive equipment made all the difference. Now I look forward to every outdoor adventure.`,
        author: `- Lisa K., Participant`
    },
    {
        text: `The camping trip was amazing! I didn't think I could camp anymore, but with the accessible facilities and great staff, it was one of the best weekends ever.`,
        author: `- Robert T., Participant`
    }
];

let currentTestimonialIndex = 0;

// Function to display testimonial
function displayTestimonial(index) {
    const testimonialText = document.querySelector('.testimonial-text');
    const testimonialAuthor = document.querySelector('.testimonial-author');

    if (testimonialText && testimonialAuthor) {
        // Fade out
        testimonialText.style.opacity = '0';
        testimonialAuthor.style.opacity = '0';

        setTimeout(() => {
            testimonialText.textContent = `"${testimonials[index].text}"`;
            testimonialAuthor.textContent = testimonials[index].author;

            // Fade in
            testimonialText.style.opacity = '1';
            testimonialAuthor.style.opacity = '1';
        }, 300);
    }
}

// Function to show next testimonial
function showNextTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    displayTestimonial(currentTestimonialIndex);
}

// Function to show previous testimonial
function showPrevTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
    displayTestimonial(currentTestimonialIndex);
}

// Function to setup testimonial navigation
function setupTestimonialNavigation() {
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', showPrevTestimonial);
        nextButton.addEventListener('click', showNextTestimonial);

        // Display initial testimonial
        displayTestimonial(currentTestimonialIndex);

        // Add transition styles
        const testimonialText = document.querySelector('.testimonial-text');
        const testimonialAuthor = document.querySelector('.testimonial-author');

        if (testimonialText && testimonialAuthor) {
            testimonialText.style.transition = 'opacity 0.3s ease';
            testimonialAuthor.style.transition = 'opacity 0.3s ease';
        }
    }
}

// Function to filter stories by activity
function setupStoryFilter() {
    const filterSelect = document.getElementById('story-filter');
    const storyCards = document.querySelectorAll('.story-card');

    if (filterSelect && storyCards.length > 0) {
        filterSelect.addEventListener('change', (e) => {
            const selectedActivity = e.target.value;

            storyCards.forEach(card => {
                const cardActivity = card.dataset.activity;

                if (selectedActivity === 'all' || cardActivity === selectedActivity) {
                    card.classList.remove('hidden');
                    // Add fade-in animation
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.classList.add('hidden');
                }
            });

            // Store filter preference using template literal
            const filterMessage = `Last filter: ${selectedActivity}`;
            console.log(filterMessage);
        });
    }
}

// Function to track story views in memory (since we cannot use localStorage)
const storyViews = {};

function trackStoryView(storyTitle) {
    if (storyViews[storyTitle]) {
        storyViews[storyTitle]++;
    } else {
        storyViews[storyTitle] = 1;
    }

    const viewMessage = `${storyTitle} has been viewed ${storyViews[storyTitle]} time(s)`;
    console.log(viewMessage);
}

// Function to setup story tracking
function setupStoryTracking() {
    const storyCards = document.querySelectorAll('.story-card');

    storyCards.forEach(card => {
        const storyTitle = card.querySelector('h3');

        if (storyTitle) {
            // Track when story comes into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        trackStoryView(storyTitle.textContent);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.5
            });

            observer.observe(card);
        }
    });
}

// Initialize all story page functions
document.addEventListener('DOMContentLoaded', () => {
    setupTestimonialNavigation();
    setupStoryFilter();
    setupStoryTracking();
});