document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElem = document.getElementById('cart-count');
    const cartTotalElem = document.getElementById('cart-total');
    const cartItemsElem = document.getElementById('cart-items');
    const emptyCartMessageElem = document.getElementById('empty-cart-message');

    function removeFromCart(id) {
        const index = cart.findIndex(item => item.id === id);
        if (index !== -1) {
            cart.splice(index, 1);
            saveCart();
            updateCart();
        }
    }

    function updateCart() {
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

        cartCountElem.textContent = cartCount;
        cartTotalElem.textContent = cartTotal;

        cartItemsElem.innerHTML = cart.map(item => `
            <li>
                ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
                <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            </li>
        `).join('');

        if (cart.length === 0) {
            emptyCartMessageElem.style.display = 'block';
        } else {
            emptyCartMessageElem.style.display = 'none';
        }

        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', () => removeFromCart(button.getAttribute('data-id')));
        });
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    document.getElementById('checkout').addEventListener('click', () => {
        alert('Checkout functionality is not implemented yet.');
    });

    updateCart();
});
