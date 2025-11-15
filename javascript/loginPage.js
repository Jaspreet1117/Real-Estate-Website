// Modal handling
const forgotLink = document.getElementById("forgotLink");
forgotLink.onclick = () => document.getElementById("forgotModal").style.display = "flex";


function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

window.onclick = (e) => {
    if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
    }
};
const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
    e.preventDefault(); // prevent page reload

    const username = form.querySelector('input[type="text"]').value.trim();
    const password = form.querySelector('input[type="password"]').value;

    if (username === 'fee' && password === '1234') {
    alert('Login successfully');
    } else {
    alert('Invalid username or password');
    }
});
//checkinng 