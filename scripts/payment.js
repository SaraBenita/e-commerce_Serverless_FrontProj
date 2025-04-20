const sleepMode = (time) => new Promise(res => setTimeout(res, time * 1000));

//main code global code
let products = JSON.parse(localStorage.getItem("products"));
let buyerCart = JSON.parse(localStorage.getItem("buyerCart"));
if (!buyerCart) {
    alert("Something went wrong, the data you see is a default data. Please try again later");
} else {
    $("#cartPrice").text("$" + buyerCart.totalPrice)
    let originalPrice = parseFloat(buyerCart.totalPrice) + 20;
    price = originalPrice.toFixed(2);
    $("#totalPrice").text("$" + price);
    //$("#totalPrice").text("$" + (buyerCart.totalPrice + 20))
}



const checkCuponCode = (cupon) => {
    if (!cupon) {
        return 0;
    } else {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `../data/cupons.json`,
                method: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                success: (data) => {
                    for (let i in data) {
                        if (data[i].cuponCode === cupon) {
                            resolve(data[i].discount)
                            return
                        }
                    }
                    alert("cupon code not found!")
                    resolve(0)
                },
                error: (err) => {
                    reject(err)
                }
            })
        })
    }
}

async function payNow_handler() {
    let orders = JSON.parse(localStorage.getItem(buyerCart.config + "Orders"))
    document.getElementById("spinner-container").style.display = "block";
    await sleepMode(3.5);
    for (let i in buyerCart.cart) {
        let order = buyerCart.cart[i]
        for (let x in products) {
            if (products[x].product_id == order.productId && order.orderStatus === "pending") {
                products[x].available_quantity -= 1;
                products[x].Sales += 1;  // יש פה בעיה!!
                break;
            }
        }
        for (let x in orders) {
            if (order.orderId == orders[x].orderId) {
                orders[x].orderStatus = "payed";
            }
        }
        order.orderStatus = "payed";
    }
    buyerCart.cart = buyerCart.cart.filter(item => item.orderStatus !== "payed");  // מחיקה של כל מי שכבר שילמנו עליו מהעגלה שלנו
    localStorage.setItem("buyerCart", JSON.stringify(buyerCart));

    //buyerCart.cart = buyerCart.cart.filter(item => item.orderStatus !== "payed");  // מחיקה של כל מי שכבר שילמנו עליו מהעגלה שלנו
    //localStorage.setItem("buyerCart", JSON.stringify([]));

    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem(buyerCart.config + "Orders", JSON.stringify(orders));
    //localStorage.removeItem("buyerCart");
    alert("Payment completed successfully!!")
    document.getElementById("spinner-container").style.display = "none";
    window.location.href = "./ThankYou.html";
    return;
}



document.getElementById("cuponCode").addEventListener(
    "change",
    async () => {
        document.getElementById("couponSpinner").style.display = "block";
        await sleepMode(2)
        let response = await checkCuponCode($("#cuponCode").val());
        console.log(response)
        let price;

        if (response > 0) {
            let subString = $("#totalPrice").text().split("$")[1].trim();
            let numericPrice = parseFloat(subString);
            let discountedPrice = numericPrice - response;

            if (discountedPrice < 0) {
                discountedPrice = 0;
            }
            price = discountedPrice.toFixed(2);

            //$("#totalPrice").text("$" + (+subString - response))
        } else {
            let originalPrice = parseFloat(buyerCart.totalPrice) + 20;
            price = originalPrice.toFixed(2);

            //$("#totalPrice").text("$" + (buyerCart.totalPrice + 20))
        }
        $("#totalPrice").text("$" + price);
        document.getElementById("couponSpinner").style.display = "none";
    }
)

