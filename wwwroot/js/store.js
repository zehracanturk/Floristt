// Product data
const products = [
    {
        id: 1,
        name: "Kırmızı Gül Buketi",
        price: 49.99,
        description: "Kırmızı güllerden oluşan klasik bir Buketi",
        image: "https://images.pexels.com/photos/931176/pexels-photo-931176.jpeg",
        category: "Güller"
    },
    {
        id: 2,
        name: "Pembe Zambak Buketi",
        price: 59.99,
        description: "Gül Pembe Zambak Buketi",
        image: "https://images.pexels.com/photos/931170/pexels-photo-931170.jpeg",
        category: "zambaklar"
    },
    {
        id: 3,
        name: "Karışık Laleler",
        price: 44.99,
        description: "Renkli Lale Buketi",
        image: "https://images.pexels.com/photos/931147/pexels-photo-931147.jpeg",
        category: "Laleler"
    },
    {
        id: 4,
        name: "Beyaz Gül Buketi",
        price: 54.99,
        description: "Zarif Beyaz Gül Buketi",
        image: "https://images.pexels.com/photos/931159/pexels-photo-931159.jpeg",
        category: "Güller"
    },
    {
        id: 5,
        name: "Ayçiçeği Buketi",
        price: 39.99,
        description: "Parlak Ayçiçeği Buketi",
        image: "https://images.pexels.com/photos/931158/pexels-photo-931158.jpeg",
        category: "Karışık"
    },
    {
        id: 6,
        name: "Karışık Bahçe Buketi",
        price: 64.99,
        description: "Bahçeden Toplanmış Karışık Çiçek Buketi",
        image: "https://images.pexels.com/photos/931161/pexels-photo-931161.jpeg",
        category: "Karışık"
    }
];

// Cart functionality
const SHIPPING_COST = 10.00;
const TAX_RATE = 0.10;

function getCart() {
    console.log('Getting cart from localStorage');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Current cart:', cart);
    return cart;
}

function saveCart(cart) {
    console.log('Saving cart to localStorage:', cart);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    console.log('Updating cart count');
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    console.log('New cart count:', count);
    
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = count;
    });
}

function addToCart(productId) {
    console.log('Adding product to cart:', productId);
    const cart = getCart();
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        console.error('Product not found:', productId);
        return false;
    }
    
    console.log('Found product:', product);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        console.log('Updating existing item quantity');
        existingItem.quantity += 1;
    } else {
        console.log('Adding new item to cart');
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart(cart);
    updateCartCount();
    return true;
}

function removeFromCart(productId) {
    console.log('Removing product from cart:', productId);
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    saveCart(updatedCart);
    updateCartCount();
}

function updateQuantity(productId, newQuantity) {
    console.log('Updating quantity for product:', productId, 'to:', newQuantity);
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }

    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCart(cart);
        updateCartCount();
    }
}

function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

function calculateTotals() {
    console.log('Calculating cart totals');
    const cart = getCart();
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = cart.length > 0 ? SHIPPING_COST : 0;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + shipping + tax;

    return {
        subtotal: formatPrice(subtotal),
        shipping: formatPrice(shipping),
        tax: formatPrice(tax),
        total: formatPrice(total)
    };
}

// Initialize cart count when the script loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing cart count');
    updateCartCount();
});
function renderCartItem(item) {
    return `
        <div class="flex items-center border-b pb-4">
            <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded">
            <div class="flex-1 ml-4">
                <h3 class="font-playfair text-lg">${item.name}</h3>
                <p class="text-gray-600">${formatPrice(item.price)}</p>
            </div>
            <div class="flex items-center space-x-2">
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="w-8 text-center">${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-plus"></i>
                </button>
                <button onclick="removeFromCart(${item.id})" class="ml-4 text-rose-600 hover:text-rose-700">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
}

function renderCart() {
    const cart = getCart();
    const cartItems = document.getElementById('cartItems');
    const emptyCartMessage = document.getElementById('emptyCartMessage');

    if (!cartItems || !emptyCartMessage) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '';
        emptyCartMessage.classList.remove('hidden');
    } else {
        cartItems.innerHTML = cart.map(renderCartItem).join('');
        emptyCartMessage.classList.add('hidden');
    }

    updateCartCount();
    updateCartTotals();
}

function updateCartTotals() {
    const totals = calculateTotals();
    if (document.getElementById('subtotal')) document.getElementById('subtotal').textContent = totals.subtotal;
    if (document.getElementById('shipping')) document.getElementById('shipping').textContent = totals.shipping;
    if (document.getElementById('tax')) document.getElementById('tax').textContent = totals.tax;
    if (document.getElementById('total')) document.getElementById('total').textContent = totals.total;
}
