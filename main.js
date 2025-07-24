const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');
const cartBtn = document.querySelector('.cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartCloseBtn = document.querySelector('.cart-close-btn');
const cartItemsList = document.querySelector('.cart-items');
const totalPriceEl = document.querySelector('.total-price');
const checkoutBtn = document.querySelector('.checkout-btn');

const checkoutModal = document.getElementById('checkout-modal');
const checkoutCloseBtn = document.querySelector('.checkout-close-btn');
const whatsappBtn = document.querySelector('.whatsapp-btn');
const gmailBtn = document.querySelector('.gmail-btn');

const themeToggle = document.getElementById('theme-toggle');

const filterButtons = document.querySelectorAll('.filter-btn');
const productsGrid = document.getElementById('products-grid');

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// Search elements
const searchBtn = document.querySelector('.search-btn');
const searchContainer = document.getElementById('search-container');
const searchInput = document.getElementById('search-input');
const searchCloseBtn = document.getElementById('search-close-btn');

let cart = [];
let currentOrderMessage = '';
let currentFilter = 'all';
let currentSearchTerm = '';

// Cart persistence functions
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    renderCart();
  }
}

// Theme management
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Initialize theme and cart on page load
initTheme();
loadCart();

// Theme toggle event listener
themeToggle.addEventListener('click', toggleTheme);

