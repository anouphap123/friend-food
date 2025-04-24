const adminOrdersDiv = document.getElementById("adminOrders");

function renderAdminOrders() {
  const orders = JSON.parse(localStorage.getItem("vikorea-orders")) || [];

  if (orders.length === 0) {
    adminOrdersDiv.innerHTML = "<p>Chưa có đơn hàng nào.</p>";
    return;
  }

  adminOrdersDiv.innerHTML = orders.map((o, index) => `
    <div class="order-box">
      <h4>Đơn #${index + 1} - <span>${o.status}</span></h4>
      <p><strong>Khách:</strong> ${o.name}</p>
      <p><strong>Địa chỉ:</strong> ${o.address}</p>
      <p><strong>SĐT:</strong> ${o.phone}</p>
      <p><strong>Ngày đặt:</strong> ${o.createdAt}</p>
      <ul>${o.items.map(item => `<li>${item.name} x${item.quantity}</li>`).join("")}</ul>
      <label>Trạng thái: 
        <select onchange="updateStatus(${index}, this.value)">
          <option value="Đang xử lý" ${o.status === "Đang xử lý" ? "selected" : ""}>Đang xử lý</option>
          <option value="Đã giao" ${o.status === "Đã giao" ? "selected" : ""}>Đã giao</option>
        </select>
      </label>
    </div>
  `).join("");
}

function updateStatus(index, status) {
  const orders = JSON.parse(localStorage.getItem("vikorea-orders")) || [];
  orders[index].status = status;
  localStorage.setItem("vikorea-orders", JSON.stringify(orders));
  renderAdminOrders();
}

window.onload = renderAdminOrders;
