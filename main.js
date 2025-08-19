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

// Product Gallery Modal elements
const galleryModal = document.getElementById('gallery-modal');
const galleryCloseBtn = document.querySelector('.gallery-close-btn');
const galleryMainImage = document.getElementById('gallery-main-image');
const galleryThumbnails = document.getElementById('gallery-thumbnails');
const galleryProductName = document.getElementById('gallery-product-name');
const galleryProductPrice = document.getElementById('gallery-product-price');
const galleryAddCartBtn = document.getElementById('gallery-add-cart');
const galleryPrevBtn = document.querySelector('.gallery-prev');
const galleryNextBtn = document.querySelector('.gallery-next');

let cart = [];
let currentOrderMessage = '';
let currentFilter = 'all';
let currentSearchTerm = '';
let currentGalleryProduct = null;
let currentImageIndex = 0;
let scrollPositionBeforeGallery = 0;

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

// Updated productsData with multiple images for first 6 products
const productsData = [
  {
    id: 1,
    category: ['bracelets'],
    name: 'Earth Warior',
    price: '10000',
    img: 'P_.jpg',
    images: ['P_.jpg',]
  },
  {
    id: 2,
    category: ['waist-beads'],
    name: 'Big Aunties Strands',
    price: '25000',
    img: 'P_1.jpg',
    images: [
      'P_1.jpg',
      'P_7.jpg'
    ]
  },
  {
    id: 3,
    category: ['necklace'],
    name: 'Pearl and Path',
    price: '45000',
    img: 'P_2.jpg',
    images: ['P_2.jpg',]
  },
  {
    id: 4,
    category: ['waist-beads'],
    name: 'Strand Of Excelence',
    price: '20000',
    img: 'P_3.jpg',
    images: ['P_3.jpg']
  },
  {
    id: 5,
    category: ['bracelets'],
    name: 'Obsidian Frost',
    price: '7000',
    img: 'P_4.jpg',
    images: ['P_4.jpg',
    ]
  },
  {
    id: 6,
    category: ['watches'],
    name: 'Premium Timepiece',
    price: '100000',
    img: 'P_5.jpg',
    images: [
      'P_5.jpg',
    ]
  },
  {
    id: 7,
    category: ['waist-beads'],
    name: '7',
    price: '#',
    img: 'P_6.jpg',
    images: ['P_6.jpg']

  },
  {
    id: 8,
    category: ['bracelets'],
    name: '8',
    price: '#',
    img: 'P_199.jpg',
    images: ['#']
  },
  {
    id: 9,
    category: ['necklace'],
    name: 'The Blue Evil Eye',
    price: '30000',
    img: 'P_8.jpg',
    images: ['P_8.jpg']
  },
  {
    id: 10,
    category: ['watches'],
    name: '10',
    price: '#',
    img: 'P_9.jpg',
    images: ['P_9.jpg',
            'P_25.jpg',
            'P_39.jpg',]
  },
  {
    id: 11,
    category: ['bags'],
    name: '11',
    price: '#',
    img: 'P_10.jpg',
    images: ['P_10.jpg',
            'P_44.jpg',]

  },
  {
    id: 12,
    category: ['bracelets'],
    name: '12',
    price: '#',
    img: 'P_11.jpg',
    images: ['P_11.jpg']

  },
  {
    id: 13,
    category: ['watches'],
    name: '13',
    price: '#',
    img: 'P_12.jpg',
    images: ['P_12.jpg',
            'P_67.jpg',]

  },
  {
    id: 14,
    category: ['necklace'],
    name: '14',
    price: '#',
    img: 'P_13.jpg',
    images: ['P_13.jpg']

  },
  {
    id: 15,
    category: ['watches'],
    name: '15',
    price: '#',
    img: 'P_14.jpg',
    images: ['P_14.jpg']

  },
  {
    id: 16,
    category: ['waist-beads'],
    name: '16',
    price: '#',
    img: 'P_15.jpg',
    images: ['P_15.jpg']

  },
  {
    id: 17,
    category: ['bracelets'],
    name: '17',
    price: '#',
    img: 'P_16.jpg',
    images: ['P_16.jpg']

  },
  {
    id: 18,
    category: ['waist-beads'],
    name: '18',
    price: '#',
    img: 'P_17.jpg',
    images: ['P_17.jpg']

  },
  {
    id: 19,
    category: ['necklace'],
    name: '19',
    price: '#',
    img: 'P_18.jpg',
    images: ['P_18.jpg']

  },
  {
    id: 20,
    category: ['trouser-chains'],
    name: '20',
    price: '#',
    img: 'P_19.jpg',
    images: ['P_19.jpg',
            'P_71.jpg',]
  },
  {
    id: 21,
    category: ['watches'],
    name: '21',
    price: '#',
    img: 'P_20.jpg',
    images: ['P_20.jpg']

  },
  {
    id: 22,
    category: ['bracelets'],
    name: '22',
    price: '#',
    img: 'P_21.jpg',
    images: ['P_21.jpg']

  },
  {
    id: 23,
    category: ['waist-beads'],
    name: '23',
    price: '#',
    img: 'P_22.jpg',
    images: ['P_22.jpg']

  },
  {
    id: 24,
    category: ['necklace'],
    name: '24',
    price: '#',
    img: 'P_23.jpg',
    images: ['P_23.jpg']

  },
  {
    id: 25,
    category: ['waist-beads'],
    name: '25',
    price: '#',
    img: 'P_24.jpg',
    images: ['P_24.jpg']

  },
  {
    id: 26,
    category: ['watches'],
    name: '26',
    price: '#',
    img: 'P_195.jpg',
    images: ['P_195.jpg',
            'P_196.jpg',
            'P_197.jpg',
            'P_198.jpg',]
  },
  {
    id: 27,
    category: ['watches'],
    name: '27',
    price: '#',
    img: 'P_26.jpg',
    images: ['P_26.jpg',
            'P_58.jpg',
            'P_59.jpg',]
  },
  {
    id: 28,
    category: ['waist-beads'],
    name: '28',
    price: '#',
    img: 'P_27.jpg',
    images: ['P_27.jpg',
            'P_190.jpg',
            'P_191.jpg',]
  },
  {
    id: 29,
    category: ['necklace'],
    name: '29',
    price: '#',
    img: 'P_28.jpg',
    images: ['P_28.jpg']
  },
  {
    id: 30,
    category: ['bags'],
    name: '30',
    price: '#',
    img: 'P_29.jpg',
    images: ['P_29.jpg']
  },
  {
    id: 31,
    category: ['necklace'],
    name: 'Fire On Me',
    price: '40000',
    img: 'P_69.jpg',
    images: ['P_69.jpg',
            'P_30.jpg',]

  },
  {
    id: 32,
    category: ['bracelets'],
    name: '32',
    price: '#',
    img: 'P_31.jpg',
    images: ['P_31.jpg']

  },
  {
    id: 33,
    category: ['bracelets', 'necklace'],
    name: '33',
    price: '#',
    img: 'P_32.jpg',
    images: ['P_32.jpg',]
  },
  {
    id: 34,
    category: ['watches'],
    name: '34',
    price: '#',
    img: 'P_33.jpg',
    images: ['P_33.jpg',]
  },
  {
    id: 35,
    category: ['necklace'],
    name: '35',
    price: '#',
    img: 'P_34.jpg',
    images: ['P_34.jpg',]
  },
  {
    id: 36,
    category: ['watches'],
    name: '36',
    price: '#',
    img: 'P_35.jpg',
    images: ['P_35.jpg',]
  },
  {
    id: 37,
    category: ['waist-beads'],
    name: '37',
    price: '#',
    img: 'P_36.jpg',
    images: ['P_36.jpg',]
  },
  {
    id: 38,
    category: ['waist-beads'],
    name: '38',
    price: '#',
    img: 'P_37.jpg',
    images: ['P_37.jpg',]
  },
  {
    id: 39,
    category: ['bracelets'],
    name: '39',
    price: '#',
    img: 'P_38.jpg',
    images: ['P_38.jpg',]
  },
  {
    id: 40,
    category: ['watches'],
    name: '40',
    price: '#',
    img: 'P_39.jpg',
    images: ['P_39.jpg',
            'P_25.jpg',
            'P_9.jpg',]
  },
  {
    id: 41,
    category: ['necklace'],
    name: '41',
    price: '#',
    img: 'P_40.jpg',
    images: ['P_40.jpg',]
  },
  {
    id: 42,
    category: ['waist-beads'],
    name: '42',
    price: '#',
    img: 'P_66.jpg',
    images: ['P_66.jpg',
            'P_41.jpg',]
  },
  {
    id: 43,
    category: ['waist-beads'],
    name: '43',
    price: '#',
    img: 'P_42.jpg',
    images: ['P_42.jpg',]
  },
  {
    id: 44,
    category: ['waist-beads'],
    name: '44',
    price: '#',
    img: 'P_43.jpg',
    images: ['P_43.jpg',]
  },
  {
    id: 45,
    category: ['bags'],
    name: '45',
    price: '#',
    img: 'P_192.jpg',
    images: ['P_192.jpg',
            'P_193.jpg',
            'P_194.jpg',]
  },
  {
    id: 46,
    category: ['watches'],
    name: '46',
    price: '#',
    img: 'P_45.jpg',
    images: ['P_45.jpg',]
  },
  {
    id: 47,
    category: ['necklace'],
    name: '47',
    price: '#',
    img: 'P_46.jpg',
    images: ['P_46.jpg',]
  },
  {
    id: 48,
    category: ['watches'],
    name: '48',
    price: '#',
    img: 'P_47.jpg',
    images: ['P_.47jpg',]
  },
  {
    id: 49,
    category: ['waist-beads'],
    name: '49',
    price: '#',
    img: 'P_48.jpg',
    images: ['P_48.jpg',]
  },
  {
    id: 50,
    category: ['necklace'],
    name: '50',
    price: '#',
    img: 'P_49.jpg',
    images: ['P_49.jpg',]
  },
  {
    id: 51,
    category: ['watches'],
    name: '51',
    price: '#',
    img: 'P_50.jpg',
    images: ['P_50.jpg',]
  },
  {
    id: 52,
    category: ['bracelets'],
    name: '52',
    price: '#',
    img: 'P_51.jpg',
    images: ['P_51.jpg',]
  },
  {
    id: 53,
    category: ['bracelets'],
    name: '53',
    price: '#',
    img: 'P_52.jpg',
    images: ['P_52.jpg',]
  },
  {
    id: 54,
    category: ['waist-beads'],
    name: '54',
    price: '#',
    img: 'P_53.jpg',
    images: ['P_53.jpg',]
  },
  {
    id: 55,
    category: ['watches'],
    name: '55',
    price: '#',
    img: 'P_54.jpg',
    images: ['P_54.jpg',]
  },
  {
    id: 56,
    category: ['bracelets'],
    name: '56',
    price: '#',
    img: 'P_55.jpg',
    images: ['P_55.jpg',]
  },
  {
    id: 57,
    category: ['bracelets'],
    name: '57',
    price: '#',
    img: 'P_56.jpg',
    images: ['P_56.jpg',]
  },
  {
    id: 58,
    category: ['waist-beads'],
    name: '58',
    price: '#',
    img: 'P_57.jpg',
    images: ['P_57.jpg',]
  },
  {
    id: 59,
    category: ['watches'],
    name: '59',
    price: '#',
    img: 'P_202.jpg',
    images: ['P_202.jpg'],
  },
  {
    id: 60,
    category: ['watches'],
    name: '60',
    price: '#',
    img: 'P_203.jpg',
    images: ['P_203.jpg',]
  },
  {
    id: 61,
    category: ['bracelets'],
    name: '61',
    price: '#',
    img: 'P_60.jpg',
    images: ['P_60.jpg',]
  },
  {
    id: 62,
    category: ['waist-beads'],
    name: '62',
    price: '#',
    img: 'P_61.jpg',
    images: ['P_61.jpg',]
  },
  {
    id: 63,
    category: ['bracelets'],
    name: '63',
    price: '#',
    img: 'P_62.jpg',
    images: ['P_62.jpg',]
  },
  {
    id: 64,
    category: ['bracelets'],
    name: '64',
    price: '#',
    img: 'P_63.jpg',
    images: ['P_63.jpg',]
  },
  {
    id: 65,
    category: ['watches'],
    name: '65',
    price: '#',
    img: 'P_64.jpg',
    images: ['P_64.jpg',]
  },
  {
    id: 66,
    category: ['bracelets'],
    name: '66',
    price: '#',
    img: 'P_65.jpg',
    images: ['P_65.jpg',]
  },
  {
    id: 67,
    category: ['waist-beads'],
    name: '67',
    price: '#',
    img: 'P_66.jpg',
    images: ['P_66.jpg',]
  },
  {
    id: 68,
    category: ['watches'],
    name: '68',
    price: '#',
    img: 'P_67.jpg',
    images: ['P_67.jpg',]
  },
  {
    id: 69,
    category: ['watches'],
    name: '69',
    price: '#',
    img: 'P_68.jpg',
    images: ['P_68.jpg',]
  },
  {
    id: 70,
    category: ['necklace'],
    name: '70',
    price: '#',
    img: 'P_204.jpg',
    images: ['P_204.jpg',]
  },
  {
    id: 71,
    category: ['bracelets'],
    name: '71',
    price: '#',
    img: 'P_70.jpg',
    images: ['P_70.jpg',]
  },
  {
    id: 72,
    category: ['trouser-chains'],
    name: '72',
    price: '#',
    img: 'P_71.jpg',
    images: ['P_71.jpg',]
  },
  {
    id: 73,
    category: ['waist-beads'],
    name: '73',
    price: '#',
    img: 'P_72.jpg',
    images: ['P_72.jpg',]
  },
  {
    id: 74,
    category: ['watches'],
    name: '74',
    price: '#',
    img: 'P_73.jpg',
    images: ['P_73.jpg',]
  },
  {
    id: 75,
    category: ['necklace'],
    name: '75',
    price: '#',
    img: 'P_74.jpg',
    images: ['P_74.jpg',]
  },
  {
    id: 76,
    category: ['watches'],
    name: '76',
    price: '#',
    img: 'P_75.jpg',
    images: ['P_75.jpg',]
  },
  {
    id: 77,
    category: ['waist-beads'],
    name: '77',
    price: '#',
    img: 'P_76.jpg',
    images: ['P_76.jpg',]
  },
  {
    id: 78,
    category: ['watches'],
    name: '78',
    price: '#',
    img: 'P_77.jpg',
    images: ['P_77.jpg',]
  },
  {
    id: 79,
    category: ['watches'],
    name: '79',
    price: '#',
    img: 'P_78.jpg',
    images: ['P_78.jpg',]
  },
  {
    id: 80,
    category: ['waist-beads'],
    name: '80',
    price: '#',
    img: 'P_79.jpg',
    images: ['P_79.jpg',]
  },
  {
    id: 81,
    category: ['bracelets'],
    name: '81',
    price: '#',
    img: 'P_80.jpg',
    images: ['P_80.jpg',]
  },
  {
    id: 82,
    category: ['watches'],
    name: '82',
    price: '#',
    img: 'P_81.jpg',
    images: ['P_81.jpg',]
  },
  {
    id: 83,
    category: ['waist-beads'],
    name: '83',
    price: '#',
    img: 'P_82.jpg',
    images: ['P_82.jpg',]
  },
  {
    id: 84,
    category: ['watches'],
    name: '84',
    price: '#',
    img: 'P_83.jpg',
    images: ['P_83.jpg',]
  },
  {
    id: 85,
    category: ['waist-beads'],
    name: '85',
    price: '#',
    img: 'P_84.jpg',
    images: ['P_84.jpg',]
  },
  {
    id: 86,
    category: ['waist-beads'],
    name: '86',
    price: '#',
    img: 'P_85.jpg',
    images: ['P_85.jpg',]
  },
  {
    id: 87,
    category: ['watches'],
    name: '87',
    price: '#',
    img: 'P_86.jpg',
    images: ['P_86.jpg',]
  },
  {
    id: 88,
    category: ['watches'],
    name: '88',
    price: '#',
    img: 'P_87.jpg',
    images: ['P_87.jpg',]
  },
  {
    id: 89,
    category: ['bracelets'],
    name: '89',
    price: '#',
    img: 'P_88.jpg',
    images: ['P_88.jpg',]
  },
  {
    id: 90,
    category: ['waist-beads'],
    name: '90',
    price: '#',
    img: 'P_89.jpg',
    images: ['P_89.jpg',]
  },
  {
    id: 91,
    category: ['watches'],
    name: '91',
    price: '#',
    img: 'P_90.jpg',
    images: ['P_90.jpg',]
  },
  {
    id: 92,
    category: ['waist-beads'],
    name: '92',
    price: '#',
    img: 'P_91.jpg',
    images: ['P_91.jpg',]
  },
  {
    id: 93,
    category: ['watches'],
    name: '93',
    price: '#',
    img: 'P_92.jpg',
    images: ['P_92.jpg',]
  },
  {
    id: 94,
    category: ['watches'],
    name: '94',
    price: '#',
    img: 'P_93.jpg',
    images: ['P_93.jpg',]
  },
  {
    id: 95,
    category: ['bracelets'],
    name: '95',
    price: '#',
    img: 'P_94.jpg',
    images: ['P_94.jpg',]
  },
  {
    id: 96,
    category: ['waist-beads'],
    name: '96',
    price: '#',
    img: 'P_95.jpg',
    images: ['P_95.jpg',]
  },
  {
    id: 97,
    category: ['waist-beads'],
    name: '97',
    price: '#',
    img: 'P_96.jpg',
    images: ['P_96.jpg',]
  },
  {
    id: 98,
    category: ['watches'],
    name: '98',
    price: '#',
    img: 'P_97.jpg',
    images: ['P_97.jpg',]
  },
  {
    id: 99,
    category: ['watches'],
    name: '99',
    price: '#',
    img: 'P_98.jpg',
    images: ['P_98.jpg',]
  },
  {
    id: 100,
    category: ['necklace'],
    name: '100',
    price: '#',
    img: 'P_99.jpg',
    images: ['P_99.jpg',]
  },
  {
    id: 101,
    category: ['watches'],
    name: '101',
    price: '#',
    img: 'P_100.jpg',
    images: ['P_100.jpg',
            'P_111.jpg',
            'P_112.jpg',
            'P_113.jpg',
            'P_114.jpg',
            'P_115.jpg',
            'P_116.jpg',
            'P_117.jpg',
            'P_118.jpg',
            'P_119.jpg',
            'P_120.jpg',
            'P_121.jpg',
            'P_122.jpg',]
  },
  {
    id: 102,
    category: ['waist-beads'],
    name: '102',
    price: '#',
    img: 'P_101.jpg',
    images: ['P_101.jpg',]
  },
  {
    id: 103,
    category: ['bracelets'],
    name: '103',
    price: '#',
    img: 'P_102.jpg',
    images: ['P_102.jpg',]
  },
  {
    id: 104,
    category: ['watches'],
    name: '104',
    price: '#',
    img: 'P_103.jpg',
    images: ['P_103.jpg',
            'P_136.jpg',
            'P_137.jpg',
            'P_138.jpg',
            'P_139.jpg',
              'P_140.jpg',
              'P_141.jpg',]
  },
  {
    id: 105,
    category: ['bracelets'],
    name: '105',
    price: '#',
    img: 'P_104.jpg',
    images: ['P_.jpg',]
  },
  {
    id: 106,
    category: ['waist-beads'],
    name: '106',
    price: '#',
    img: 'P_105.jpg',
    images: ['P_105.jpg',
            'P_106.jpg',
            'P_107.jpg',
            'P_108.jpg',]
  },
  {
    id: 107,
    category: ['waist-beads'],
    name: '107',
    price: '#',
    img: 'P_109.jpg',
    images: ['P_109.jpg',
            'P_110.jpg',],
  },
  {
    id: 108,
    category: ['watches'],
    name: '108',
    price: '#',
    img: 'P_111.jpg',
    images: ['P_111.jpg',
            'P_112.jpg',
            'P_113.jpg',
            'P_114.jpg',
            'P_115.jpg',
            'P_116.jpg',
            'P_117.jpg',
            'P_118.jpg',
            'P_119.jpg',
            'P_120.jpg',
            'P_121.jpg',
            'P_122.jpg',],
  },
  {
    id: 109,
    category: ['bracelets'],
    name: '109',
    price: '#',
    img: 'P_123.jpg',
    images: ['P_123.jpg'],
  },
  {
    id: 110,
    category: ['necklace'],
    name: '110',
    price: '#',
    img: 'P_124.jpg',
    images: ['P_124.jpg'],
  },
  {
    id: 111,
    category: ['bracelets'],
    name: '111',
    price: '#',
    img: 'P_125.jpg',
    images: ['P_125.jpg'],
  },
  {
    id: 112,
    category: ['bags'],
    name: '112',
    price: '#',
    img: 'P_126.jpg',
    images: ['P_126.jpg'],
  },
  {
    id: 113,
    category: ['waist-beads'],
    name: '113',
    price: '#',
    img: 'P_127.jpg',
    images: ['P_127.jpg',
            'P_128.jpg',
            'P_129.jpg',],
  },
  {
    id: 114,
    category: ['waist-beads'],
    name: '114',
    price: '#',
    img: 'P_130.jpg',
    images: ['P_130.jpg',
            'P_131.jpg',],
  },
  {
    id: 115,
    category: ['bracelets'],
    name: '115',
    price: '#',
    img: 'P_132.jpg',
    images: ['P_132.jpg'],
  },
  {
    id: 116,
    category: ['necklace'],
    name: '116',
    price: '#',
    img: 'P_133.jpg',
    images: ['P_133.jpg'],
  },
  {
    id: 117,
    category: ['bracelets'],
    name: 'Dad Bracelets',
    price: '6000',
    img: 'P_134.jpg',
    images: ['P_134.jpg'],
  },
  {
    id: 118,
    category: ['#'],
    name: '118',
    price: '#',
    img: 'P_135.jpg',
    images: ['P_135.jpg'],
  },
  {
    id: 119,
    category: ['watches'],
    name: '119',
    price: '#',
    img: 'P_136.jpg',
    images: ['P_136.jpg',
            'P_137.jpg',
            'P_138.jpg',
            'P_139.jpg',
            'P_140.jpg',
            'P_141.jpg',],
  },
  {
    id: 120,
    category: ['waist-beads'],
    name: '120',
    price: '#',
    img: 'P_142.jpg',
    images: ['P_142.jpg',
            'P_143.jpg',],
  },
  {
    id: 121,
    category: ['bracelets'],
    name: '121',
    price: '#',
    img: 'P_144.jpg',
    images: ['P_144.jpg'],
  },
  {
    id: 122,
    category: ['necklace'],
    name: '122',
    price: '#',
    img: 'P_145.jpg',
    images: ['P_145.jpg'],
  },
  {
    id: 123,
    category: ['necklace'],
    name: '123',
    price: '#',
    img: 'P_146.jpg',
    images: ['P_146.jpg'],
  },
  {
    id: 124,
    category: ['watches'],
    name: '124',
    price: '#',
    img: 'P_147.jpg',
    images: ['P_147.jpg',
            'P_148.jpg',
            'P_149.jpg',
            'P_150.jpg',
            'P_151.jpg',],
  },
  {
    id: 125,
    category: ['watches'],
    name: '125',
    price: '#',
    img: 'P_152.jpg',
    images: ['P_152.jpg',
            'P_153.jpg',
            'P_154.jpg',
            'P_155.jpg',
            'P_156.jpg',
            'P_157.jpg',],
  },
  {
    id: 126,
    category: ['waist-beads'],
    name: '126',
    price: '#',
    img: 'P_158.jpg',
    images: ['P_158.jpg',
            'P_159.jpg',],
  },
  {
    id: 127,
    category: ['watches'],
    name: '127',
    price: '#',
    img: 'P_160.jpg',
    images: ['P_160.jpg',
            'P_161.jpg',
            'P_162.jpg',
            'P_163.jpg',
            'P_164.jpg',
            'P_165.jpg',
            'P_166.jpg',
            'P_167.jpg',
            'P_168.jpg',
            'P_169.jpg',
            'P_170.jpg',
            'P_171.jpg',
            'P_172.jpg',
            'P_173.jpg',
            'P_174.jpg',
            'P_175.jpg',
            'P_176.jpg',
            'P_177.jpg',
            'P_178.jpg',
            'P_179.jpg',
            'P_178.jpg',
            'P_179.jpg',
            'P_180.jpg',
            'P_181.jpg',],
  },
  {
    id: 128,
    category: ['bracelets'],
    name: '128',
    price: '#',
    img: 'P_182.jpg',
    images: ['P_182.jpg'],
  },
  {
    id: 129,
    category: ['watches'],
    name: '129',
    price: '#',
    img: 'P_183.jpg',
    images: ['P_183.jpg',
            'P_184.jpg',
            'P_185.jpg',
            'P_186.jpg',
            'P_187.jpg',
            'P_188.jpg',
            'P_189.jpg',
            'P_200.jpg',],
  },
  {
    id: 130,
    category: ['bags'],
    name: '130',
    price: '#',
    img: 'P_201.jpg',
    images: ['#'],
  },
  {
    id: 131,
    category: ['#'],
    name: '131',
    price: '#',
    img: '#',
    images: ['#'],
  },
  {
    id: 132,
    category: ['#'],
    name: '132',
    price: '#',
    img: '#',
    images: ['#'],
  },
  {
    id: 133,
    category: ['#'],
    name: '133',
    price: '#',
    img: '#',
    images: ['#'],
  },
  {
    id: 134,
    category: ['#'],
    name: '134',
    price: '#',
    img: '#',
    images: ['#'],
  },
  {
    id: 135,
    category: ['#'],
    name: '135',
    price: '#',
    img: '#',
    images: ['#'],
  },
  {
    id: 136,
    category: ['#'],
    name: '136',
    price: '#',
    img: '#',
    images: ['#'],
  },
  {
    id: 137,
    category: ['#'],
    name: '137',
    price: '#',
    img: '#',
    images: ['#'],
  },
  {
    id: 138,
    category: ['#'],
    name: '138',
    price: '#',
    img: '#',
    images: ['#'],
  },
  {
    id: 139,
    category: ['#'],
    name: '139',
    price: '#',
    img: '#',
    images: ['#'],
  },
  {
    id: 140,
    category: ['#'],
    name: '140',
    price: '#',
    img: '#',
    images: ['#'],
  },
  {
    id: 141,
    category: ['#'],
    name: '141',
    price: '#',
    img: '#',
    images: ['#'],
  },
  {
    id: 142,
    category: ['#'],
    name: '142',
    price: '#',
    img: '#',
    images: ['#'],
  },
  {
    id: 143,
    category: ['#'],
    name: '143',
    price: '#',
    img: '#',
    images: ['#'],
  },
  {
    id: 144,
    category: ['#'],
    name: '144',
    price: '#',
    img: '#',
    images: ['#'],
  },
  {
    id: 145,
    category: ['#'],
    name: '145',
    price: '#',
    img: '#',
    images: ['#'],
  },
  {
    id: 146,
    category: ['#'],
    name: '146',
    price: '#',
    img: '#',
    images: ['#'],
  },
  {
    id: 147,
    category: ['#'],
    name: '147',
    price: '#',
    img: '#',
    images: ['#'],
  },
  {
    id: 148,
    category: ['#'],
    name: '148',
    price: '#',
    img: '#',
    images: ['#'],
  },
  {
    id: 149,
    category: ['#'],
    name: '149',
    price: '#',
    img: '#',
    images: ['#'],
  },
  {
    id: 150,
    category: ['#'],
    name: '150',
    price: '#',
    img: '#',
    images: ['#'],
  },
];

