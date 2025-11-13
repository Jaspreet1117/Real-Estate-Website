let selectedRole = "";
let currentRating = 0;

function selectRole(button) {
    document.querySelectorAll(".role-buttons button").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    selectedRole = button.textContent;
}

function proceedToReview() {
    const city = document.getElementById("city").value.trim();
    const name = document.getElementById("name").value.trim();

    if (!city || !selectedRole || !name) {
    alert("⚠ Please fill all fields before proceeding.");
    return;
    }

    document.getElementById("page1").classList.remove("active");
    document.getElementById("page2").classList.add("active");

    document.getElementById("reviewIntro").innerText =
    `Reviewing as ${selectedRole} for ${city}. Thank you, ${name}!`;
}

function goBack() {
    document.getElementById("page2").classList.remove("active");
    document.getElementById("page1").classList.add("active");
}

function setRating(rating) {
    currentRating = rating;
    document.querySelectorAll(".star").forEach((star, i) => {
    star.classList.toggle("selected", i < rating);
    });
}

function submitReview() {
    const pros = document.getElementById("pros").value.trim();
    const cons = document.getElementById("cons").value.trim();
    const review = document.getElementById("review").value.trim();

    if (currentRating === 0 || !pros || !cons || !review) {
    alert("⚠ Please complete all fields and provide a rating before submitting.");
    return;
    }

    const reviewData = {
    role: selectedRole,
    pros,
    cons,
    review,
    rating: currentRating,
    date: new Date().toLocaleDateString(),
    };

    // Store in localStorage
    let reviews = JSON.parse(localStorage.getItem("reviews")) || []; // oposite for stringify
    reviews.push(reviewData);
    localStorage.setItem("reviews", JSON.stringify(reviews)); //save
    // stringify convert javascript obj or array into JSON string
    //when want to store or send data to local stoorage then we use stringify
    //returns a string

    alert("✅ Thank you for submitting your review!");
    window.location.href = "page1.html"; // go back to property page
}