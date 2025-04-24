const menuData = [
    { name: "kaeng nor mai", image: "https://f.ptcdn.info/820/084/000/lylfdr2niCMlFBpkaUm-o.jpg", category: "main", price: 85000 },
    { name: "tum mark houng", image: "https://store.longphuong.vn/wp-content/uploads/2022/08/picture-105-1644253697-735-width1499height1094-1.jpg", category: "side", price: 60000 },
    { name: "lap", image: "https://file3.qdnd.vn/data/images/0/2024/04/13/upload_2126/18.png?w=400", category: "side", price: 40000 },
    { name: "peeng kai", image: "https://s359.kapook.com/pagebuilder/ddc49bfb-3258-46b1-af1a-accb2ba2217b.jpg", category: "main", price: 60000 },
    { name: "khao niewniew", image: "https://www.yong.vn/Content/images/foods/xoi-lao.jpg", category: "main", price: 60000 },
    { name: "Beer Laos", image: "https://douongnhapkhau.com/wp-content/uploads/2021/06/Bia-L%C3%A0o-Lager-5-chai-640ml.png", category: "drink", price: 95000 },
    { name: "Pepsi", image: "https://product.hstatic.net/200000848723/product/pepi_afe7962d238e4789b3a0830b7ea74bb9_1024x1024.jpg", category: "drink", price: 20000 },
    { name: "Bia Heineken", image: "https://bianhagau.vn/wp-content/uploads/2024/07/Bia-Heineken-500ml.jpg", category: "drink", price: 30000 },
    { name: "num huua sua", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyGUv3h0BbnIY0qZZmRiH76yUksSXyzDRpug&s", category: "drink", price: 30000 },
    { name: "coca", image: "https://product.hstatic.net/1000141988/product/nuoc_ngot_cocacola_vi_nguyen_ban_320_ml_5545f89b5d434c548a8bff6118a3ed49.jpg", category: "drink", price: 30000 }

];

const menuList = document.getElementById("menuList");
const searchBox = document.getElementById("searchBox");
const filterCategory = document.getElementById("filterCategory");

function displayMenu(items) {
    menuList.innerHTML = "";
    items.forEach(item => {
        const div = document.createElement("div");
        div.className = "food-item";
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Giá: ${item.price.toLocaleString()} VND</p>
            <button onclick="addToCart('${item.name}')">Thêm vào giỏ</button>
        `;
        menuList.appendChild(div);
    });
}

function filterMenu() {
    const keyword = searchBox.value.toLowerCase();
    const category = filterCategory.value;

    const filtered = menuData.filter(item => {
        const matchesKeyword = item.name.toLowerCase().includes(keyword);
        const matchesCategory = category === "all" || item.category === category;
        return matchesKeyword && matchesCategory;
    });

    displayMenu(filtered);
}

searchBox.addEventListener("input", filterMenu);
filterCategory.addEventListener("change", filterMenu);

function addToCart(name) {
    const selected = menuData.find(item => item.name === name);
    let cart = JSON.parse(localStorage.getItem("vikorea-cart")) || [];

    const index = cart.findIndex(item => item.name === name);
    if (index !== -1) {
        cart[index].quantity += 1;
    } else {
        cart.push({ ...selected, quantity: 1 });
    }

    localStorage.setItem("vikorea-cart", JSON.stringify(cart));
    alert(`Đã thêm \"${name}\" vào giỏ hàng!`);
}

window.onload = () => displayMenu(menuData);
