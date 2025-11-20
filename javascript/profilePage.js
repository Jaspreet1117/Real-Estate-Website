// document.addEventListener('DOMContentLoaded', () => {

//     // ====== MOCK PROPERTY DATA ======
//     const allProperties = [
//         {id: 1, name: "Luxury Beachfront Villa", price: "₹2.8 Cr", rooms: "4 BHK", area: "3500 sq.ft", location: "Goa, India", badge: "Premium", rating: 5, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c", description: "Stunning luxury villa with direct beach access and sea views."},
//         {id: 2, name: "Modern City Apartment", price: "₹1.4 Cr", rooms: "3 BHK", area: "1700 sq.ft", location: "Mumbai, Maharashtra", badge: "New", rating: 4, image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914", description: "High-rise apartment with smart amenities and panoramic city views."},
//         {id: 3, name: "Mountain View Cabin", price: "₹1.2 Cr", rooms: "2 BHK", area: "1300 sq.ft", location: "Manali, Himachal Pradesh", badge: "Featured", rating: 5, image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae", description: "Cozy cabin surrounded by pine forests and breathtaking mountain scenery."},
//         {id: 4, name: "Royal Heritage Haveli", price: "₹4.5 Cr", rooms: "6 BHK", area: "5000 sq.ft", location: "Jaipur, Rajasthan", badge: "Luxury", rating: 5, image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994", description: "A restored heritage property with traditional architecture and modern comforts."},
//         {id: 5, name: "Kerala Backwater Home", price: "₹1.9 Cr", rooms: "3 BHK", area: "2200 sq.ft", location: "Kochi, Kerala", badge: "Featured", rating: 4, image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6", description: "Peaceful villa on the edge of the famous Kerala backwaters."},
//         {id: 6, name: "Urban Penthouse", price: "₹3.1 Cr", rooms: "4 BHK", area: "3000 sq.ft", location: "Bengaluru, Karnataka", badge: "New", rating: 5, image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d", description: "A modern penthouse with a private rooftop terrace and city skyline views."},
//         {id: 7, name: "Countryside Farmhouse", price: "₹2.2 Cr", rooms: "5 BHK", area: "4500 sq.ft", location: "Pune, Maharashtra", badge: "Spacious", rating: 4, image: "https://images.unsplash.com/photo-1558036117-15d82a90b931", description: "A sprawling farmhouse with organic gardens and a private pool."},
//         {id: 8, name: "Goan Portuguese Villa", price: "₹2.5 Cr", rooms: "4 BHK", area: "2800 sq.ft", location: "Goa, India", badge: "Vintage", rating: 5, image: "https://images.unsplash.com/photo-1598228723793-9cb121b61b24", description: "Charming Portuguese-style villa in a quiet, leafy Goan village."}
//     ];

//     // ====== GET CURRENT USER SESSION ======
//     let currentUser = JSON.parse(localStorage.getItem("currentUser"));
//     if (!currentUser) {
//         window.location.href = "../htmls/loginPage.html";
//     }

//     // ====== PROFILE DATA LOAD ======
//    // Always sync userProfile with current logged user
//     let userProfile = JSON.parse(localStorage.getItem("userProfile"));

//     if (!userProfile || userProfile.email !== currentUser.email) {
//         userProfile = {
//             name: currentUser.name,
//             email: currentUser.email,
//             phone: currentUser.phone || "",
//             image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e"
//         };

//         localStorage.setItem("userProfile", JSON.stringify(userProfile));
//     }


//     let likedProperties = JSON.parse(localStorage.getItem('likedProperties')) || [];
//     let sharedProperties = JSON.parse(localStorage.getItem('sharedProperties')) || [];
//     let uploadedProperties = JSON.parse(localStorage.getItem('uploadedProperties')) || [];

//     // ====== ELEMENTS ======
//     const pages = document.querySelectorAll('.page');
//     const modals = document.querySelectorAll('.modal');

//     const profileImage = document.getElementById('profileImage');
//     const profileName = document.getElementById('profileName');
//     const profileEmail = document.getElementById('profileEmail');
//     const profilePhone = document.getElementById('profilePhone');

//     const sharedCount = document.getElementById('sharedCount');
//     const likedCount = document.getElementById('likedCount');
//     const uploadedCount = document.getElementById('uploadedCount');

