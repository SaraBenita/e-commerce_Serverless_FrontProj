
$("#userPic").attr("src", currentUser.profilePic);
$("#fullName").val(currentUser.username);
$("#email").val(currentUser.email);
$("#phone").val(currentUser.phone);
$("#city").val(currentUser.city);
$("#password").val(currentUser.password);


document.getElementById("cancelBtn").addEventListener(
    "click", () => {
        window.location.href = "./home.html";
    }
)

document.getElementById("updateBtn").addEventListener(
    "click", () => {
        if ($("#confirmPassword").val() == "" || $("#confirmPassword").val() != $("#password").val()) {
            alert("Incorect Password!");
            return;
        } else {
            currentUser.username = $("#fullName").val();
            currentUser.password = $("#password").val();
            currentUser.email = $("#email").val();
            currentUser.phone = $("#phone").val();
            currentUser.city = $("#city").val();
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            alert("User Updated!");
            window.location.reload();
            return;
        }
    }
)