// --- DỮ LIỆU ---
const products = [
    { id: 1, name: 'iPhone 14 Pro', price: 1099.9, image: 'iphone14.png', category: 'Điện thoại' },
    { id: 2, name: 'Samsung Galaxy S23', price: 999.9, image: 'samsungs23.png', category: 'Điện thoại' },
    { id: 3, name: 'Macbook Air M2', price: 1299.0, image: 'macbook.png', category: 'Laptop' },
    { id: 4, name: 'Dell XPS 15', price: 1599.5, image: 'dell.png', category: 'Laptop' },
    { id: 5, name: 'iPad Pro 11', price: 799.0, image: 'ipad.png', category: 'Tablet' },
    { id: 6, name: 'Xiaomi Pad 6', price: 499.0, image: 'xiaomi.png', category: 'Tablet' },
];

// --- Lấy các phần tử HTML cần dùng ---
const productListEl = document.getElementById('product-list');
const cartStatusEl = document.getElementById('cart-status');
const searchInput = document.getElementById('search-input');
const categoryListEl = document.getElementById('category-list');

// --- Giỏ hàng ---
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Cập nhật giao diện giỏ hàng
function updateCartUI() {
    cartStatusEl.textContent = `Có ${cart.length} sản phẩm`;
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Thêm sản phẩm vào giỏ (để global để HTML có thể gọi)
window.addToCart = function(productId) {
    const productToAdd = products.find(p => p.id === productId);
    if (productToAdd) {
        cart.push(productToAdd);
        updateCartUI();
        alert(`Đã thêm "${productToAdd.name}" vào giỏ hàng!`);
    }
}

// --- Hàm hiển thị sản phẩm chính ---
function displayProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const activeCategory = document.querySelector('.category-item.active').dataset.category;

    // Lọc sản phẩm dựa trên tìm kiếm và chủng loại
    const filteredProducts = products.filter(product => {
        const matchesCategory = (activeCategory === 'all' || product.category === activeCategory);
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    // Tạo HTML và hiển thị ra màn hình
    productListEl.innerHTML = ''; // Xóa sản phẩm cũ
    if (filteredProducts.length === 0) {
        productListEl.innerHTML = '<p class="col-12 text-center">Không tìm thấy sản phẩm nào.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        productListEl.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card text-center">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text price">$ ${product.price}</p>
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">Thêm vào giỏ</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// --- Gắn sự kiện ---

// Sự kiện gõ chữ vào ô tìm kiếm (tìm kiếm real-time)
searchInput.addEventListener('input', displayProducts);

// Sự kiện click vào danh sách chủng loại
categoryListEl.addEventListener('click', (event) => {
    // Chỉ hoạt động nếu click vào một mục `category-item`
    if (event.target.classList.contains('category-item')) {
        // Bỏ active ở mục cũ và thêm active cho mục vừa click
        document.querySelector('.category-item.active').classList.remove('active');
        event.target.classList.add('active');
        displayProducts(); // Vẽ lại danh sách sản phẩm
    }
});


// --- Khởi chạy khi trang được tải ---
document.addEventListener('DOMContentLoaded', () => {
    // Đánh dấu mục "Tất cả" là mục được chọn ban đầu
    categoryListEl.querySelector('[data-category="all"]').classList.add('active');
    
    // Cập nhật số lượng giỏ hàng từ bộ nhớ
    updateCartUI();
    
    // Hiển thị tất cả sản phẩm
    displayProducts();
});