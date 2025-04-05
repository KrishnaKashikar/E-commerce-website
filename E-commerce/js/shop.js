// Sample product data (in a real application, this would come from a backend)
const products = [
    {
        id: 1,
        name: "Classic White T-Shirt",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        category: "men",
        size: ["S", "M", "L", "XL"]
    },
    {
        id: 2,
        name: "Floral Summer Dress",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=500",
        category: "women",
        size: ["XS", "S", "M", "L"]
    },
    {
        id: 3,
        name: "Leather Watch",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500",
        category: "accessories",
        size: ["ONE SIZE"]
    },
    {
        id: 4,
        name: "Denim Jacket",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500",
        category: "men",
        size: ["S", "M", "L", "XL"]
    },
    {
        id: 5,
        name: "Elegant Evening Gown",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500",
        category: "women",
        size: ["XS", "S", "M", "L"]
    },
    {
        id: 6,
        name: "Leather Handbag",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
        category: "accessories",
        size: ["ONE SIZE"]
    },
    {
        id: 7,
        name: "Casual Sneakers",
        price: 69.99,
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500",
        category: "accessories",
        size: ["40", "41", "42", "43", "44"]
    },
    {
        id: 8,
        name: "Business Suit",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500",
        category: "men",
        size: ["S", "M", "L", "XL"]
    },
    {
        id: 9,
        name: "Bohemian Maxi Dress",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
        category: "women",
        size: ["XS", "S", "M", "L"]
    },
    {
        id: 10,
        name: "Silver Necklace",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500",
        category: "accessories",
        size: ["ONE SIZE"]
    },
    {
        id: 11,
        name: "Slim Fit Jeans",
        price: 69.99,
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",
        category: "men",
        size: ["30", "32", "34", "36"]
    },
    {
        id: 12,
        name: "Summer Hat",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1565339119519-c9eaa1918b9f?w=500",
        category: "accessories",
        size: ["ONE SIZE"]
    }
    // Add more products as needed
];

// Filter and sort state
let currentFilters = {
    categories: [],
    priceRange: { min: 0, max: 1000 },
    sizes: []
};
let currentSort = 'featured';
let currentPage = 1;
const productsPerPage = 9;

// Initialize the shop page
function initShop() {
    displayProducts();
    setupEventListeners();
}

// Setup all event listeners
function setupEventListeners() {
    // Category filters
    document.querySelectorAll('.filter-section input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            currentFilters.categories = Array.from(document.querySelectorAll('.filter-section input[type="checkbox"]:checked'))
                .map(cb => cb.id);
            displayProducts();
        });
    });

    // Price range
    const priceRange = document.getElementById('price-range');
    const minPrice = document.getElementById('min-price');
    const maxPrice = document.getElementById('max-price');

    priceRange.addEventListener('input', (e) => {
        maxPrice.value = e.target.value;
        currentFilters.priceRange.max = parseInt(e.target.value);
        displayProducts();
    });

    minPrice.addEventListener('change', (e) => {
        currentFilters.priceRange.min = parseInt(e.target.value) || 0;
        displayProducts();
    });

    maxPrice.addEventListener('change', (e) => {
        currentFilters.priceRange.max = parseInt(e.target.value) || 1000;
        priceRange.value = currentFilters.priceRange.max;
        displayProducts();
    });

    // Size filters
    document.querySelectorAll('.size-buttons button').forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            currentFilters.sizes = Array.from(document.querySelectorAll('.size-buttons button.active'))
                .map(btn => btn.textContent);
            displayProducts();
        });
    });

    // Sort
    document.getElementById('sort-by').addEventListener('change', (e) => {
        currentSort = e.target.value;
        displayProducts();
    });

    // Pagination
    document.querySelector('.prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayProducts();
        }
    });

    document.querySelector('.next-page').addEventListener('click', () => {
        const totalPages = Math.ceil(filterProducts().length / productsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayProducts();
        }
    });
}

// Filter products based on current filters
function filterProducts() {
    return products.filter(product => {
        // Category filter
        if (currentFilters.categories.length > 0 && !currentFilters.categories.includes(product.category)) {
            return false;
        }

        // Price filter
        if (product.price < currentFilters.priceRange.min || product.price > currentFilters.priceRange.max) {
            return false;
        }

        // Size filter
        if (currentFilters.sizes.length > 0 && !product.size.some(size => currentFilters.sizes.includes(size))) {
            return false;
        }

        return true;
    });
}

// Sort products based on current sort option
function sortProducts(filteredProducts) {
    switch (currentSort) {
        case 'price-low':
            return filteredProducts.sort((a, b) => a.price - b.price);
        case 'price-high':
            return filteredProducts.sort((a, b) => b.price - a.price);
        case 'newest':
            return filteredProducts.sort((a, b) => b.id - a.id);
        default:
            return filteredProducts;
    }
}

// Display products in the grid
function displayProducts() {
    const filteredProducts = filterProducts();
    const sortedProducts = sortProducts(filteredProducts);
    
    // Pagination
    const startIndex = (currentPage - 1) * productsPerPage;
    const paginatedProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage);
    
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = paginatedProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="addToCart(${JSON.stringify(product)})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');

    // Update pagination
    updatePagination(sortedProducts.length);
}

// Update pagination buttons
function updatePagination(totalProducts) {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const pageNumbers = document.querySelector('.page-numbers');
    
    pageNumbers.innerHTML = '';
    for (let i = 1; i <= Math.min(totalPages, 3); i++) {
        pageNumbers.innerHTML += `
            <button ${i === currentPage ? 'class="active"' : ''} onclick="goToPage(${i})">
                ${i}
            </button>
        `;
    }

    // Update prev/next buttons
    document.querySelector('.prev-page').disabled = currentPage === 1;
    document.querySelector('.next-page').disabled = currentPage === totalPages;
}

// Go to specific page
function goToPage(page) {
    currentPage = page;
    displayProducts();
}

// Initialize the shop when the page loads
window.addEventListener('load', initShop);
