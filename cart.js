let cart = JSON.parse(localStorage.getItem("vikorea-cart")) || [];

const cartItemsDiv = document.getElementById("cartItems");
const totalPriceSpan = document.getElementById("totalPrice");

function renderCart() {
    cartItemsDiv.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Giỏ hàng đang trống.</p>";
        totalPriceSpan.textContent = "0";
        return;
    }

    cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "food-item";
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>Giá: ${item.price.toLocaleString()} VND</p>
            <p>Số lượng: ${item.quantity}</p>
            <button onclick="removeFromCart(${index})">Xóa</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
        total += item.price * item.quantity;
    });

    totalPriceSpan.textContent = total.toLocaleString();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("vikorea-cart", JSON.stringify(cart));
    renderCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống.");
        return;
    }
    alert("Cảm ơn bạn đã đặt hàng! Đơn hàng đang được xử lý.");
    cart = [];
    localStorage.removeItem("vikorea-cart");
    renderCart();
}

window.onload = renderCart;
