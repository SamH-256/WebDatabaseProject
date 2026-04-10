let loginForm = document.getElementById("loginForm")
let registerForm = document.getElementById("registerForm")

if (loginForm) {
    loginForm.addEventListener("submit", login)
}

if (registerForm) {
    registerForm.addEventListener("submit", register)
}

function login(e) {
    e.preventDefault()
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value

    const user = {
        email: email,
        password: password
    }

    console.log(user)
}

function register(e) {
    e.preventDefault()
    let firstName = document.getElementById("firstName").value
    let lastName = document.getElementById("lastName").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value

    const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    }

    console.log(user)
}