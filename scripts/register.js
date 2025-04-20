class User {
    constructor(username, password, email, phone, gender, city, userId, profilePic) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.city = city;
        this.userId = userId;
        this.profilePic = profilePic;
    }
}
class Seller {
    constructor(username, password, email, phone, gender, city, sellerId, profilePic) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.city = city;
        this.sellerId = sellerId;
        this.profilePic = profilePic;
    }
}

function isEmailRegistered(email) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let sellers = JSON.parse(localStorage.getItem("sellers")) || [];

    let foundInUsers = users.some(user => user.email === email);
    let foundInSellers = sellers.some(seller => seller.email === email);

    if (foundInUsers || foundInSellers) {
        alert("This Email is alrady in use!");
        return true;
    }
    return false;
}


$("#registerBtn").click(async (event) => {
    event.preventDefault();
    let username = $("#username").val();
    let password = $("#password").val();
    let email = $("#email").val().trim().toLowerCase();;
    let phone = $("#phone").val();
    let city = $("#city").val();
    let genderOptions = document.getElementsByName("inlineRadioOptions"); //arr
    let gender = null;
    for (let i in genderOptions) {
        if (genderOptions[i].checked) {
            gender = genderOptions[i].value;
            break;
        }
    }
    let configOptions = document.getElementsByName("configOptions"); //arr
    let config = null;
    for (let i in genderOptions) {
        if (configOptions[i].checked) {
            config = configOptions[i].value;
            break;
        }
    }

    // בדיקת קיום האימייל במערכת
    if (isEmailRegistered(email)) {
        return;
    }

    let profilePic = await converPic()
    if (config == "user") {
        let newUser = new User(username, password, email, phone, gender, city)
        newUser.profilePic = profilePic;
        let users = JSON.parse(localStorage.getItem("users"));
        if (users) {
            newUser.userId = users[users.length - 1].userId + 1;
            users.push(newUser)
            localStorage.setItem("users", JSON.stringify(users));
        } else {
            newUser.userId = 1;
            localStorage.setItem("users", JSON.stringify([newUser]));
        }
    } else {
        let newSeller = new Seller(username, password, email, phone, gender, city)
        newSeller.profilePic = profilePic
        let sellers = JSON.parse(localStorage.getItem("sellers"));
        if (sellers) {
            newSeller.sellerId = sellers[sellers.length - 1].sellerId + 1;
            sellers.push(newSeller)
            localStorage.setItem("sellers", JSON.stringify(sellers));
        } else {
            newSeller.sellerId = 1;
            localStorage.setItem("sellers", JSON.stringify([newSeller]));
        }
    }
    alert(`new ${config.toUpperCase()} Created`);
    window.location.href = "./login.html";
})


function converPic() {
    const file = document.getElementById("picOption").files[0];
    if (!file) {
        return "../images/profileDefault.png"
    }
    else {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = function () {
                const base64 = reader.result;
                resolve(base64);
            }
            reader.readAsDataURL(file);
        })
    }
}