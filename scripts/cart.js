let currentLoggedIn = JSON.parse(localStorage.getItem("currentUser"));
const products = JSON.parse(localStorage.getItem("products"));
let cartArr = [];
let configOption = "";


if (currentLoggedIn.sellerId) {
    //seller Config
    configOption = "seller";
    let sellerorders = JSON.parse(localStorage.getItem("sellerOrders"));
    for (let i in sellerorders) {
        let order = sellerorders[i];
        if (order.buyerId == currentLoggedIn.sellerId && order.orderStatus === "pending") {  // שיניתי פה!
            cartArr.push(order);
        }
    }
} else {
    //user Config
    configOption = "users"
    let usersorders = JSON.parse(localStorage.getItem("usersOrders"));
    for (let i in usersorders) {
        let order = usersorders[i];
        if (order.buyerId == currentLoggedIn.userId) {
            cartArr.push(order);
        }
    }
}

console.log(cartArr)
if (cartArr.length > 0) {
    let totalPrice = 0;
    for (let x in cartArr) {
        for (let i in products) {
            let product = products[i];
            if (product.product_id == cartArr[x].productId && cartArr[x].orderStatus === "pending") {
                let subPrice = product.product_price.split("$") //arr 
                totalPrice += +subPrice[0]
                $("#cart-content").append(`
                    <div class="card rounded-3 mb-4">
                        <div class="card-body p-4">
                            <div class="row d-flex justify-content-between align-items-center">
                                <div class="col-md-4 col-lg-4 col-xl-4">
                                    <img
                                        src="${product.product_image}"
                                        class="img-fluid rounded-3" alt="Cotton T-shirt">
                                </div>
                                <div class="col-md-2 col-lg-2 col-xl-2">
                                    <p class="lead fw-normal mb-2">${product.product_name}</p>
                                </div>
                                <div class="col-md-2 col-lg-2 col-xl-2 offset-lg-1">
                                <h5 class="mb-0">${product.product_price}</h5>
                                </div>
                                <div class="col-md-2 col-lg-2 col-xl-2 offset-lg-1">
                                <button onclick="deleteCartProd(${cartArr[x].orderId})" class="trashBtn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                    </svg>
                                </button>
                                </div>
                                <div class="col-md-12 col-lg-12 col-xl-12">
                                    <p class="lead fw-normal mb-2">${product.product_desciption}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `)
            }
        }
    }


    totalPrice = totalPrice.toFixed(2);
    if (totalPrice == 0) {
        $("#cart-content").append(`
                <div id="payBtnDiv">
                    <p>Total Amount: ${totalPrice}$</p>
                    <button disabled type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-warning btn-block btn-lg">Proceed to Pay</button>
                </div>
            `)
    } else {
        $("#cart-content").append(`
            <div id="payBtnDiv">
                <p>Total Amount: ${totalPrice}$</p>
                <button onclick="proceedToPay()"  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-warning btn-block btn-lg">Proceed to Pay</button>
            </div>
        `)
    }
    localStorage.setItem("buyerCart", JSON.stringify({
        config: configOption,
        cart: cartArr,
        totalPrice
    }))
};

function deleteCartProd(orderId) {
    let orders = JSON.parse(localStorage.getItem(configOption + "Orders"));
    for (let i in orders) {
        if (orders[i].orderId == orderId) {
            orders.splice(i, 1);
            localStorage.setItem(configOption + "Orders", JSON.stringify(orders));
            window.location.reload();
            return;
        }
    }
    alert("Proudct " + orderId + " can not be deleted! please try again later!")
}

function proceedToPay() {
    window.location.href = "./payment.html";
}