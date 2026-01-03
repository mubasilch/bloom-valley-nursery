const CART_KEY = "cart";
const ORDER_KEY = "orderProcessed";

function getCart(){
  return JSON.parse(sessionStorage.getItem(CART_KEY)) || [];
}

function setCart(cart){
  sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(id, name, price){
  const cart = getCart();
  const existing = cart.find(i => i.id === id);
  if(existing){
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  setCart(cart);
  alert(`${name} added to cart.`);
  updateCartUI?.();
}

function removeFromCart(id){
  let cart = getCart();
  cart = cart.filter(i => i.id !== id);
  setCart(cart);
  updateCartUI?.();
}

function clearCart(){
  if(confirm("Clear your cart?")){
    sessionStorage.removeItem(CART_KEY);
    sessionStorage.removeItem(ORDER_KEY);
    alert("Cart cleared.");
    updateCartUI?.();
  }
}

function cartTotals(cart){
  const items = cart.reduce((sum, i) => sum + i.qty, 0);
  const total = cart.reduce((sum, i) => sum + (i.qty * i.price), 0);
  return { items, total };
}

function processOrder(){
  const cart = getCart();
  if(cart.length === 0){
    alert("Your cart is empty.");
    return;
  }

  if(sessionStorage.getItem(ORDER_KEY) === "true"){
    alert("Order already processed for this session.");
    return;
  }

  sessionStorage.setItem(ORDER_KEY, "true");
  sessionStorage.removeItem(CART_KEY);
  alert("Order processed successfully! Thanks for your purchase.");
  updateCartUI?.();
}

/* UI Rendering on gallery page (optional cart panel) */
function updateCartUI(){
  const cart = getCart();
  const panel = document.getElementById("cartPanel");
  const countEl = document.getElementById("cartCount");
  const totalEl = document.getElementById("cartTotal");
  const tableBody = document.getElementById("cartTableBody");

  if(countEl && totalEl){
    const { items, total } = cartTotals(cart);
    countEl.textContent = `${items} item(s)`;
    totalEl.textContent = `$${total.toFixed(2)}`;
  }

  if(panel && tableBody){
    tableBody.innerHTML = "";
    cart.forEach(i => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${i.name}</td>
        <td>${i.qty}</td>
        <td>$${(i.price * i.qty).toFixed(2)}</td>
        <td><button type="button" onclick="removeFromCart('${i.id}')">Remove</button></td>
      `;
      tableBody.appendChild(tr);
    });
  }
}
window.addEventListener("load", updateCartUI);
