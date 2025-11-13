

  const cities = ["Delhi", "Mumbai", "Noida", "Bangalore", "Pune", "Hyderabad", "Patna", "Chennai"];
  const searchInput = document.getElementById("search-input");
  let cityIndex = 0, charIndex = 0, typing = true;

  function typeCity() {
    const city = cities[cityIndex];
    if (typing) {
      searchInput.placeholder = "Search properties in " + city.slice(0, charIndex) + "|";
      charIndex++;
      if (charIndex > city.length) {
        typing = false;
        setTimeout(typeCity, 1000);
      } else {
        setTimeout(typeCity, 100);
      }
    } else {
      searchInput.placeholder = "Search properties in " + city.slice(0, charIndex) + "|";
      charIndex--;
      if (charIndex === 0) {
        typing = true;
        cityIndex = (cityIndex + 1) % cities.length;
        setTimeout(typeCity, 400);
      } else {
        setTimeout(typeCity, 50);
      }
    }
  }
  typeCity();

function loadReviews() {
  const reviewsContainer = document.querySelector(".reviews");
  const totalPeopleRated = document.querySelector(".totalPeopleRated");
  const valueRating = document.querySelector(".valueRating");
  const noReviewYet = document.querySelector(".noReviewYet");
  const right = document.querySelector(".right");

  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

  if (reviews.length === 0) {
    noReviewYet.style.display = "flex";
    document.querySelector(".review-carousel-container").style.display = "none"; // hide carousel only
    totalPeopleRated.textContent = "0";
    valueRating.textContent = "0";
    document.querySelectorAll(".progress-bar").forEach(bar => bar.style.width = "0%");
    return;
  }

  // Hide "no review yet" section and show the right panel
  noReviewYet.style.display = "none";
  right.style.display = "block";
  reviewsContainer.innerHTML = "";

  let totalRating = 0;
  let ratingCount = [0, 0, 0, 0, 0];

  reviews.forEach(r => {
    totalRating += r.rating;
    ratingCount[r.rating - 1]++;

    const div = document.createElement("div");
    div.className = "single-review";
    div.innerHTML = `
      <div class="review-header">
        <span class="role">${r.role}</span>
        <span class="stars">⭐ ${r.rating}/5</span>
      </div>
      <div class="review-body">
        <p><b>Pros:</b> ${r.pros}</p>
        <p><b>Cons:</b> ${r.cons}</p>
        <p><b>Review:</b> ${r.review}</p>
      </div>
      <small>${r.date}</small>
    `;
    reviewsContainer.appendChild(div);
  });

  // Calculate average rating
  const avg = (totalRating / reviews.length).toFixed(1);
  valueRating.textContent = avg;
  totalPeopleRated.textContent = reviews.length;

  // Update progress bars (rating distribution)
  const bars = document.querySelectorAll(".progress");
  bars.forEach((bar, index) => {
    const rating = 5 - index;
    const percentage = (ratingCount[rating - 1] / reviews.length) * 100;
    bar.querySelector(".progress-bar").style.width = percentage + "%";
  });
}

function scrollReviews(direction) {
  const wrapper = document.querySelector(".reviews-wrapper");
  const scrollAmount = 320; // roughly one card width
  wrapper.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth"
  });
}



// Load when the page opens
document.addEventListener("DOMContentLoaded", loadReviews);

