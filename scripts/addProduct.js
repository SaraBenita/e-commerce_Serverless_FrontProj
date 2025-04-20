
document.getElementById("addProductLink").classList.add("active");

class Product {
    Sales = 0;
    constructor(product_id, product_name, product_price, product_desciption, product_category, available_quantity, comment, product_image, seller_id) {
        this.product_id = product_id;
        this.product_name = product_name;
        this.product_price = product_price;
        this.product_desciption = product_desciption;
        this.product_category = product_category;
        this.available_quantity = available_quantity;
        this.comment = comment;
        this.product_image = product_image;
        this.seller_id = seller_id;
    }
}

$("#createProductBtn").click(async () => {
    let pname = $("#productName").val();
    let price = $("#productPrice").val();
    let description = $("#productDescription").val();
    let category = $("#productCategory").val();
    let quantity = $("#productQuantity").val();
    let comment = $("#productComment").val();
    let pImage = await converPic();

    let saller = JSON.parse(localStorage.getItem("currentUser"));
    if (pname == "" || price == "" || description == "" || category == "" || quantity == "" || comment == "" || pImage == "") {
        alert("please complete all required fields");
    } else {
        let products = JSON.parse(localStorage.getItem("products"));
        let newProduct = new Product(
            1,
            pname,
            price,
            description,
            category,
            quantity,
            comment,
            pImage,
            saller.sellerId
        )
        if (products) {
            newProduct.product_id = products[products.length - 1].product_id + 1;
            products.push(newProduct);
            localStorage.setItem("products", JSON.stringify(products));
        } else {
            localStorage.setItem("products", JSON.stringify([newProduct]));
        }
        alert("New Product Created successfully!");
    }
})

function converPic() {
    const file = document.getElementById("picProductOption").files[0];
    if (!file) {
        return undefined;
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

