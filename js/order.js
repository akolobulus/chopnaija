document.addEventListener('DOMContentLoaded', () => {
    const menuItems = [
        { id: 1, name: 'Asaro', price: 1500, image: '/images/asaro.jpg' },
        { id: 2, name: 'Fufu', price: 1800, image: '/images/fufu.jpg' },
        { id: 3, name: 'Ofe Akwu', price: 2000, image: '/images/ofeakwu.png' },
        { id: 4, name: 'Gizdodo', price: 1500, image: '/images/gizdodo.jpg' },
        { id: 5, name: 'Egusi Soup', price: 4500, image: '/images/egusi.jpg' },
        { id: 6, name: 'Moi Moi', price: 3500, image: '/images/moi.jpeg' },
        { id: 7, name: 'Afang', price: 3500, image: '/images/afang.jpg' },
        { id: 8, name: 'Fura da Nono', price: 3500, image: '/images/fura.jpg' },
    ];
  
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderDetails = {
        name: '',
        phone: '',
        address: '',
        specialInstructions: ''
    };
  
    const menuItemsContainer = document.getElementById('menuItems');
    const cartContainer = document.getElementById('cart');
    const orderForm = document.getElementById('orderForm');
  
    function addToCart(item) {
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            cart = cart.map(cartItem => 
                cartItem.id === item.id 
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            );
        } else {
            cart = [...cart, { ...item, quantity: 1 }];
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
  
    function removeFromCart(itemId) {
        const existingItem = cart.find(cartItem => cartItem.id === itemId);
        if (existingItem.quantity === 1) {
            cart = cart.filter(cartItem => cartItem.id !== itemId);
        } else {
            cart = cart.map(cartItem => 
                cartItem.id === itemId 
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            );
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
  
    function calculateTotal() {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
  
    function handleInputChange(event) {
        const { name, value } = event.target;
        orderDetails[name] = value;
    }
  
    function submitOrder(event) {
        event.preventDefault();
        const orderSummary = {
            items: cart,
            total: calculateTotal(),
            customerDetails: orderDetails
        };
        console.log('Order Submitted:', orderSummary);
        alert('Order placed successfully! We will contact you shortly.');
        cart = [];
        localStorage.removeItem('cart');
        orderForm.reset();
        renderCart();
    }
  
    function renderMenuItems() {
        if (!menuItemsContainer) return;
        menuItems.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
  
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;
  
            const name = document.createElement('h4');
            name.textContent = item.name;
  
            const price = document.createElement('p');
            price.textContent = `₦${item.price.toLocaleString()}`;
  
            const button = document.createElement('button');
            button.className = 'btn';
            button.innerHTML = 'Add to Cart';
            button.addEventListener('click', () => addToCart(item));
  
            menuItem.appendChild(img);
            menuItem.appendChild(name);
            menuItem.appendChild(price);
            menuItem.appendChild(button);
  
            menuItemsContainer.appendChild(menuItem);
        });
    }
  
    function renderCart() {
        if (!cartContainer) return;
        cartContainer.innerHTML = '';
        if (cart.length === 0) {
            cartContainer.textContent = 'Your cart is empty';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
  
                const img = document.createElement('img');
                img.src = item.image;
                img.alt = item.name;
  
                const details = document.createElement('div');
                details.className = 'cart-item-details';
  
                const name = document.createElement('h4');
                name.textContent = item.name;
  
                const price = document.createElement('p');
                price.textContent = `₦${item.price.toLocaleString()}`;
  
                const quantityControl = document.createElement('div');
                quantityControl.className = 'quantity-control';
  
                const minusButton = document.createElement('button');
                minusButton.innerHTML = '-';
                minusButton.addEventListener('click', () => removeFromCart(item.id));
  
                const quantity = document.createElement('span');
                quantity.textContent = item.quantity;
  
                const plusButton = document.createElement('button');
                plusButton.innerHTML = '+';
                plusButton.addEventListener('click', () => addToCart(item));
  
                quantityControl.appendChild(minusButton);
                quantityControl.appendChild(quantity);
                quantityControl.appendChild(plusButton);
  
                details.appendChild(name);
                details.appendChild(price);
                details.appendChild(quantityControl);
  
                cartItem.appendChild(img);
                cartItem.appendChild(details);
  
                cartContainer.appendChild(cartItem);
            });
  
            const cartSummary = document.createElement('div');
            cartSummary.className = 'cart-summary';
            cartSummary.textContent = `Total: ₦${calculateTotal().toLocaleString()}`;
            cartContainer.appendChild(cartSummary);
        }
    }
  
    // Add to Cart button handling on index.html
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const itemId = parseInt(button.getAttribute('data-item-id'));
            const item = menuItems.find(menuItem => menuItem.id === itemId);
            if (item) {
                addToCart(item);
                window.location.href = 'order.html';
            }
        });
    });
  
    if (orderForm) {
        orderForm.addEventListener('submit', submitOrder);
        orderForm.addEventListener('input', handleInputChange);
    }
    renderMenuItems();
    renderCart();
});
