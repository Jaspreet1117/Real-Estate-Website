document.getElementById("propertyName").textContent =
    "Modern 3-Bedroom Villa in Goa";

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const submitBtn = document.getElementById("submitBtn");
const commentBox = document.getElementById("commentBox");
const stars = document.querySelectorAll(".stars span");

let selected = "";
let rating = 0;

// Emoji Rating Logic
stars.forEach((emoji, idx) => {
    emoji.addEventListener("click", () => {
    rating = idx + 1;

    stars.forEach((e, i) => {
        e.style.transform = (i === idx) ? "scale(1.5)" : "scale(1)";
        e.style.opacity = (i === idx) ? "1" : "0.5";
    });
    });
});

// Yes Button
yesBtn.addEventListener("click", () => {
    yesBtn.style.background = "#2563eb";
    yesBtn.style.color = "#fff";

    noBtn.style.background = "none";
    noBtn.style.color = "#2563eb";

    selected = "Yes";
});

// No Button
noBtn.addEventListener("click", () => {
    noBtn.style.background = "#2563eb";
    noBtn.style.color = "#fff";

    yesBtn.style.background = "none";
    yesBtn.style.color = "#2563eb";

    selected = "No";
});

// Submit Button Logic
submitBtn.addEventListener("click", () => {
    if (!rating) {
    Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please select a face rating before submitting.",
        confirmButtonColor: "#2563eb",
    });
    return;
    }

    if (!selected) {
    Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please select Yes or No before submitting.",
        confirmButtonColor: "#2563eb",
    });
    return;
    }

    Swal.fire({
    icon: "success",
    title: "Thank You for Your Feedback!",
    text: "We appreciate your time and input.",
    confirmButtonColor: "#2563eb",
    });

    // Reset
    rating = 0;
    selected = "";
    stars.forEach((e) => {
    e.style.transform = "scale(1)";
    e.style.opacity = "1";
    });

    yesBtn.style.background =
    noBtn.style.background = "none";
    yesBtn.style.color =
    noBtn.style.color = "#2563eb";

    commentBox.value = "";
});