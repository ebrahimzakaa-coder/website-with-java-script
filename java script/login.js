


let username = document.querySelector("#username")

let password = document.querySelector("#password")

let loginBtn = document.querySelector("#sign_In")

let getusername = localStorage.getItem("username")
let getpassword = localStorage.getItem("password")



loginBtn.addEventListener("click", function (e) {
    e.preventDefault()
    if (username.value === "" || password.value === "") {
        alert("يسطا دخل البيانات")
    } else {
        if (getusername && getusername.trim() === username.value.trim() && getpassword && getpassword.trim() === password.value) {

            setTimeout(() => {
                window.location = "index.html"
            }, 200)
        } else {
            alert("يسطا عيب عليك دخل البيانات صح")
        }
    }
})