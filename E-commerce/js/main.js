// Cart functionality
let cart = [];
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');

// Toggle cart sidebar
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
});

// Newsletter subscription
const newsletterForm = document.getElementById('newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Here you would typically send this to your backend
    alert('Thanks for subscribing! You will receive your 10% discount code shortly.');
    e.target.reset();
});

// Mobile menu functionality
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Cart functions
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCart() {
    // Update cart count
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update cart items display
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <button onclick="removeFromCart(${item.id})">×</button>
        </div>
    `).join('');
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Search functionality
const searchIcon = document.getElementById('search-icon');
let searchOpen = false;

searchIcon.addEventListener('click', () => {
    if (!searchOpen) {
        const searchBar = document.createElement('div');
        searchBar.className = 'search-bar';
        searchBar.innerHTML = `
            <input type="text" placeholder="Search for products...">
            <button onclick="performSearch()">Search</button>
        `;
        
        const navbar = document.querySelector('.navbar');
        navbar.appendChild(searchBar);
        searchOpen = true;
    } else {
        const searchBar = document.querySelector('.search-bar');
        searchBar.remove();
        searchOpen = false;
    }
});

function performSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
        // Here you would typically redirect to search results page
        window.location.href = `shop.html?search=${encodeURIComponent(searchTerm)}`;
    }
}

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
});

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});
