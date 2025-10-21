document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);
    const productDetailContent = document.getElementById('product-detail-content');

    if (product) {
        productDetailContent.innerHTML = `
            <div class="col-md-6 text-center">
                <img src="${product.image}" class="img-fluid rounded" alt="${product.name}">
            </div>
            <div class="col-md-6">
                <h1 class="display-5">${product.name}</h1>
                <p class="fs-4 price">$ ${product.price}</p>
                <p class="lead">${product.description}</p>
                <hr>
                <div class="d-grid gap-2">
                    <button class="btn btn-primary btn-lg" onclick="addToCart(${product.id})">
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        `;
    } else {
        productDetailContent.innerHTML = `
            <div class="col text-center">
                <h2>Sản phẩm không tồn tại!</h2>
                <a href="index.html" class="btn btn-primary">Về Trang Chủ</a>
            </div>
        `;
    }
});

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productToAdd = products.find(p => p.id === productId);
    if (productToAdd) {
        cart.push(productToAdd);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`Đã thêm "${productToAdd.name}" vào giỏ hàng!`);
    }
}