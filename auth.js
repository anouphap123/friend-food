
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("signupUser").value;
    const password = document.getElementById("signupPass").value;

    let users = JSON.parse(localStorage.getItem("vikorea-users")) || [];
    if (users.find(u => u.username === username)) {
      alert("Tên đăng nhập đã tồn tại!");
      return;
    }

    users.push({ username, password });
    localStorage.setItem("vikorea-users", JSON.stringify(users));
    alert("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
    signupForm.reset();
    window.location.href = "login.html";
  });
}


const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("loginUser").value;
    const password = document.getElementById("loginPass").value;

    const users = JSON.parse(localStorage.getItem("vikorea-users")) || [];
    const found = users.find(u => u.username === username && u.password === password);

    if (found) {
      alert("Đăng nhập thành công!");
      localStorage.setItem("vikorea-current-user", JSON.stringify(found));
      window.location.href = "index.html";
    } else {
      alert("Sai tên đăng nhập hoặc mật khẩu!");
    }
  });
}
