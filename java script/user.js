let userinfo = document.querySelector("#user_info")

let datauser = document.querySelector("#user")

let links = document.querySelector(".links")




if (localStorage.getItem("username")) {
    links.remove()
    userinfo.style.display = "flex"
    datauser.innerHTML = localStorage.getItem("username")
}
let logoutBtn = document.querySelector("#logout")
logoutBtn.addEventListener("click", function () {
    localStorage.clear();
    setTimeout(() => {
        window.location = "login.html";
    }, 1000)
})