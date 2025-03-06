// Countdown Timer
const countdownDate = new Date("March 22, 2025 23:59:59").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days
        .toString()
        .padStart(2, "0");
    document.getElementById("hours").innerText = hours
        .toString()
        .padStart(2, "0");
    document.getElementById("minutes").innerText = minutes
        .toString()
        .padStart(2, "0");
    document.getElementById("seconds").innerText = seconds
        .toString()
        .padStart(2, "0");

    if (distance < 0) {
        clearInterval(countdownTimer);
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
    }
}

const countdownTimer = setInterval(updateCountdown, 1000);
updateCountdown();

// Scroll to Registration Form
function scrollToForm() {
    const registrationForm = document.getElementById("registrationForm");
    registrationForm.scrollIntoView({ behavior: "smooth" });
}

// FAQ Accordion
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        // Close all FAQ items
        faqItems.forEach((faqItem) => {
            faqItem.classList.remove("active");
            const toggle = faqItem.querySelector(".faq-toggle i");
            toggle.className = "fas fa-plus";
        });

        // Toggle clicked FAQ
        if (!isActive) {
            item.classList.add("active");
            const toggle = item.querySelector(".faq-toggle i");
            toggle.className = "fas fa-minus";
        }
    });
});

// Toppers Carousel
const track = document.getElementById("toppersTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const cards = track.querySelectorAll(".topper-card");

let currentIndex = 0;
let visibleCards = 3;
let cardWidth = 0;
let maxIndex = 0;

function updateCarouselSettings() {
    if (window.innerWidth < 768) {
        visibleCards = 1;
    } else if (window.innerWidth < 992) {
        visibleCards = 2;
    } else {
        visibleCards = 3;
    }

    // Calculate card width including margins
    const cardStyle = window.getComputedStyle(cards[0]);
    const marginLeft = parseFloat(cardStyle.marginLeft);
    const marginRight = parseFloat(cardStyle.marginRight);
    cardWidth = cards[0].offsetWidth + marginLeft + marginRight;

    maxIndex = cards.length - visibleCards;
    if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
    }
    updateCarousel();
}

function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;

    prevBtn.style.opacity = prevBtn.disabled ? "0.5" : "1";
    nextBtn.style.opacity = nextBtn.disabled ? "0.5" : "1";
}

prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

nextBtn.addEventListener("click", () => {
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
    }
});

window.addEventListener("load", updateCarouselSettings);
window.addEventListener("resize", updateCarouselSettings);

// Form Validation
// const scholarshipForm = document.getElementById("scholarshipForm");

// scholarshipForm.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const fullName = document.getElementById("fullName").value;
//     const email = document.getElementById("email").value;
//     const phone = document.getElementById("phone").value;
//     const board = document.getElementById("board").value;
//     const stream = document.getElementById("stream").value;

//     if (!fullName || !email || !phone || !board || !stream) {
//         alert("Please fill in all fields");
//         return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//         alert("Please enter a valid email address");
//         return;
//     }

//     const phoneRegex = /^\d{10}$/;
//     if (!phoneRegex.test(phone)) {
//         alert("Please enter a valid 10-digit phone number");
//         return;
//     }
// });

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll(
        ".benefits-column, .timeline-item, .exam-info > div, .topper-card, .contact-item"
    );

    elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }
    });
};

document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(
        ".benefits-column, .timeline-item, .exam-info > div, .topper-card, .contact-item"
    );

    elements.forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "all 0.5s ease";
    });

    animateOnScroll();
});

window.addEventListener("scroll", animateOnScroll);