//     const editProfileForm = document.getElementById('editProfileForm');
//     const profilePicInput = document.getElementById('profilePicInput');
//     const editName = document.getElementById('editName');
//     const editEmail = document.getElementById('editEmail');
//     const editPhone = document.getElementById('editPhone');

//     const searchInput = document.getElementById('searchInput');
//     const searchBtn = document.getElementById('searchBtn');
//     const searchContainer = document.getElementById('searchContainer');
//     const likedContainer = document.getElementById('likedContainer');
//     const suggestionPanel = document.getElementById('suggestionPanel');

//     // ====== FUNCTIONS ======
//     function init() {
//         renderProfile();
//         updateCounts();
//         attachEventListeners();
//     }

//     function renderProfile() {
//         profileImage.src = userProfile.image;
//         profileName.textContent = userProfile.name;
//         profileEmail.textContent = `📧 ${userProfile.email}`;
//         profilePhone.textContent = userProfile.phone ? `📞 ${userProfile.phone}` : "";
//     }

//     function updateCounts() {
//         sharedCount.textContent = sharedProperties.length;
//         likedCount.textContent = likedProperties.length;
//         uploadedCount.textContent = uploadedProperties.length;
//     }

//     function openPage(pageId) {
//         pages.forEach(p => p.classList.remove("active"));
//         document.getElementById(pageId).classList.add("active");

//         if (pageId === "likedPage") populateLiked();
//     }

//     function openModal(id) {
//         document.getElementById(id).classList.add("active");

//         if (id === "editProfileModal") {
//             editName.value = userProfile.name;
//             editEmail.value = userProfile.email;
//             editPhone.value = userProfile.phone;
//         }
//     }

//     function closeModal(id) {
//         document.getElementById(id).classList.remove("active");
//     }

//     function saveProfile() {
//         userProfile.name = editName.value;
//         userProfile.email = editEmail.value;
//         userProfile.phone = editPhone.value;

//         const file = profilePicInput.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = e => {
//                 userProfile.image = e.target.result;
//                 saveFinal();
//             };
//             reader.readAsDataURL(file);
//         } else {
//             saveFinal();
//         }
//     }

//     function saveFinal() {
//         localStorage.setItem("userProfile", JSON.stringify(userProfile));
//         localStorage.setItem("currentUser", JSON.stringify(userProfile));

//         renderProfile();
//         closeModal("editProfileModal");
//         alert("Profile Updated Successfully!");
//     }

//     function populateLiked() {
//         likedContainer.innerHTML = "";
//         if (!likedProperties.length) {
//             likedContainer.innerHTML = `<div class="empty-state"><div class="icon">❤️</div><h2>No Liked Properties Yet!</h2></div>`;
//             return;
//         }

//         allProperties
//             .filter(p => likedProperties.includes(p.id))
//             .forEach(p => likedContainer.appendChild(createPropertyCard(p)));
//     }

//     function createPropertyCard(property) {
//         const card = document.createElement("div");
//         card.className = "card";
//         card.dataset.id = property.id;

//         const isLiked = likedProperties.includes(property.id);

//         card.innerHTML = `
//             <div class="card-image-box">
//                 <img src="${property.image}">
//                 <div class="badge">${property.badge}</div>
//                 <button class="like-btn ${isLiked ? "liked" : ""}" data-id="${property.id}">
//                     <i class="fas ${isLiked ? "fa-heart" : "fa-heart-regular"}"></i>
//                 </button>
//             </div>
//             <div class="card-content">
//                 <h3 class="card-title">${property.name}</h3>
//                 <p class="price">${property.price}</p>
//                 <p>${property.rooms} · ${property.area} · ${property.location}</p>
//                 <div class="rating">${"★".repeat(property.rating)}${"☆".repeat(5 - property.rating)}</div>
//             </div>`;

//         return card;
//     }

//     function performSearch() {
//         const query = searchInput.value.toLowerCase();
//         searchContainer.innerHTML = "";

//         if (!query) {
//             searchContainer.innerHTML = `<div class="empty-state"><h2>Start by typing in the search bar!</h2></div>`;
//             openPage("searchPage");
//             return;
//         }

//         const results = allProperties.filter(
//             p => p.name.toLowerCase().includes(query) || p.location.toLowerCase().includes(query)
//         );

