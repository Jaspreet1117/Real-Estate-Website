const loginSuccess = document.getElementById("loginSuccess");
const loginError = document.getElementById("loginError");

function showAlert(alertBox) {
    alertBox.style.display = "block";
    alertBox.classList.add("show");  // animate fade-in

    setTimeout(() => {
        alertBox.classList.remove("show");
        alertBox.style.display = "none";
    }, 2500);
}

const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const enteredUser = form.querySelector('input[type="text"]').value.trim();
    const enteredPwd = form.querySelector('input[type="password"]').value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(user =>
        (user.email === enteredUser || user.name === enteredUser) && user.password === enteredPwd
    );

    if (validUser) {
        showAlert(loginSuccess);
        localStorage.setItem("currentUser", JSON.stringify(validUser));

        setTimeout(() => {
            window.location.href = "homePage.html";
        }, 2000);
    } else {
        showAlert(loginError);
    }
});
