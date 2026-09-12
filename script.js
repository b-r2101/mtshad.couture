const cart = [];
const cartDrawer = document.querySelector('#cartDrawer');
const overlay = document.querySelector('#overlay');
const cartItems = document.querySelector('#cartItems');
const cartCount = document.querySelector('#cartCount');
const cartTotal = document.querySelector('#cartTotal');

function toggleCart(open) {
  cartDrawer.classList.toggle('open', open);
  overlay.classList.toggle('open', open);
  cartDrawer.setAttribute('aria-hidden', String(!open));
}

function renderCart() {
  cartCount.textContent = cart.length;
  cartTotal.textContent = `$${cart.reduce((total, item) => total + item.price, 0)}`;
  if (!cart.length) {
    cartItems.innerHTML = '<p class="empty-cart">Your bag is currently empty.</p>';
    return;
  }
  cartItems.innerHTML = cart.map((item, index) => `<div class="cart-line"><span>${item.name}</span><strong>$${item.price}</strong><button aria-label="Remove ${item.name}" data-remove="${index}">×</button></div>`).join('');
}

document.querySelector('#cartButton').addEventListener('click', () => toggleCart(true));
document.querySelector('#closeCart').addEventListener('click', () => toggleCart(false));
overlay.addEventListener('click', () => toggleCart(false));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') toggleCart(false); });

document.querySelectorAll('.quick-add').forEach((button) => {
  button.addEventListener('click', () => {
    cart.push({ name: button.dataset.name, price: Number(button.dataset.price) });
    document.querySelector('#selectedAbaya').textContent = button.dataset.name;
    document.querySelector('#orderSection').hidden = false;
    renderCart();
    document.querySelector('#orderSection').scrollIntoView({ behavior: 'smooth' });
  });
});

cartItems.addEventListener('click', (event) => {
  const removeIndex = event.target.dataset.remove;
  if (removeIndex !== undefined) {
    cart.splice(Number(removeIndex), 1);
    renderCart();
  }
});

document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach((filter) => filter.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.product-card').forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});

document.querySelector('#orderForm').addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('#orderMessage').textContent = 'Thank you. Your MtShad order request has been received.';
});

document.querySelector('#menuButton').addEventListener('click', () => {
  document.querySelector('.desktop-nav').classList.toggle('mobile-open');
});