//         if (!results.length) {
//             searchContainer.innerHTML = `<div class="empty-state"><h2>No Properties Found!</h2></div>`;
//         } else {
//             results.forEach(p => searchContainer.appendChild(createPropertyCard(p)));
//         }

//         openPage("searchPage");
//     }

//     // ====== EVENT LISTENERS ======
//     function attachEventListeners() {

//         document.body.addEventListener("click", e => {
//             const pageBtn = e.target.closest("[data-page]");
//             if (pageBtn) openPage(pageBtn.dataset.page);

//             const openBtn = e.target.closest("[data-modal]");
//             if (openBtn) openModal(openBtn.dataset.modal);

//             const closeBtn = e.target.closest(".modal-close");
//             if (closeBtn) closeModal(closeBtn.dataset.modal);

//             const likeBtn = e.target.closest(".like-btn");
//             if (likeBtn) toggleLike(parseInt(likeBtn.dataset.id));
//         });

//         editProfileForm.addEventListener("submit", e => {
//             e.preventDefault();
//             saveProfile();
//         });

//         searchBtn.addEventListener("click", performSearch);
//         searchInput.addEventListener("keypress", e => e.key === "Enter" && performSearch());

//         // LOGOUT BUTTON
//         document.getElementById("logoutBtn").addEventListener("click", () => {
//             localStorage.removeItem("currentUser");
//             closeModal("logoutModal");
//             window.location.href = "../htmls/loginPage.html";
//         });
//     }

