document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElem = document.getElementById('cart-count');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productElem = button.closest('.product');
            const id = productElem.getAttribute('data-id');
            const name = productElem.querySelector('h3').textContent;
            const price = parseFloat(productElem.querySelector('p').textContent.replace('$', ''));

            const item = cart.find(item => item.id === id);
            if (item) {
                item.quantity++;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }

            updateCartCount();
            saveCart();
        });
    });

    function updateCartCount() {
        cartCountElem.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    updateCartCount();
});
    