// Updated productsData with category as array for multiple categories support
const productsData = [
  {
    id: 1,
    category: ['bracelets'],
    name: 'Earth Warior',
    price: '10000',
    img: 'P_.jpg',
  },
  {
    id: 2,
    category: ['waist-beads'],
    name: 'Big Aunties Strands',
    price: '25000',
    img: 'P_1.jpg',
  },
  {
    id: 3,
    category: ['necklace'],
    name: 'Pearl and Path',
    price: '45000',
    img: 'P_2.jpg',
  },
  {
    id: 4,
    category: ['waist-beads'],
    name: 'Strand Of Excelence',
    price: '20000',
    img: 'P_3.jpg',
  },
  {
    id: 5,
    category: ['bracelets'],
    name: 'Obsidian Frost',
    price: '7000',
    img: 'P_4.jpg',
  },
  {
    id: 6,
    category: ['watches'],
    name: '#',
    price: '100000',
    img: 'P_5.jpg',
  },
  {
    id: 7,
    category: ['waist-beads'],
    name: '#',
    price: '#',
    img: 'P_6.jpg',
  },
  {
    id: 8,
    category: ['waist-beads'],
    name: '#',
    price: '#',
    img: 'P_7.jpg',
  },
  {
    id: 9,
    category: ['necklace'],
    name: 'The Blue Evil Eye',
    price: '30000',
    img: 'P_8.jpg',
  },
  {
    id: 10,
    category: ['watches'],
    name: '#',
    price: '#',
    img: 'P_9.jpg',
  },
  {
    id: 11,
    category: ['bags'],
    name: '#',
    price: '#',
    img: 'P_10.jpg',
  },
  {
    id: 12,
    category: ['bracelets'],
    name: '#',
    price: '#',
    img: 'P_11.jpg',
  },
  {
    id: 13,
    category: ['watches'],
    name: '#',
    price: '#',
    img: 'P_12.jpg',
  },
  {
    id: 14,
    category: ['necklace'],
    name: '#',
    price: '#',
    img: 'P_13.jpg',
  },
  {
    id: 15,
    category: ['watches'],
    name: '#',
    price: '#',
    img: 'P_14.jpg',
  },
  {
    id: 16,
    category: ['waist-beads'],
    name: '#',
    price: '#',
    img: 'P_15.jpg',
  },
  {
    id: 17,
    category: ['bracelets'],
    name: '#',
    price: '#',
    img: 'P_16.jpg',
  },
  {
    id: 18,
    category: ['waist-beads'],
    name: '#',
    price: '#',
    img: 'P_17.jpg',
  },
  {
    id: 19,
    category: ['necklace'],
    name: '#',
    price: '#',
    img: 'P_18.jpg',
  },
  {
    id: 20,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_19.jpg',
  },
  {
    id: 21,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_20.jpg',
  },
  {
    id: 22,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_21.jpg',
  },
  {
    id: 23,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_22.jpg',
  },
  {
    id: 24,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_23.jpg',
  },
  {
    id: 25,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_24.jpg',
  },
  {
    id: 26,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_25.jpg',
  },
  {
    id: 27,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_26.jpg',
  },
  {
    id: 28,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_27.jpg',
  },
  {
    id: 29,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_28.jpg',
  },
  {
    id: 30,
    category: ['bags'],
    name: '#',
    price: '#',
    img: 'P_29.jpg',
  },
  {
    id: 31,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_30.jpg',
  },
  {
    id: 32,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_31.jpg',
  },
  {
    id: 33,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_32.jpg',
  },
  {
    id: 34,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_33.jpg',
  },
  {
    id: 35,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_34.jpg',
  },
  {
    id: 36,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_35.jpg',
  },
  {
    id: 37,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_36.jpg',
  },
  {
    id: 38,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_37.jpg',
  },
  {
    id: 39,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_38.jpg',
  },
  {
    id: 40,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_39.jpg',
  },
  {
    id: 41,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_40.jpg',
  },
  {
    id: 42,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_41.jpg',
  },
  {
    id: 43,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_42.jpg',
  },
  {
    id: 44,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_43.jpg',
  },
  {
    id: 45,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_44.jpg',
  },
  {
    id: 46,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_45.jpg',
  },
  {
    id: 47,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_46.jpg',
  },
  {
    id: 48,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_47.jpg',
  },
  {
    id: 49,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_48.jpg',
  },
  {
    id: 50,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_49.jpg',
  },
  {
    id: 51,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_50.jpg',
  },
  {
    id: 52,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_51.jpg',
  },
  {
    id: 53,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_52.jpg',
  },
  {
    id: 54,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_53.jpg',
  },
  {
    id: 55,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_54.jpg',
  },
  {
    id: 56,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_55.jpg',
  },
  {
    id: 57,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_56.jpg',
  },
  {
    id: 58,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_57.jpg',
  },
  {
    id: 59,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_58.jpg',
  },
  {
    id: 60,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_59.jpg',
  },
  {
    id: 61,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_60.jpg',
  },
  {
    id: 62,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_61.jpg',
  },
  {
    id: 63,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_62.jpg',
  },
  {
    id: 64,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_63.jpg',
  },
  {
    id: 65,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_64.jpg',
  },
  {
    id: 66,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_65.jpg',
  },
  {
    id: 67,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_66.jpg',
  },
  {
    id: 68,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_67.jpg',
  },
  {
    id: 69,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_68.jpg',
  },
  {
    id: 70,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_69.jpg',
  },
  {
    id: 71,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_70.jpg',
  },
  {
    id: 72,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_71.jpg',
  },
  {
    id: 73,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_72.jpg',
  },
  {
    id: 74,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_73.jpg',
  },
  {
    id: 75,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_74.jpg',
  },
  {
    id: 76,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_75.jpg',
  },
  {
    id: 77,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_76.jpg',
  },
  {
    id: 78,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_77.jpg',
  },
  {
    id: 79,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_78.jpg',
  },
  {
    id: 80,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_79.jpg',
  },
  {
    id: 81,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_80.jpg',
  },
  {
    id: 82,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_81.jpg',
  },
  {
    id: 83,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_82.jpg',
  },
  {
    id: 84,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_83.jpg',
  },
  {
    id: 85,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_84.jpg',
  },
  {
    id: 86,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_85.jpg',
  },
  {
    id: 87,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_86.jpg',
  },
  {
    id: 88,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_87.jpg',
  },
  {
    id: 89,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_88.jpg',
  },
  {
    id: 90,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_89.jpg',
  },
  {
    id: 91,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_90.jpg',
  },
  {
    id: 92,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_91.jpg',
  },
  {
    id: 93,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_92.jpg',
  },
  {
    id: 94,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_93.jpg',
  },
  {
    id: 95,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_94.jpg',
  },
  {
    id: 96,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_95.jpg',
  },
  {
    id: 97,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_96.jpg',
  },
  {
    id: 98,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_97.jpg',
  },
  {
    id: 99,
    category: ['#'],
    name: '#',
    price: '#',
    img: 'P_98.jpg',
  },
  {
    id: 100,
    category: ['#'],
    name: '#',
    price: '#',
    img: '#',
  },
];


