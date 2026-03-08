const btn = document.getElementById("login-btn");
btn.addEventListener("click", () => {
    let username = document.getElementById("username-input").value;
    let password = document.getElementById("password").value;

    if (username.trim() === 'admin') {
        username = true;
    }
    else {
        username = false;
        alert("Wrong Cradentials");
        return;
    }

    if (password === "admin123") {
        password = true;
    } else {
        password = false;
        alert("Wrong Cradentials");
        return;
    }

    if (username && password) {
        window.location.assign("./home.html");
    }
})
