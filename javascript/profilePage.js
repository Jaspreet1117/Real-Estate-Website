document.addEventListener('DOMContentLoaded', () => {

    // ====== MOCK DATABASE ======
    // This is our simulated API/Database
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
    
    // ====== STATE MANAGEMENT (Using localStorage) ======
    let userProfile = JSON.parse(localStorage.getItem('userProfile')) || {
        name: "Jane Doe",
        email: "jane.doe@email.com",
        phone: "+91 98765 43210",
        image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e"
    };

    let likedProperties = JSON.parse(localStorage.getItem('likedProperties')) || [2, 3]; // Default liked IDs
    let sharedProperties = JSON.parse(localStorage.getItem('sharedProperties')) || [];
    let uploadedProperties = JSON.parse(localStorage.getItem('uploadedProperties')) || [];

    // ====== ELEMENT SELECTORS ======
    const pages = document.querySelectorAll('.page');
    const modals = document.querySelectorAll('.modal');
    
    // Profile Page
    const profileImage = document.getElementById('profileImage');
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profilePhone = document.getElementById('profilePhone');
    
    // Counts
    const sharedCount = document.getElementById('sharedCount');
    const likedCount = document.getElementById('likedCount');
    const uploadedCount = document.getElementById('uploadedCount');

    // Modals & Forms
    const editProfileModal = document.getElementById('editProfileModal');
    const editProfileForm = document.getElementById('editProfileForm');
    const profilePicInput = document.getElementById('profilePicInput');
    const editName = document.getElementById('editName');
    const editEmail = document.getElementById('editEmail');
    const editPhone = document.getElementById('editPhone');
    
    // Containers
    const searchContainer = document.getElementById('searchContainer');
    const likedContainer = document.getElementById('likedContainer');

    // Inputs & Buttons
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const suggestionPanel = document.getElementById('suggestionPanel');

    // Property Popup
    const propertyPopup = document.getElementById('propertyPopup');

    // ====== FUNCTIONS ======

    /**
     * Initializes the application, loads data from localStorage, and renders the UI.
     */
    function init() {
        renderProfile();
        updateCounts();
        // Attach all event listeners
        attachEventListeners();
    }

    /**
     * Renders the user's profile information on the page.
     */
    function renderProfile() {
        profileImage.src = userProfile.image;
        profileName.textContent = userProfile.name;
        profileEmail.textContent = `📧 ${userProfile.email}`;
        profilePhone.textContent = `📞 ${userProfile.phone}`;
    }
    
    /**
     * Updates the counts on the dashboard.
     */
    function updateCounts() {
        sharedCount.textContent = sharedProperties.length;
        likedCount.textContent = likedProperties.length;
        uploadedCount.textContent = uploadedProperties.length;
    }

    /**
     * Navigates to a specific page by its ID.
     * @param {string} pageId - The ID of the page to show.
     */
    function openPage(pageId) {
        pages.forEach(p => p.classList.remove('active'));
        const page = document.getElementById(pageId);
        if (page) {
            page.classList.add('active');
            
            // Refresh content when opening a page
            if (pageId === 'likedPage') {
                populateLiked();
            } else if (pageId === 'searchPage') {
                // Optionally clear search or keep results
            }
        }
    }

    /**
     * Opens a modal by its ID.
     * @param {string} modalId - The ID of the modal to show.
     */
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            
            // Pre-fill edit profile form
            if (modalId === 'editProfileModal') {
                editName.value = userProfile.name;
                editEmail.value = userProfile.email;
                editPhone.value = userProfile.phone;
            }
        }
    }

    /**
     * Closes an active modal.
     * @param {string} modalId - The ID of the modal to hide.
     */
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
        }
    }

    /**
     * Creates an HTML card for a property.
     * @param {object} property - The property object.
     * @returns {HTMLElement} - The fully constructed card element.
     */
    function createPropertyCard(property) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.id = property.id;
        
        const isLiked = likedProperties.includes(property.id);

        card.innerHTML = `
            <div class="card-image-box">
                <img src="${property.image}" alt="${property.name}">
                <div class="badge">${property.badge || ''}</div>
                <button class="like-btn ${isLiked ? 'liked' : ''}" data-id="${property.id}">
                    <i class="fas ${isLiked ? 'fa-heart' : 'fa-heart-regular'}"></i>
                </button>
            </div>
            <div class="card-content">
                <h3 class="card-title">${property.name}</h3>
                <p class="price">${property.price}</p>
                <p>${property.rooms} · ${property.area} · ${property.location}</p>
                <div class="rating">${'★'.repeat(property.rating || 0)}${'☆'.repeat(5 - (property.rating || 0))}</div>
            </div>`;
        
        // Add click listener to title to open popup
        card.querySelector('.card-title').addEventListener('click', () => openPropertyPopup(property.id));
        card.querySelector('.card-image-box img').addEventListener('click', () => openPropertyPopup(property.id));
        
        return card;
    }

    /**
     * Toggles the "like" status of a property.
     * @param {number} propertyId - The ID of the property to like/unlike.
     */
    function toggleLike(propertyId) {
        const index = likedProperties.indexOf(propertyId);
        if (index > -1) {
            // Already liked, so unlike
            likedProperties.splice(index, 1);
        } else {
            // Not liked, so like
            likedProperties.push(propertyId);
        }
        
        // Save to localStorage
        localStorage.setItem('likedProperties', JSON.stringify(likedProperties));
        
        // Update UI
        updateCounts();
        
        // Update all like buttons for this property ID
        document.querySelectorAll(`.like-btn[data-id="${propertyId}"]`).forEach(btn => {
            const isLiked = likedProperties.includes(propertyId);
            btn.classList.toggle('liked', isLiked);
            btn.innerHTML = `<i class="fas ${isLiked ? 'fa-heart' : 'fa-heart-regular'}"></i>`;
        });
        
        // Refresh the liked page if it's the active view
        if (document.getElementById('likedPage').classList.contains('active')) {
            populateLiked();
        }
    }

    /**
     * Populates the "Liked Properties" page.
     */
    function populateLiked() {
        likedContainer.innerHTML = '';
        if (likedProperties.length === 0) {
            likedContainer.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <div class="icon">❤️</div>
                    <h2>No Liked Properties Yet!</h2>
                    <p class="subtitle">Click the heart on any property to save it here.</p>
                </div>`;
            return;
        }
        
        const propertiesToDisplay = allProperties.filter(p => likedProperties.includes(p.id));
        propertiesToDisplay.forEach(p => {
            likedContainer.appendChild(createPropertyCard(p));
        });
    }

    /**
     * Performs a search based on the input field and renders results.
     */
    function performSearch() {
        const query = searchInput.value.toLowerCase();
        if (!query) {
            searchContainer.innerHTML = `<div class="empty-state" style="grid-column: 1 / -1;"><div class="icon">🔍</div><h2>Start by typing in the search bar.</h2></div>`;
            openPage('searchPage');
            return;
        }
        
        const results = allProperties.filter(p => 
            p.name.toLowerCase().includes(query) ||
            p.location.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
        
        searchContainer.innerHTML = '';
        if (results.length === 0) {
            searchContainer.innerHTML = `<div class="empty-state" style="grid-column: 1 / -1;"><div class="icon">😢</div><h2>No properties found for "${query}"</h2><p class="subtitle">Try a different search term or check your spelling.</p></div>`;
        } else {
            results.forEach(p => {
                searchContainer.appendChild(createPropertyCard(p));
            });
        }
        openPage('searchPage');
    }
    
    /**
     * Opens the property details popup.
     * @param {number} propertyId - The ID of the property to show.
     */
    function openPropertyPopup(propertyId) {
        const property = allProperties.find(p => p.id === propertyId);
        if (!property) return;

        document.getElementById('popupName').innerText = property.name;
        document.getElementById('popupImage').src = property.image;
        document.getElementById('popupPrice').innerHTML = `<strong>Price:</strong> ${property.price}`;
        document.getElementById('popupDetails').innerText = `${property.rooms} · ${property.area} · ${property.location}`;
        document.getElementById('popupDescription').innerText = property.description;
        document.getElementById('popupRating').innerText = '★'.repeat(property.rating || 0) + '☆'.repeat(5 - (property.rating || 0));
        
        openModal('propertyPopup');
    }

    /**
     * Saves the profile data from the edit modal.
     */
    function saveProfile() {
        // Update the local userProfile object
        userProfile.name = editName.value;
        userProfile.email = editEmail.value;
        userProfile.phone = editPhone.value;
        
        // Handle file input for profile picture
        const file = profilePicInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // Save image as base64 string
                userProfile.image = e.target.result;
                // Save to localStorage
                localStorage.setItem('userProfile', JSON.stringify(userProfile));
                // Render the new profile
                renderProfile();
                // Close modal
                closeModal('editProfileModal');
            };
            reader.readAsDataURL(file);
        } else {
            // Save to localStorage (without image change)
            localStorage.setItem('userProfile', JSON.stringify(userProfile));
            // Render the new profile
            renderProfile();
            // Close modal
            closeModal('editProfileModal');
        }
    }

    /**
     * Attaches all primary event listeners for the application.
     */
    function attachEventListeners() {
        
        // Page Navigation
        document.body.addEventListener('click', (e) => {
            // Handle page navigation links
            let pageTarget = e.target.closest('[data-page]');
            if (pageTarget) {
                openPage(pageTarget.dataset.page);
            }
            
            // Handle modal opening links
            let modalOpenTarget = e.target.closest('[data-modal]');
            if (modalOpenTarget) {
                openModal(modalOpenTarget.dataset.modal);
            }
            
            // Handle modal closing buttons
            let modalCloseTarget = e.target.closest('.modal-close');
            if (modalCloseTarget) {
                closeModal(modalCloseTarget.dataset.modal);
            }
            
            // Handle "Like" button clicks
            let likeBtn = e.target.closest('.like-btn');
            if (likeBtn) {
                const id = parseInt(likeBtn.dataset.id, 10);
                toggleLike(id);
            }
        });

        // Search functionality
        searchInput.addEventListener('focus', () => suggestionPanel.classList.add('active'));
        document.getElementById('filterCancelBtn').addEventListener('click', () => suggestionPanel.classList.remove('active'));
        document.getElementById('filterSearchBtn').addEventListener('click', () => {
            suggestionPanel.classList.remove('active');
            performSearch();
        });
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // Profile Edit
        document.getElementById('editProfileBtn').addEventListener('click', () => openModal('editProfileModal'));
        profileImage.parentElement.addEventListener('click', () => openModal('editProfileModal'));

        editProfileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveProfile();
        });

        // Handle file input change to immediately show preview (optional, but good UX)
        // For now, we just save on submit.

        // Other Modals
        document.getElementById('savePasswordBtn').addEventListener('click', () => {
            alert("Password changed successfully (Demo)!");
            closeModal('changePasswordModal');
        });
        
        document.getElementById('logoutBtn').addEventListener('click', () => {
            alert("Logout successful (Demo)!");
            closeModal('logoutModal');
        });
        
        // Close modal on outside click
        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal(modal.id);
                }
            });
        });
    }

    // ====== APP INITIALIZATION ======
    init();

});