// Format price helper
function formatPrice(price) {
  return `₦${price.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Renders products based on filter and search term, updated to support multi-category arrays
function renderProducts(filter = 'all', searchTerm = '') {
  productsGrid.innerHTML = '';

  // Add price list image for waist beads filter
  if (filter === 'waist-beads') {
    const priceListCard = document.createElement('div');
    priceListCard.className = 'price-list-card';
    priceListCard.innerHTML = `
      <img src="price.jpeg" alt="Waist Beads Price List" loading="lazy" style="width: 100%; max-width: 600px; height: auto; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 8px 25px rgba(254, 142, 0, 0.4); border: 2px solid var(--color-sky);" />
    `;

    // Style the price list container to span full width and center the image
    priceListCard.style.cssText = `
      grid-column: 1 / -1;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 1.5rem;
      background: var(--bg-tertiary);
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 4px 20px var(--shadow-color);
      border: 1px solid var(--border-color);
    `;

    productsGrid.appendChild(priceListCard);
  }

  let filtered;
  if (filter === 'all') {
    filtered = productsData;
  } else {
    filtered = productsData.filter(p =>
      Array.isArray(p.category) ? p.category.includes(filter) : p.category === filter
    );
  }

  if (searchTerm) {
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(product.category)
        ? product.category.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
        : product.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }

  if(filtered.length === 0) {
    const noResultsMessage = searchTerm ?
      `No products found for "${searchTerm}".` :
      'No products found.';
    productsGrid.innerHTML = `<p style="color:#f2994a; text-align:center; width:100%;">${noResultsMessage}</p>`;
    return;
  }

  filtered.forEach(product => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.tabIndex = 0;

    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}" loading="lazy" />
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="product-price">${formatPrice(product.price)}</p>
        <div class="product-actions">
          <button class="btn-add-cart" data-id="${product.id}" aria-label="Add ${product.name} to cart">Add to Cart</button>
        </div>
      </div>
    `;

    productsGrid.appendChild(card);
  });
}

// Toggle mobile nav menu
const navOverlay = document.getElementById('nav-overlay');

hamburgerBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const expanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
  const newState = !expanded;

  hamburgerBtn.setAttribute('aria-expanded', newState);
  navMenu.classList.toggle('show', newState);
  navOverlay.classList.toggle('show', newState);
  document.body.classList.toggle('nav-open', newState);
});

// Close nav when clicking overlay
navOverlay.addEventListener('click', () => {
  closeNav();
});

// Close nav when clicking a nav link on mobile
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', (e) => {
    // Update active state for navigation links
    if (link.getAttribute('href').startsWith('#')) {
      navMenu.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
    closeNav();
  });
});

// Close nav function
function closeNav() {
  navMenu.classList.remove('show');
  navOverlay.classList.remove('show');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('nav-open');
}

// Close nav with escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('show')) {
    closeNav();
  }
});

// Close nav when clicking outside on larger screens
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 962 &&
      navMenu.classList.contains('show') &&
      !navMenu.contains(e.target) &&
      !hamburgerBtn.contains(e.target)) {
    closeNav();
  }
});

// Handle window resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 962) {
    closeNav();
  }
});

// Filter buttons logic with aria-pressed update
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    currentFilter = btn.dataset.filter;
    renderProducts(currentFilter, currentSearchTerm);
  });
});

// Search functionality
function showSearch() {
  searchContainer.classList.add('show');
  // Add a small delay to ensure the search container is fully visible before focusing
  setTimeout(() => {
    searchInput.focus();
  }, 300); // Wait for CSS transition to complete
}

