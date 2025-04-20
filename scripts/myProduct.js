
document.getElementById("myProductLink").classList.add("active");

let modal = document.getElementById("modal");
let allProducts = JSON.parse(localStorage.getItem("products"));
let myProducts = [];
let currentProductId;

const sleepMode = () => new Promise((res) => setTimeout(res, 2000));

for (let i in allProducts) {
    let product = allProducts[i];
    if (product.seller_id == currentUser.sellerId) {
        myProducts.push(product);
    }
}

if (myProducts.length > 0) {
    for (let i in myProducts) {
        let product = myProducts[i];
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
                                <div class="col-md-1 col-lg-1 col-xl-1">
                                    <p class="lead fw-normal mb-2">Quantity: ${product.available_quantity}</p>
                                </div>
                                <div class="col-md-2 col-lg-2 col-xl-2 offset-lg-1">
                                <h5 class="mb-0">${product.product_price}</h5>
                                </div>
                                <div class="col-md-2 col-lg-2 col-xl-2 offset-lg-1">
                                <button onclick="editProduct(${product.product_id})" class="trashBtn">
                                    <img src="../images/edit1.png" alt="error" height="30" width="30">
                                </button>
                                </div>
                                <div class="col-md-12 col-lg-12 col-xl-12">
                                    <p class="lead fw-normal mb-2">${product.product_desciption}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    `)
        $("#sales-content").append(`
            <div id="sales">
               <p><strong>Product Name:</strong> ${product.product_name}</p>
               <p><strong>Sales:</strong> ${product.Sales}</p>
            </div>
            `)
    }
}

function editProduct(productId) {
    modal.showModal();
    currentProductId = productId;
    for (let i in myProducts) {
        if (myProducts[i].product_id == productId) {
            $("#prod-name-header").text(myProducts[i].product_name)
            $("#prodName").val(myProducts[i].product_name)
            $("#prodPrice").val(myProducts[i].product_price)
            $("#prodQuantity").val(myProducts[i].available_quantity)
            $("#prodDescription").val(myProducts[i].product_desciption)
            $("#prodComment").val(myProducts[i].comment)
        }
    }
}

function closeModal() {
    modal.close();
}

async function saveProductDetails() {
    $("#spinner").css("display", "block");
    await sleepMode();
    for (let i in allProducts) {
        if (allProducts[i].product_id == currentProductId) {
            allProducts[i].product_name = $("#prodName").val();
            allProducts[i].product_price = $("#prodPrice").val();
            allProducts[i].available_quantity = $("#prodQuantity").val();
            allProducts[i].product_desciption = $("#prodDescription").val();
            allProducts[i].comment = $("#prodComment").val();
            localStorage.setItem("products", JSON.stringify(allProducts));
            $("#spinner").css("display", "none");
            modal.close();
            window.location.reload();
            return;
        }
    }
    $("#spinner").css("display", "none");
    alert("could not update product!");
}

async function deleteProduct() {
    $("#spinner").css("display", "block");
    await sleepMode();
    for (let i in allProducts) {
        if (allProducts[i].product_id == currentProductId) {
            allProducts.splice(i, 1);
            localStorage.setItem("products", JSON.stringify(allProducts));
            $("#spinner").css("display", "none");
            modal.close();
            window.location.reload();
            return;
        }
    }
    $("#spinner").css("display", "none");
    alert("could not delete product!");
}


