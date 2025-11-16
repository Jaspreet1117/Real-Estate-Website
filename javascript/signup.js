const video = document.getElementById("myVideo");
video.playbackRate = 0.3;

const errorAlert = document.getElementById("errorAlert");
const successAlert = document.getElementById("successAlert");

function showAlert(element) {
    element.style.display = "flex";   // visible
    element.classList.add("show");    // Bootstrap fade-in

    setTimeout(() => {
        element.classList.remove("show");
        element.style.display = "none";
    }, 3000);
}

document.getElementById("signupForm").addEventListener("submit", function(event){
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("pwd").value;

    // Get stored users array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check for duplicate emails
    const exists = users.find(user => user.email === email);
    if (exists) {
        showAlert(errorAlert);   // 🔴 show error alert
        return;
    }

    // Add new user object
    users.push({ name, email, password });

    // Store back in localStorage
    localStorage.setItem("users", JSON.stringify(users));

    showAlert(successAlert);      // 🟢 show success alert

    setTimeout(() => {
        window.location.href = "../htmls/loginPage.html";
    }, 2000);
});
