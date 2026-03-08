const btn = document.getElementById("login-btn");
btn.addEventListener("click", () => {
    let username = document.getElementById("username-input").value;
    let password = document.getElementById("password").value;

    if (username.trim() !== "admin") {
        alert("Wrong Cradentials");
        return;
    }

    if (password !== "admin123") {
        alert("Wrong Cradentials");
        return;
    }

    window.location.assign("./home.html");
});
