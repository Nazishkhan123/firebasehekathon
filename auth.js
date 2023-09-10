import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase,set,ref,onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";



const auth = getAuth();
const database =getDatabase()
const signup = ()=>{
    let username = document.getElementById("firstName")
    let lastname = document.getElementById("lastName")
    let email = document.getElementById("signup-email")
    let password = document.getElementById("signup-password")
    createUserWithEmailAndPassword (auth,email.value,password.value)

    .then((resolve)=>{
        alert("signup successfully",resolve)
        let userId= auth.currentUser.uid
        console.log(userId)
        let usersRefrence = ref(database ,"users/" + userId + "("+username.value +")");
        let userObject = {
            username:username.value,
            email:email.value,
            password:password.value,

        }
        set(usersRefrence,userObject)
    })
    .catch((reject)=>{
        alert("signup failed!",reject)
    })

}
let signup_btn=document.getElementById("signup-btn")
if(signup_btn){
signup_btn.addEventListener("click",signup)

}else{
const login = ()=>{
 
    let email = document.getElementById("email-login")
    let password = document.getElementById("password-login")
    signInWithEmailAndPassword(auth,email.value,password.value)

    .then((resolve)=>{
        alert("login successfully")
        window.location.href="./dashboard.html"
        let userId= auth.currentUser.uid
        let usernameRef = ref(database,"users/"+ userId)
        onValue(usernameRef,(data)=>{
            console.log(data.val());
        })
    
    })
    .catch((reject)=>{
        alert("login rejected")
    })

}
let login_btn=document.getElementById("login-btn")
login_btn.addEventListener("click",login)
}