// Format price helper
function formatPrice(price) {
  return `₦${price.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Product Gallery Functions
function openGalleryModal(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product || product.name === '#') return;

  // Save current scroll position
  scrollPositionBeforeGallery = window.pageYOffset || document.documentElement.scrollTop;

  currentGalleryProduct = product;
  currentImageIndex = 0;

  // Update product details
  galleryProductName.textContent = product.name;
  galleryProductPrice.textContent = formatPrice(product.price);
  galleryAddCartBtn.dataset.id = product.id;

  // Use images array if available, otherwise fallback to single img
  const images = product.images || [product.img];
  updateGalleryImage(images[0]);
  renderThumbnails(images);

  // Show/hide navigation buttons based on image count
  galleryPrevBtn.style.display = images.length > 1 ? 'flex' : 'none';
  galleryNextBtn.style.display = images.length > 1 ? 'flex' : 'none';

  // Set proper ARIA attributes
  galleryModal.setAttribute('aria-hidden', 'false');
  galleryModal.setAttribute('role', 'dialog');
  galleryModal.setAttribute('aria-modal', 'true');
  galleryModal.setAttribute('aria-labelledby', 'gallery-title');

  galleryModal.classList.add('show');
  document.body.classList.add('modal-open');

  // Focus the close button for accessibility
  setTimeout(() => {
    galleryCloseBtn?.focus();
  }, 100);
}

function closeGalleryModal() {
  galleryModal.classList.remove('show');
  galleryModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  currentGalleryProduct = null;

  // Restore scroll position
  setTimeout(() => {
    window.scrollTo({
      top: scrollPositionBeforeGallery,
      behavior: 'smooth'
    });
  }, 100);

  // Return focus to the element that opened the modal
  const lastFocusedElement = document.activeElement;
  if (lastFocusedElement && lastFocusedElement !== document.body) {
    lastFocusedElement.blur();
  }
}

// Focus trapping function for accessibility
function trapFocus(e) {
  const focusableElements = galleryModal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === firstElement) {
      lastElement.focus();
      e.preventDefault();
    }
  } else {
    if (document.activeElement === lastElement) {
      firstElement.focus();
      e.preventDefault();
    }
  }
}

function updateGalleryImage(imageSrc) {
  // Show loading state
  galleryMainImage.style.opacity = '0.5';

  // Create new image for preloading
  const newImage = new Image();
  newImage.onload = () => {
    galleryMainImage.src = imageSrc;
    galleryMainImage.alt = currentGalleryProduct?.name || 'Product Image';
    galleryMainImage.style.opacity = '1';
  };

  newImage.onerror = () => {
    // Fallback to original image if optimization fails
    galleryMainImage.src = imageSrc;
    galleryMainImage.alt = currentGalleryProduct?.name || 'Product Image';
    galleryMainImage.style.opacity = '1';
  };

  // Set loading attribute for better performance
  galleryMainImage.loading = 'eager';
  galleryMainImage.decoding = 'async';

  // Start loading the new image
  newImage.src = imageSrc;
}

function renderThumbnails(images) {
  galleryThumbnails.innerHTML = '';

  images.forEach((imageSrc, index) => {
    const thumbnail = document.createElement('img');
    thumbnail.src = imageSrc;
    thumbnail.alt = `${currentGalleryProduct.name} - View ${index + 1}`;
    thumbnail.className = `gallery-thumbnail ${index === currentImageIndex ? 'active' : ''}`;
    thumbnail.setAttribute('tabindex', '0');
    thumbnail.setAttribute('role', 'button');
    thumbnail.setAttribute('aria-label', `View image ${index + 1} of ${images.length}`);

    // Click and keyboard event handlers
    thumbnail.addEventListener('click', () => selectImage(index));
    thumbnail.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectImage(index);
      }
    });

    galleryThumbnails.appendChild(thumbnail);
  });
}

function selectImage(index) {
  const images = currentGalleryProduct.images || [currentGalleryProduct.img];
  currentImageIndex = index;
  updateGalleryImage(images[index]);

  // Update active thumbnail
  document.querySelectorAll('.gallery-thumbnail').forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
}

function nextImage() {
  const images = currentGalleryProduct.images || [currentGalleryProduct.img];
  currentImageIndex = (currentImageIndex + 1) % images.length;
  selectImage(currentImageIndex);
}

function prevImage() {
  const images = currentGalleryProduct.images || [currentGalleryProduct.img];
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  selectImage(currentImageIndex);
}

// Gallery Modal Event Listeners
if (galleryModal) {
  galleryCloseBtn?.addEventListener('click', closeGalleryModal);
  galleryPrevBtn?.addEventListener('click', prevImage);
  galleryNextBtn?.addEventListener('click', nextImage);

  // Add proper accessibility attributes
  galleryCloseBtn?.setAttribute('aria-label', 'Close product gallery');
  galleryCloseBtn?.setAttribute('tabindex', '0');
  galleryPrevBtn?.setAttribute('aria-label', 'Previous product image');
  galleryPrevBtn?.setAttribute('tabindex', '0');
  galleryNextBtn?.setAttribute('aria-label', 'Next product image');
  galleryNextBtn?.setAttribute('tabindex', '0');

  galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
      closeGalleryModal();
    }
  });

  // Gallery add to cart button
  galleryAddCartBtn?.addEventListener('click', (e) => {
    const productId = parseInt(e.target.dataset.id);
    addToCart(productId);
    closeGalleryModal();
  });

  // Enhanced keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!galleryModal.classList.contains('show')) return;

    switch (e.key) {
      case 'Escape':
        closeGalleryModal();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        prevImage();
        break;
      case 'ArrowRight':
        e.preventDefault();
        nextImage();
        break;
      case 'Enter':
        if (e.target === galleryCloseBtn) {
          closeGalleryModal();
        } else if (e.target === galleryPrevBtn) {
          prevImage();
        } else if (e.target === galleryNextBtn) {
          nextImage();
        }
        break;
      case 'Tab':
        // Trap focus within modal
        trapFocus(e);
        break;
    }
  });
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

    // Use dynamic product data with # as placeholders
    const displayName = product.name;
    const displayPrice = product.price === '#' ? '#' : formatPrice(product.price);

    card.innerHTML = `
      <img src="${product.img}" alt="${displayName}" loading="lazy" />
      <div class="product-info">
        <h3>${displayName}</h3>
        <p class="product-price">${displayPrice}</p>
        <div class="product-actions">
          <button class="btn-add-cart" data-id="${product.id}" aria-label="Add ${displayName} to cart">Add to Cart</button>
        </div>
      </div>
    `;

    // Make whole card clickable for gallery (but not the button)
    card.addEventListener('click', (e) => {
      // Don't open gallery if clicking the add to cart button
      if (!e.target.closest('.btn-add-cart')) {
        openGalleryModal(product.id);
      }
    });

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
  if (window.innerWidth > 962) return;
  if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target) && navMenu.classList.contains('show')) {
    closeNav();
  }
});

// Search functionality
searchBtn.addEventListener('click', () => {
  searchContainer.classList.add('show');
  searchInput.focus();
});

searchCloseBtn.addEventListener('click', () => {
  searchContainer.classList.remove('show');
  searchInput.value = '';
  currentSearchTerm = '';
  renderProducts(currentFilter);
});

searchInput.addEventListener('input', (e) => {
  currentSearchTerm = e.target.value.trim();
  renderProducts(currentFilter, currentSearchTerm);
});

// Close search with escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && searchContainer.classList.contains('show')) {
    searchContainer.classList.remove('show');
    searchInput.value = '';
    currentSearchTerm = '';
    renderProducts(currentFilter);
  }
});

// Filter functionality - updated for proper ARIA state management
filterButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    // Update active filter button
    filterButtons.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });

    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');

    // Apply filter
    const filter = btn.dataset.filter;
    currentFilter = filter;
    renderProducts(filter, currentSearchTerm);
  });
});

// Toast notification function
function showToast(message, duration = 2000) {
  // Remove existing toast if any
  const existingToast = document.querySelector('.toast-notification');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.className = 'toast-notification show';
  toast.textContent = message;

  document.body.appendChild(toast);

  // Auto hide after duration
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, duration);
}

// Cart functionality
function addToCart(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) {
    showToast('Product not found');
    return;
  }

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    // Use product data as-is, including placeholders
    const price = product.price === '#' ? 0 : parseFloat(product.price);
    cart.push({
      id: productId,
      name: product.name,
      price: price,
      img: product.img,
      quantity: 1
    });
  }

  renderCart();
  saveCart();
  updateCartCount();

  // Show toast notification
  showToast(`${product.name} added to cart!`, 1500);

  // Auto open cart modal after a brief delay
  setTimeout(() => {
    openCartModal();
  }, 800);
}

// Function to open cart modal
function openCartModal() {
  cartModal.classList.add('show');
  cartModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function renderCart() {
  cartItemsList.innerHTML = '';

  if (cart.length === 0) {
    cartItemsList.innerHTML = '<li style="text-align: center; color: var(--text-muted); padding: 2rem;">Your cart is empty</li>';
    totalPriceEl.textContent = 'Total: ₦0.00';
    checkoutBtn.disabled = true;
    return;
  }

  let total = 0;

  cart.forEach(item => {
    const cartItem = document.createElement('li');
    cartItem.className = 'cart-item';

    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartItem.innerHTML = `
      <img src="${item.img}" alt="${item.name}" loading="lazy">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>${formatPrice(item.price)}</p>
      </div>
      <div class="cart-item-quantity">
        <button class="btn-quantity-decrease" data-id="${item.id}" aria-label="Decrease quantity">-</button>
        <span aria-live="polite">${item.quantity}</span>
        <button class="btn-quantity-increase" data-id="${item.id}" aria-label="Increase quantity">+</button>
      </div>
      <button class="btn-remove-item" data-id="${item.id}" aria-label="Remove item from cart">×</button>
    `;

    cartItemsList.appendChild(cartItem);
  });

  totalPriceEl.textContent = `Total: ${formatPrice(total)}`;
  checkoutBtn.disabled = false;
}

function updateCartCount() {
  const cartCount = document.querySelector('.cart-count');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (totalItems > 0) {
    cartCount.textContent = totalItems;
    cartCount.style.display = 'flex';
  } else {
    cartCount.style.display = 'none';
  }
}

function updateCartQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    const index = cart.findIndex(item => item.id === productId);
    cart.splice(index, 1);
  }

  renderCart();
  saveCart();
  updateCartCount();
}

function removeFromCart(productId) {
  const index = cart.findIndex(item => item.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
    renderCart();
    saveCart();
    updateCartCount();
  }
}

// Event delegation for cart buttons and product buttons
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-add-cart')) {
    const productId = parseInt(e.target.dataset.id);
    addToCart(productId);
  } else if (e.target.classList.contains('btn-quantity-increase')) {
    const productId = parseInt(e.target.dataset.id);
    updateCartQuantity(productId, 1);
  } else if (e.target.classList.contains('btn-quantity-decrease')) {
    const productId = parseInt(e.target.dataset.id);
    updateCartQuantity(productId, -1);
  } else if (e.target.classList.contains('btn-remove-item')) {
    const productId = parseInt(e.target.dataset.id);
    removeFromCart(productId);
  }
});

// Cart modal functionality
cartBtn.addEventListener('click', () => {
  openCartModal();
});

cartCloseBtn.addEventListener('click', () => {
  cartModal.classList.remove('show');
  cartModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
});

// Close cart modal when clicking outside
cartModal.addEventListener('click', (e) => {
  if (e.target === cartModal) {
    cartModal.classList.remove('show');
    cartModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }
});

// Checkout functionality
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) return;

  // Prepare order message
  let orderMessage = "Hello! I'd like to place an order:\n\n";
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    orderMessage += `• ${item.name} x${item.quantity} - ${formatPrice(itemTotal)}\n`;
  });

  orderMessage += `\nTotal: ${formatPrice(total)}`;
  orderMessage += `\n\nPlease confirm availability and provide payment details.`;

  currentOrderMessage = orderMessage;

  // Close cart modal and open checkout modal
  cartModal.classList.remove('show');
  cartModal.setAttribute('aria-hidden', 'true');
  checkoutModal.classList.add('show');
  checkoutModal.setAttribute('aria-hidden', 'false');
});

// Checkout method selection
whatsappBtn.addEventListener('click', () => {
  const whatsappUrl = `https://wa.me/2349078161442?text=${encodeURIComponent(currentOrderMessage)}`;
  window.open(whatsappUrl, '_blank');
  checkoutModal.classList.remove('show');
  checkoutModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
});

