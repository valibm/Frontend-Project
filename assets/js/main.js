//validate form
const validate = {
    password: {
        length: "Password length must be atleast 8 characters",
        lowerCase: "Password must contain at least one lowercase letter",
        upperCase: "Password must contain at least one uppercase letter",
    },
    name: {
        length: "Username length must be atleast 3 characters"
    }
}

const storage = "user";
const userLogin = "userLogin";

//inputs
const nameInput = document.querySelector(".nameI");
const passwordInput = document.querySelector(".passwordI");
const emailInput = document.querySelector(".emailI");
const prvCheck = document.querySelector(".prvCheck");

//form
const loginForm = document.querySelector(".loginForm");
const registerForm = document.querySelector(".regForm");

//profile
const profile = document.querySelector(".profileCard");

//Local storage get function
function localStorageGet(key) {
    return JSON.parse(localStorage.getItem(key));
}
//Local storage set function
function localStorageSet(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

let userState = [];
let userLoginData = {};

if (localStorageGet(userLogin)) {
    userLoginData = localStorageGet(userLogin);
}

if (localStorageGet(storage)) {
    userState = localStorageGet(storage);
}

registerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let data = Object.fromEntries(formData);
    if (prvCheck.checked) {
        if (!CheckEmail(data.email)) {
            userState.push(data);
            localStorageSet(storage, userState);
            window.location.pathname = "login.html";
            registerForm.reset();
        } else {
            alert("This email is being used by another account");
        }
    } else {
        alert("Please accept our Privacy Policy if you want to proceed");
    }
});


//Check username
function CheckEmail(email) {
    return userState.find((user) => user.email == email);
}

loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let data = Object.fromEntries(formData);
    let user = userState?.find((u) =>
        data.email == u.email &&
        data.password == u.password);
    if (user) {
        sessionStorage.setItem("isLogin", true);
        location.pathname = "profile.html";
        localStorageSet(userLogin, user);
    } else {
        alert("Email or password is wrong");
    }
});

//Validation Input
function validateInput(input, regex, message) {
    const newRegex = new RegExp(regex);
    if (newRegex.test(input?.value)) {
        return true;
    } else {
        if (input?.nextElementSibling?.tagName.toLowerCase() == "span") {
            input.nextElementSibling.innerText = message;
        }
    }
    return false;
};

//validate inputs
passwordInput?.addEventListener('keyup', function () {
    if (validateInput(this, /.{8,}/, validate.password.length) &&
        validateInput(this, /.*[A-Z]/, validate.password.upperCase) &&
        validateInput(this, /.*[a-z]/, validate.password.lowerCase)) {
        this.nextElementSibling.innerText = "";
    }
});

nameInput?.addEventListener('keyup', function () {
    if (validateInput(this, /.{3,}/, validate.name.length)) {
        this.nextElementSibling.innerText = "";
    }
});

emailInput?.addEventListener('keyup', function () {
    if (validateInput(this, /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, "Email is invalid")) {
        this.nextElementSibling.innerText = "";
    }
});

// (() => {
//  if (sessionStorage.getItem("isLogin") != "true" || !localStorageGet(userLogin)) {
//   profile?.innerHTML = `<div class="pCardHeader row justify-content-center">
//      <div class="profileStats col-lg-4 col-md-4 d-flex">
//       <div class="stat">
//        <span class="statHeader">22</span>
//        <span class="statBody">Friends</span>
//       </div>
//       <div class="stat">
//        <span class="statHeader">10</span>
//        <span class="statBody">Photos</span>
//       </div>
//       <div class="stat">
//        <span class="statHeader">89</span>
//        <span class="statBody">Comments</span>
//       </div>
//      </div>
//      <div class="profilePicture col-lg-3 col-md-3">
//       <img class="btnTransition" src="https://demos.creative-tim.com/argon-design-system-angular/assets/img/theme/team-4-800x800.jpg" alt="profile picture">
//      </div>
//      <div class="profileActions col-lg-4 col-md-4">
//       <a class="btn btn-sm btn-info btnHover btnTransition fw-600 connectBtn" href="">CONNECT</a>
//       <a class="btn btn-sm btnHover btnTransition fw-600 messageBtn" href="">MESSAGE</a>
//      </div>
//     </div>
//     <div class="pCardBody text-center">
//         <h3 class="fw-600">Jessica Jones <span class="fw-light">, 27</span></h3>
//         <p class="fw-light location">Bucharest, Romania</p>
//         <br>
//         <p class="occupation">Solution Manager - Creative Tim Officer</p>
//         <p class="education">University of Computer Science</p>
//     </div>
//     <div class="pCardFooter py-5 text-center">
//         <div class="row justify-content-center">
//             <div class="col-lg-9">
//              <p class="cardFooterText">An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.</p>
//              <p class="showMore">Show more</p>
//             </div>
//         </div>
//     </div>`
//  } else {
//   profile?.innerHTML = `<div class="pCardHeader row justify-content-center">
//      <div class="profileStats col-lg-4 d-flex">
//       <div class="stat">
//        <span class="statHeader">0</span>
//        <span class="statBody">Friends</span>
//       </div>
//       <div class="stat">
//        <span class="statHeader">0</span>
//        <span class="statBody">Photos</span>
//       </div>
//       <div class="stat">
//        <span class="statHeader">0</span>
//        <span class="statBody">Comments</span>
//       </div>
//      </div>
//      <div class="profilePicture col-lg-3">
//       <img class="btnTransition" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E" alt="profile picture">
//      </div>
//      <div class="profileActions col-lg-4">
//       <a class="btn btn-sm btn-info btnHover btnTransition fw-600 connectBtn" href="">CONNECT</a>
//       <a class="btn btn-sm btnHover btnTransition fw-600 messageBtn" href="">MESSAGE</a>
//      </div>
//     </div>
//     <div class="pCardBody text-center">
//         <h3 class="fw-600"> ${userLoginData.name}</h3>
//     </div>`
//  }
// })();


// tab-start

const text1 = document.querySelectorAll(".selectedText div");

const button1 = document.querySelectorAll(".sBtn");

button1.forEach((n) => {
    n.addEventListener("click", function () {
        let btn = document.querySelector(".btnClick");
        btn.classList.remove("btnClick");
        let id = this.getAttribute("id");
        console.log(id);
        text1.forEach((v) => {
            let dId = v.getAttribute("data-id");
            if (id == dId) {
                this.classList.add("btnClick");
                console.log(this);
                v.classList.remove("txtDefault");
                v.classList.add("txtSelected")
            }else{
                v.classList.remove("txtSelected")
                v.classList.add("txtDefault")

            }
        })
    })
})