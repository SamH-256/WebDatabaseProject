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

    fetchData('/user/login', user, "POST")
    .then(data => {
        if (!data.message) {
            setCurrentUser(data)
            window.location.href = "dashboard.html"
        }
    })
    .catch(err => {
        let errorSelection = document.querySelector("#loginForm .error")
        console.log(errorSelection)
        errorSelection.innerText=err.message
    })
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

    fetchData('/user/register', user, "POST")
    .then(data => {
        if(!data.message) {
            window.location.href = "dashboard.html"
        }
    })
    .catch(err => {
        let errorSection = document.querySelector("#registerForm .error")
        errorSection.innerText=err.message
    })
}

async function fetchData(route = '', data = {}, methodType) {
    const response = await fetch(`http://localhost:3000${route}`, {
        method: methodType,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if(response.ok) {
        return await response.json();
    }
    else {
        throw await response.json();
    }
}

function setCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}

function removeCurrentUser() {
    localStorage.removeItem('user');
}