//     // ====== INIT ======
//     init();
// });
document.addEventListener('DOMContentLoaded', () => {

    // ====== MOCK PROPERTY DATA ======
    const allProperties = [
        {id: 1, name: "Luxury Beachfront Villa", price: "₹2.8 Cr", rooms: "4 BHK", area: "3500 sq.ft", location: "Goa, India", badge: "Premium", rating: 5, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c", description: "Stunning luxury villa with direct beach access and sea views."},
        {id: 2, name: "Modern City Apartment", price: "₹1.4 Cr", rooms: "3 BHK", area: "1700 sq.ft", location: "Mumbai, Maharashtra", badge: "New", rating: 4, image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914", description: "High-rise apartment with smart amenities and panoramic city views."},
        {id: 3, name: "Mountain View Cabin", price: "₹1.2 Cr", rooms: "2 BHK", area: "1300 sq.ft", location: "Manali, Himachal Pradesh", badge: "Featured", rating: 5, image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae", description: "Cozy cabin surrounded by pine forests and breathtaking mountain scenery."},
        {id: 4, name: "Royal Heritage Haveli", price: "₹4.5 Cr", rooms: "6 BHK", area: "5000 sq.ft", location: "Jaipur, Rajasthan", badge: "Luxury", rating: 5, image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994", description: "A restored heritage property with traditional architecture and modern comforts."},
        {id: 5, name: "Kerala Backwater Home", price: "₹1.9 Cr", rooms: "3 BHK", area: "2200 sq.ft", location: "Kochi, Kerala", badge: "Featured", rating: 4, image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6", description: "Peaceful villa on the edge of the famous Kerala backwaters."},
        {id: 6, name: "Urban Penthouse", price: "₹3.1 Cr", rooms: "4 BHK", area: "3000 sq.ft", location: "Bengaluru, Karnataka", badge: "New", rating: 5, image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d", description: "A modern penthouse with a private rooftop terrace and city skyline views."},
        {id: 7, name: "Countryside Farmhouse", price: "₹2.2 Cr", rooms: "5 BHK", area: "4500 sq.ft", location: "Pune, Maharashtra", badge: "Spacious", rating: 4, image: "https://images.unsplash.com/photo-1558036117-15d82a90b931", description: "A sprawling farmhouse with organic gardens and a private pool."},
        {id: 8, name: "Goan Portuguese Villa", price: "₹2.5 Cr", rooms: "4 BHK", area: "2800 sq.ft", location: "Goa, India", badge: "Vintage", rating: 5, image: "https://images.unsplash.com/photo-1598228723793-9cb121b61b24", description: "Charming Portuguese-style villa in a quiet, leafy Goan village."}
    ];

    // ====== GET CURRENT USER SESSION ======
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        window.location.href = "../htmls/loginPage.html";
    }

    // ====== PROFILE DATA LOAD ======
    // Always sync userProfile with current logged user
    let userProfile = JSON.parse(localStorage.getItem("userProfile"));

    if (!userProfile || userProfile.email !== currentUser.email) {
        userProfile = {
            name: currentUser.name,
            email: currentUser.email,
            phone: currentUser.phone || "",
            image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e"
        };

        localStorage.setItem("userProfile", JSON.stringify(userProfile));
    }

    let likedProperties = JSON.parse(localStorage.getItem('likedProperties')) || [];
    let sharedProperties = JSON.parse(localStorage.getItem('sharedProperties')) || [];
    let uploadedProperties = JSON.parse(localStorage.getItem('uploadedProperties')) || [];

    // ====== ELEMENTS ======
    const pages = document.querySelectorAll('.page');
    const modals = document.querySelectorAll('.modal');

    const profileImage = document.getElementById('profileImage');
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profilePhone = document.getElementById('profilePhone');

    const sharedCount = document.getElementById('sharedCount');
    const likedCount = document.getElementById('likedCount');
    const uploadedCount = document.getElementById('uploadedCount');

    const editProfileForm = document.getElementById('editProfileForm');
    const profilePicInput = document.getElementById('profilePicInput');
    const editName = document.getElementById('editName');
    const editEmail = document.getElementById('editEmail');
    const editPhone = document.getElementById('editPhone');

    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchContainer = document.getElementById('searchContainer');
    const likedContainer = document.getElementById('likedContainer');
    const suggestionPanel = document.getElementById('suggestionPanel');

    // ====== FUNCTIONS ======
    function init() {
        renderProfile();
        updateCounts();
        attachEventListeners();
    }

    function renderProfile() {
        profileImage.src = userProfile.image;
        profileName.textContent = userProfile.name;
        profileEmail.textContent = `📧 ${userProfile.email}`;
        profilePhone.textContent = userProfile.phone ? `📞 ${userProfile.phone}` : "";
    }

    function updateCounts() {
        sharedCount.textContent = sharedProperties.length;
        likedCount.textContent = likedProperties.length;
        uploadedCount.textContent = uploadedProperties.length;
    }

    function openPage(pageId) {
        pages.forEach(p => p.classList.remove("active"));
        document.getElementById(pageId).classList.add("active");

        if (pageId === "likedPage") populateLiked();
    }

    function openModal(id) {
        document.getElementById(id).classList.add("active");

        if (id === "editProfileModal") {
            editName.value = userProfile.name;
            editEmail.value = userProfile.email;
            editPhone.value = userProfile.phone;
        }
    }

    function closeModal(id) {
        document.getElementById(id).classList.remove("active");
    }

    function saveProfile() {
        userProfile.name = editName.value;
        userProfile.email = editEmail.value;
        userProfile.phone = editPhone.value;

        const file = profilePicInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = e => {
                userProfile.image = e.target.result;
                saveFinal();
            };
            reader.readAsDataURL(file);
        } else {
            saveFinal();
        }
    }

    function saveFinal() {
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
        localStorage.setItem("currentUser", JSON.stringify(userProfile));

        renderProfile();
        closeModal("editProfileModal");
        alert("Profile Updated Successfully!");
    }

    // ====== PASSWORD CHANGE FUNCTIONALITY ======
    function changePassword() {
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Clear previous errors
        const errorElements = document.querySelectorAll('.password-error');
        errorElements.forEach(el => el.remove());

        // Validation
        let isValid = true;

        if (!currentPassword) {
            showPasswordError('currentPassword', 'Current password is required');
            isValid = false;
        }

        if (!newPassword) {
            showPasswordError('newPassword', 'New password is required');
            isValid = false;
        } else if (newPassword.length < 6) {
            showPasswordError('newPassword', 'Password must be at least 6 characters');
            isValid = false;
        }

        if (!confirmPassword) {
            showPasswordError('confirmPassword', 'Please confirm your new password');
            isValid = false;
        } else if (newPassword !== confirmPassword) {
            showPasswordError('confirmPassword', 'Passwords do not match');
            isValid = false;
        }

        if (!isValid) return;

        // Simulate password change
        try {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            const userIndex = users.findIndex(user => user.email === currentUser.email);
            
            if (userIndex !== -1) {
                // In a real application, you should verify current password first
                // For demo purposes, we'll update directly
                users[userIndex].password = newPassword;
                localStorage.setItem('users', JSON.stringify(users));
            }

            // Clear form
            document.getElementById('currentPassword').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';

            // Success
            closeModal('changePasswordModal');
            alert('Password changed successfully!');
            
        } catch (error) {
            alert('Error changing password. Please try again.');
            console.error('Password change error:', error);
        }
    }

    function showPasswordError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorElement = document.createElement('div');
        errorElement.className = 'password-error text-red-500 text-xs mt-1';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    }

    function populateLiked() {
        likedContainer.innerHTML = "";
        if (!likedProperties.length) {
            likedContainer.innerHTML = `<div class="empty-state"><div class="icon">❤️</div><h2>No Liked Properties Yet!</h2></div>`;
            return;
        }

        allProperties
            .filter(p => likedProperties.includes(p.id))
            .forEach(p => likedContainer.appendChild(createPropertyCard(p)));
    }

    function createPropertyCard(property) {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.id = property.id;

        const isLiked = likedProperties.includes(property.id);

        card.innerHTML = `
            <div class="card-image-box">
                <img src="${property.image}">
                <div class="badge">${property.badge}</div>
                <button class="like-btn ${isLiked ? "liked" : ""}" data-id="${property.id}">
                    <i class="fas ${isLiked ? "fa-heart" : "fa-heart-regular"}"></i>
                </button>
            </div>
            <div class="card-content">
                <h3 class="card-title">${property.name}</h3>
                <p class="price">${property.price}</p>
                <p>${property.rooms} · ${property.area} · ${property.location}</p>
                <div class="rating">${"★".repeat(property.rating)}${"☆".repeat(5 - property.rating)}</div>
            </div>`;

        return card;
    }

    function toggleLike(propertyId) {
        const index = likedProperties.indexOf(propertyId);
        if (index > -1) {
            likedProperties.splice(index, 1);
        } else {
            likedProperties.push(propertyId);
        }
        localStorage.setItem('likedProperties', JSON.stringify(likedProperties));
        updateCounts();
        
        // Update UI if on liked page
        if (document.getElementById('likedPage').classList.contains('active')) {
            populateLiked();
        }
    }

    function performSearch() {
        const query = searchInput.value.toLowerCase();
        searchContainer.innerHTML = "";

        if (!query) {
            searchContainer.innerHTML = `<div class="empty-state"><h2>Start by typing in the search bar!</h2></div>`;
            openPage("searchPage");
            return;
        }

        const results = allProperties.filter(
            p => p.name.toLowerCase().includes(query) || p.location.toLowerCase().includes(query)
        );

        if (!results.length) {
            searchContainer.innerHTML = `<div class="empty-state"><h2>No Properties Found!</h2></div>`;
        } else {
            results.forEach(p => searchContainer.appendChild(createPropertyCard(p)));
        }

        openPage("searchPage");
    }

    // ====== EVENT LISTENERS ======
    function attachEventListeners() {

        document.body.addEventListener("click", e => {
            const pageBtn = e.target.closest("[data-page]");
            if (pageBtn) openPage(pageBtn.dataset.page);

            const openBtn = e.target.closest("[data-modal]");
            if (openBtn) openModal(openBtn.dataset.modal);

            const closeBtn = e.target.closest(".modal-close");
            if (closeBtn) closeModal(closeBtn.dataset.modal);

            const likeBtn = e.target.closest(".like-btn");
            if (likeBtn) toggleLike(parseInt(likeBtn.dataset.id));
        });

        editProfileForm.addEventListener("submit", e => {
            e.preventDefault();
            saveProfile();
        });

        // Password change event listener
        document.getElementById("savePasswordBtn").addEventListener("click", changePassword);

        // Enter key support for password form
        const passwordFields = ['currentPassword', 'newPassword', 'confirmPassword'];
        passwordFields.forEach(fieldId => {
            document.getElementById(fieldId).addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && document.getElementById('changePasswordModal').classList.contains('active')) {
                    changePassword();
                }
            });
        });

        searchBtn.addEventListener("click", performSearch);
        searchInput.addEventListener("keypress", e => e.key === "Enter" && performSearch());

        // LOGOUT BUTTON
        document.getElementById("logoutBtn").addEventListener("click", () => {
            localStorage.removeItem("currentUser");
            closeModal("logoutModal");
            window.location.href = "../htmls/loginPage.html";
        });
    }

    // ====== INIT ======
    init();
});