function hideSearch() {
  searchContainer.classList.remove('show');
  searchInput.value = '';
  currentSearchTerm = '';
  renderProducts(currentFilter, currentSearchTerm);
}

function performSearch() {
  currentSearchTerm = searchInput.value.trim();
  renderProducts(currentFilter, currentSearchTerm);
}

// Search event listeners
searchBtn.addEventListener('click', showSearch);
searchCloseBtn.addEventListener('click', hideSearch);

// Search input event listener
searchInput.addEventListener('input', performSearch);

// Close search when clicking outside
document.addEventListener('click', (e) => {
  if (!searchContainer.contains(e.target) && !searchBtn.contains(e.target)) {
    if (searchContainer.classList.contains('show')) {
      hideSearch();
    }
  }
});

// Close search with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && searchContainer.classList.contains('show')) {
    hideSearch();
  }
});

// Initial render
renderProducts();

// Cart modal toggle
cartBtn.addEventListener('click', () => {
  if(cart.length > 0){
    cartModal.classList.add('show');
    cartModal.setAttribute('aria-hidden', 'false');
  }
});
cartCloseBtn.addEventListener('click', closeCartModal);
cartModal.addEventListener('click', (e) => {
  if(e.target === cartModal) closeCartModal();
});

function closeCartModal() {
  cartModal.classList.remove('show');
  cartModal.setAttribute('aria-hidden', 'true');
}

// Cart helpers
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountEl = document.querySelector('.cart-count');
  cartCountEl.textContent = count;
  if(count === 0) {
    cartCountEl.style.display = 'none';
    checkoutBtn.disabled = true;
  } else {
    cartCountEl.style.display = 'flex';
    checkoutBtn.disabled = false;
  }
}

function updateTotalPrice() {
  const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  totalPriceEl.textContent = `Total: ${formatPrice(total)}`;
}

