document.querySelectorAll('.dropdown-toggle').forEach(item => {
    item.addEventListener('click', event => {
        if (event.target.classList.contains('dropdown-toggle')) {
            event.target.classList.toggle('toggle-change');
        }
        else if (event.target.parentElement.classList.contains('dropdown-toggle')) {
            event.target.parentElement.classList.toggle('toggle-change');
        }
    })
});

let currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
    document.getElementById("profile-menu").style.display = "none";
    document.getElementById("profile-gest").style.display = "block"; // הצגת תפריט האורחים
} else {
    document.getElementById("profile-menu").style.display = "block"; // הצגת תפריט המשתמש המחובר
    document.getElementById("profile-gest").style.display = "none"; // הסתרת תפריט האורחים
    document.getElementById("profilePic").src = currentUser.profilePic;
    if (currentUser.sellerId) //check id the current user is a seller
    {
        document.getElementById("addProduct").innerHTML = `
             <a id="addProductLink" class="nav-link" href="./AddProduct.html">Add Product</a>
        `
        let cartSize = checkCart("seller", currentUser.sellerId);
        $("#cartSize").text(cartSize);
        document.getElementById("myProduct").innerHTML = `
                     <a id="myProductLink" class="nav-link" href="./MyProduct.html">My Product</a>
        `
    }
    else {
        //user config
        let cartSize = checkCart("users", currentUser.userId);
        $("#cartSize").text(cartSize);
    }
}

function checkCart(config, id) {
    let orders = JSON.parse(localStorage.getItem(config + "Orders"));
    console.log(orders)
    let cartSize = 0;
    for (let i in orders) {
        if (orders[i].buyerId == id && orders[i].orderStatus == "pending") {
            cartSize++;
        }
    }
    return cartSize;
}


function logOut(event) {
    event.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = "./login.html";
}