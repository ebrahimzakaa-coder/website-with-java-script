


let username = document.querySelector("#username")

let email = document.querySelector("#email")

let password = document.querySelector("#password")

let registerBtn = document.querySelector("#sign_Up")

// /////////////////////////////////////////////////////////////////////////////

registerBtn.addEventListener("click" , function (e){
     e.preventDefault() 
    if( username.value ==="" || email.value ==="" || password.value ==="" ){
  
    alert("دخل البيانات كللها يسطا")

    }else{
        localStorage.setItem("username" , username.value)
        localStorage.setItem("email" , email.value)
        localStorage.setItem("password" , password.value)

        setTimeout(() => {
            window.location="login.html"
        } , 200)
    }
   

})



