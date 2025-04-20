
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('productId');
let loggedInConfig = JSON.parse(localStorage.getItem('currentUser'));

let current_product;
//----------------------------------------------------------------
class Order {
    constructor(orderId, productId, buyerId, orderStatus) {
        this.orderId = orderId;
        this.productId = productId;
        this.buyerId = buyerId;
        this.orderStatus = orderStatus;
    }
}
//----------------------------------------------------------------

if (productId) {
    let products = JSON.parse(localStorage.getItem('products'));
    for (let i in products) {
        let product = products[i];
        if (product.product_id == productId) {
            current_product = product;
            document.getElementById("productImage").src = product.product_image;
            $("#productName").text("Name: " + product.product_name)
            $("#productCategory").text("Category: " + product.product_category)
            $("#productPrice").text("Price: " + product.product_price)
            $("#productQuantity").text("Quantity: " + product.available_quantity)
            $("#productComment").text("Comment: " + product.comment)
            break;
        }
    }
    if (!current_product) {
        document.getElementById("productHeader").style.display = "block";
        document.getElementById("productHeader-header").innerText = "No Products Available!";
    } else {
        if (current_product.available_quantity <= 0) {
            $("#buyBtn").attr("disabled", "disabled");
            $("#buyBtn").text("Sold Out!");
        }
    }
} else {
    document.getElementById("productHeader").style.display = "block";
    document.getElementById("productHeader").innerText = "No Product found! 404";
}


$("#buyBtn").click(() => {
    if (loggedInConfig) {
        if (current_product) {
            let newOrder = new Order(
                1,
                current_product.product_id,
                "put user /  seller id",
                "pending"
            )
            if (loggedInConfig.sellerId) {
                //seller config
                newOrder.buyerId = loggedInConfig.sellerId
                let sellerOrders = JSON.parse(localStorage.getItem("sellerOrders"));
                if (sellerOrders != null && sellerOrders.length > 0) {  // בעיה!!
                    newOrder.orderId = sellerOrders[sellerOrders.length - 1].orderId + 1;
                    sellerOrders.push(newOrder);
                    localStorage.setItem("sellerOrders", JSON.stringify(sellerOrders));
                } else {
                    if (sellerOrders == []) {
                        localStorage.removeItem("sellerOrders");
                    }
                    localStorage.setItem("sellerOrders", JSON.stringify([newOrder]));
                }
            } else {
                //user config
                newOrder.buyerId = loggedInConfig.userId
                let usersOrders = JSON.parse(localStorage.getItem("usersOrders"));
                if (usersOrders) {
                    newOrder.orderId = usersOrders[usersOrders.length - 1].orderId + 1;
                    usersOrders.push(newOrder);
                    localStorage.setItem("usersOrders", JSON.stringify(usersOrders));
                } else {
                    localStorage.setItem("usersOrders", JSON.stringify([newOrder]));
                }
            }
            //removeQuantity();
            alert("New Order Created!");
            window.location.reload();
        } else {
            alert("sorry something went wrong... try again later...")
        }
    } else {
        alert("You need to be registered user to countinue this process...");
        window.location.href = "./login.html";
    }
})

function removeQuantity() {
    let products = JSON.parse(localStorage.getItem('products'));
    for (let i in products) {
        let product = products[i];
        if (product.product_id == productId) {
            product.available_quantity -= 1;
        }
    }
    localStorage.setItem("products", JSON.stringify(products));
}