gmailBtn.addEventListener('click', () => {
  const subject = 'New Order from Website';
  const gmailUrl = `mailto:annysallure@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(currentOrderMessage)}`;
  window.location.href = gmailUrl;
  checkoutModal.classList.remove('show');
  checkoutModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
});

// Close checkout modal
checkoutCloseBtn.addEventListener('click', () => {
  checkoutModal.classList.remove('show');
  checkoutModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
});

checkoutModal.addEventListener('click', (e) => {
  if (e.target === checkoutModal) {
    checkoutModal.classList.remove('show');
    checkoutModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }
});

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (cartModal.classList.contains('show')) {
      cartModal.classList.remove('show');
      cartModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    } else if (checkoutModal.classList.contains('show')) {
      checkoutModal.classList.remove('show');
      checkoutModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    }
  }
});

// Contact form functionality with WhatsApp integration
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get('name').trim();
  const email = formData.get('email').trim();
  const phone = formData.get('phone').trim();
  const message = formData.get('message').trim();

  // Basic validation
  if (!name || !email || !message) {
    formStatus.innerHTML = '<span style="color: var(--color-orange);">Please fill in all required fields.</span>';
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    formStatus.innerHTML = '<span style="color: var(--color-orange);">Please enter a valid email address.</span>';
    return;
  }

  formStatus.innerHTML = '<span style="color: var(--color-sky);">Sending message...</span>';

  try {
    // Get current date and time
    const now = new Date();
    const timestamp = now.toLocaleString('en-NG', {
      timeZone: 'Africa/Lagos',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Create comprehensive WhatsApp message
    const whatsappMessage = `🌟 *NEW CONTACT FORM SUBMISSION* 🌟

👤 *Name:* ${name}
📧 *Email:* ${email}
${phone ? `📱 *Phone:* ${phone}` : ''}

💬 *Message:*
${message}

📅 *Submitted:* ${timestamp}
🌐 *Source:* Anny's Allure Website Contact Form

---
This message was automatically sent from the website contact form.`;

    // WhatsApp numbers to send to
    const whatsappNumbers = ['+2348102443212', '+2349078161442'];

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Create WhatsApp URLs
    const whatsappUrl1 = `https://wa.me/2348102443212?text=${encodedMessage}`;
    const whatsappUrl2 = `https://wa.me/2349078161442?text=${encodedMessage}`;

    // Show success message immediately
    formStatus.innerHTML = '<span style="color: #4CAF50;">Message prepared! WhatsApp will open to send your message to our team.</span>';

    // Reset form
    contactForm.reset();

    // Open first WhatsApp number
    setTimeout(() => {
      window.open(whatsappUrl1, '_blank');
    }, 500);

    // Open second WhatsApp number after a delay
    setTimeout(() => {
      window.open(whatsappUrl2, '_blank');
    }, 1500);

    // Update status message to inform about multiple windows
    setTimeout(() => {
      formStatus.innerHTML = '<span style="color: #4CAF50;">Two WhatsApp windows have opened - one for each contact number. Please send the message in both windows to ensure we receive it.</span>';
    }, 2000);

    // Clear success message after 10 seconds
    setTimeout(() => {
      formStatus.innerHTML = '';
    }, 10000);

  } catch (error) {
    formStatus.innerHTML = '<span style="color: var(--color-orange);">There was an error processing your message. Please try contacting us directly via WhatsApp at +2348102443212 or +2349078161442.</span>';
  }
});

// Initialize the app
renderProducts();
updateCartCount();