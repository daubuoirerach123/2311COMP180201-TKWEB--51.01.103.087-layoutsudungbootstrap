const productListEl = document.getElementById('product-list');
const cartStatusEl = document.getElementById('cart-status');
const searchInput = document.getElementById('search-input');
const categoryListEl = document.getElementById('category-list');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartUI() {
    cartStatusEl.textContent = `Có ${cart.length} sản phẩm`;
    localStorage.setItem('cart', JSON.stringify(cart));
}

function displayProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const activeCategory = document.querySelector('.category-item.active').dataset.category;

    const filteredProducts = products.filter(product => {
        const matchesCategory = (activeCategory === 'all' || product.category === activeCategory);
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    productListEl.innerHTML = '';
    if (filteredProducts.length === 0) {
        productListEl.innerHTML = '<p class="col-12 text-center">Không tìm thấy sản phẩm nào.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        productListEl.innerHTML += `
            <div class="col-md-4 mb-4">
                <a href="product.html?id=${product.id}" class="card-link">
                    <div class="card text-center h-100">
                        <img src="${product.image}" class="card-img-top p-3" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text price">$ ${product.price}</p>
                        </div>
                    </div>
                </a>
            </div>
        `;
    });
}

searchInput.addEventListener('input', displayProducts);

categoryListEl.addEventListener('click', (event) => {
    if (event.target.classList.contains('category-item')) {
        document.querySelector('.category-item.active').classList.remove('active');
        event.target.classList.add('active');
        displayProducts();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    categoryListEl.querySelector('[data-category="all"]').classList.add('active');
    updateCartUI();
    displayProducts();
});