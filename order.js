const orderForm = document.getElementById("orderForm");
const orderSearch = document.getElementById("orderSearch");
const orderResult = document.getElementById("orderResult");

orderForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;

    const cart = JSON.parse(localStorage.getItem("vikorea-cart")) || [];
    if (cart.length === 0) {
        alert("Giỏ hàng đang trống!");
        return;
    }

    const order = {
        name,
        address,
        phone,
        items: cart,
        status: "Đang xử lý",
        createdAt: new Date().toLocaleString()
    };

    let orders = JSON.parse(localStorage.getItem("vikorea-orders")) || [];
    orders.push(order);
    localStorage.setItem("vikorea-orders", JSON.stringify(orders));
    localStorage.removeItem("vikorea-cart");

    alert("Đặt hàng thành công! Đơn hàng đang được xử lý.");
    orderForm.reset();
});

orderSearch.addEventListener("input", () => {
    const phone = orderSearch.value.trim();
    const orders = JSON.parse(localStorage.getItem("vikorea-orders")) || [];
    const matched = orders.filter(o => o.phone.includes(phone));

    if (phone === "" || matched.length === 0) {
        orderResult.innerHTML = "<p>Không tìm thấy đơn hàng.</p>";
        return;
    }

    orderResult.innerHTML = matched.map((o, i) => `
        <div class="order-box">
            <h4>Đơn #${i + 1} - ${o.status}</h4>
            <p><strong>Họ tên:</strong> ${o.name}</p>
            <p><strong>Địa chỉ:</strong> ${o.address}</p>
            <p><strong>Ngày đặt:</strong> ${o.createdAt}</p>
            <ul>
                ${o.items.map(item => `<li>${item.name} x${item.quantity}</li>`).join("")}
            </ul>
        </div>
    `).join("");
});