function renderCart() {
  cartItemsList.innerHTML = '';
  if(cart.length === 0) {
    cartItemsList.innerHTML = '<li style="color:#f2994a; text-align:center;">Your cart is empty.</li>';
    updateTotalPrice();
    updateCartCount();
    return;
  }

  cart.forEach(item => {
    const li = document.createElement('li');
    li.className = 'cart-item';

    li.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>${formatPrice(item.price)}</p>
      </div>
      <div class="cart-item-quantity" aria-label="Quantity controls for ${item.name}">
        <button aria-label="Decrease quantity" data-id="${item.id}" class="qty-decrease">−</button>
        <span>${item.quantity}</span>
        <button aria-label="Increase quantity" data-id="${item.id}" class="qty-increase">+</button>
      </div>
      <button aria-label="Remove ${item.name} from cart" data-id="${item.id}" class="btn-remove-cart" title="Remove" style="background:none; border:none; color:#f2994a; cursor:pointer; font-size:1.2rem;">×</button>
    `;

    cartItemsList.appendChild(li);
  });

  updateTotalPrice();
  updateCartCount();

  // Add event listeners for qty buttons and remove
  cartItemsList.querySelectorAll('.qty-decrease').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      changeQuantity(id, -1);
    });
  });
  cartItemsList.querySelectorAll('.qty-increase').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      changeQuantity(id, 1);
    });
  });
  cartItemsList.querySelectorAll('.btn-remove-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      removeFromCart(id);
    });
  });
}

// Add to cart handler
productsGrid.addEventListener('click', e => {
  if(e.target.classList.contains('btn-add-cart')) {
    const id = parseInt(e.target.dataset.id);
    const product = productsData.find(p => p.id === id);
    if(product) addToCart(product);
  }
});

function addToCart(product) {
  const index = cart.findIndex(p => p.id === product.id);
  if(index === -1) {
    cart.push({...product, quantity: 1});
  } else {
    cart[index].quantity++;
  }
  saveCart(); // Save to localStorage
  renderCart();
  // Open cart modal when adding
  cartModal.classList.add('show');
  cartModal.setAttribute('aria-hidden', 'false');
}

function changeQuantity(id, delta) {
  const index = cart.findIndex(p => p.id === id);
  if(index !== -1) {
    cart[index].quantity += delta;
    if(cart[index].quantity < 1) {
      cart.splice(index, 1);
    }
    saveCart(); // Save to localStorage
    renderCart();
  }
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart(); // Save to localStorage
  renderCart();
}

// Checkout button handler with beautiful modal
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  // Build the order message
  currentOrderMessage = "Hi there! I would like to purchase:\n";
  cart.forEach(item => {
    currentOrderMessage += `- ${item.name} x${item.quantity} - ₦${(item.price * item.quantity).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`;
  });
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  currentOrderMessage += `Total amount: ₦${total.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n\nThank you!`;

  // Close cart modal and show checkout method selection
  closeCartModal();
  showCheckoutModal();
});

// Checkout modal functions
function showCheckoutModal() {
  checkoutModal.classList.add('show');
  checkoutModal.setAttribute('aria-hidden', 'false');
}

function closeCheckoutModal() {
  checkoutModal.classList.remove('show');
  checkoutModal.setAttribute('aria-hidden', 'true');
}

// Checkout modal event listeners
checkoutCloseBtn.addEventListener('click', closeCheckoutModal);
checkoutModal.addEventListener('click', (e) => {
  if (e.target === checkoutModal) closeCheckoutModal();
});

// WhatsApp option
whatsappBtn.addEventListener('click', () => {
  const phoneNumber = '2349078161442';
  const encodedMessage = encodeURIComponent(currentOrderMessage);
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(waUrl, '_blank');

  // Clear cart and close modals
  cart = [];
  saveCart(); // Clear from localStorage
  renderCart();
  closeCheckoutModal();
});

// Gmail option
gmailBtn.addEventListener('click', () => {
  const emailAddress = 'annysallure@gmail.com';
  const subject = encodeURIComponent('Purchase Order from Anny\'s Alllure Website');
  const body = encodeURIComponent(currentOrderMessage.replace(/\n/g, '%0D%0A'));
  const mailtoUrl = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  window.location.href = mailtoUrl;

  // Clear cart and close modals
  cart = [];
  saveCart(); // Clear from localStorage
  renderCart();
  closeCheckoutModal();
});

// Contact form handling
contactForm.addEventListener('submit', e => {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const phone = contactForm.phone.value.trim();
  const message = contactForm.message.value.trim();

  if(!name || !email || !message) {
    formStatus.textContent = 'Please fill in all required fields.';
    formStatus.style.color = 'var(--color-orange)';
    return;
  }

  if(!validateEmail(email)) {
    formStatus.textContent = 'Please enter a valid email.';
    formStatus.style.color = 'var(--color-orange)';
    return;
  }

  // Build WhatsApp message
  let whatsappMessage = `New Contact Form Message from Anny's Allure Website:\n\n`;
  whatsappMessage += `Name: ${name}\n`;
  whatsappMessage += `Email: ${email}\n`;
  if(phone) {
    whatsappMessage += `Phone: ${phone}\n`;
  }
  whatsappMessage += `Message: ${message}\n\n`;
  whatsappMessage += `Please respond to this customer inquiry. Thank you!`;

  // Send to both phone numbers
  const phoneNumbers = ['2349078161442', '2348102443212'];
  const encodedMessage = encodeURIComponent(whatsappMessage);

  // Open WhatsApp for first number
  const waUrl1 = `https://wa.me/${phoneNumbers[0]}?text=${encodedMessage}`;
  window.open(waUrl1, '_blank');

  // Open WhatsApp for second number after a small delay
  setTimeout(() => {
    const waUrl2 = `https://wa.me/${phoneNumbers[1]}?text=${encodedMessage}`;
    window.open(waUrl2, '_blank');
  }, 1000);

  formStatus.style.color = 'var(--color-sky)';
  formStatus.textContent = 'Message sent successfully! We will reply shortly.';
  contactForm.reset();
});

function validateEmail(email) {
  // Simple email regex
  return /\S+@\S+\.\S+/.test(email);
}