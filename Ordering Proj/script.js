function showLogin() {
    document.getElementById("signup-container").classList.add("hidden");
    document.getElementById("login-container").classList.remove("hidden");
    document.getElementById("dashboard").classList.add("hidden");
}

function showSignup() {
    document.getElementById("login-container").classList.add("hidden");
    document.getElementById("signup-container").classList.remove("hidden");
    document.getElementById("dashboard").classList.add("hidden");
}

function signup() {
    let username = document.getElementById("signup-username").value;
    let password = document.getElementById("signup-password").value;

    if (username === "" || password === "") {
        alert("Please fill all fields");
        return;
    }

    if (localStorage.getItem(username)) {
        alert("Username already exists");
        return;
    }

    localStorage.setItem(username, password);

    alert("Signup successful! You can now login.");
    showLogin();
}

function login() {
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    let storedPass = localStorage.getItem(username);

    if (storedPass && password === storedPass) {
        alert("Login successful!");

        document.getElementById("login-container").classList.add("hidden");
        document.getElementById("signup-container").classList.add("hidden");

        document.getElementById("dashboard").classList.remove("hidden");

    } else {
        alert("Invalid username or password");
    }
}

function logout() {
    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("login-container").classList.remove("hidden");
}
