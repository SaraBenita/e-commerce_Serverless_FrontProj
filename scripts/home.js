
document.getElementById("homePage").className = "nav-link active";
const productsPath = "https://dummyjson.com/products";

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

function fetchData(path) {
    return new Promise((res, rej) => {
        $.ajax({
            url: path,
            type: 'GET',
            success: (data) => {
                localStorage.setItem("productsFromDummyjson", JSON.stringify(data));
                res(data);
            },
            error: (err) => {
                rej(err);
            }
        })
    })
};

// הוספה של פריטים מתוך https://dummyjson.com/products

if (!localStorage.getItem("productsFromDummyjson")) {
    fetchData(productsPath).then((data) => {
        const first30 = data.products.slice(0, 30)
        displayProducts(first30);
    }, (error) => console.log(error));
}

let productsFromWeb = [];

function displayProducts(data) {
    let products = JSON.parse(localStorage.getItem("products"));
    if (!products) {
        for (let i in data) {
            let product = data[i];
            let newProduct = new Product(
                product.id,
                product.title,
                product.price + "$",
                product.description,
                product.category,
                product.stock,
                product.reviews[0].comment,
                product.thumbnail,
                null
            );
            productsFromWeb.push(newProduct);
        }
        localStorage.setItem("products", JSON.stringify(productsFromWeb))
        window.location.reload();
    } else {
        return;
    }
}

$(document).ready(() => {

    let products = JSON.parse(localStorage.getItem("products"));
    if (!products) {
        $("#allProducts").text = "No Products available";
    } else {
        $("#productsTitle").text(`All Products:`)
        for (let i in products) {
            let product = products[i];
            $("#allProducts").append(
                `
                <div class="card" style="width: 18rem;">
                <img src="${product.product_image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${product.product_name}</h5>
                    <p class="card-text">${product.product_desciption}</p>
                    <a href="./Product.html?productId=${product.product_id}" class="btn btn-primary">More Details...</a>
                </div>
                </div>
                `
            );
            if (i == 0) {
                $("#carouselTopControls").append(`
                    <div class="carousel-item active">
                        <img src="${product.product_image}" class="d-block w-100" alt="Product ${+i + 1}">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Product ${+i + 1}</h5>
                            <p>${product.product_desciption}</p>
                        </div>
                    </div>
            `);
            } else {
                $("#carouselTopControls").append(`
                    <div class="carousel-item">
                        <img src="${product.product_image}" class="d-block w-100" alt="Product ${+i + 1}">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Product ${+i + 1}</h5>
                            <p>${product.product_desciption}</p>
                        </div>
                    </div>
                `);
            }
        }
        for (let i = 0; i < products.length; i++) {
            for (let j = 0; j < i + 1; j++) {
                if (products[i].Sales > products[j].Sales) {
                    let temp = products[i];
                    products[i] = products[j];
                    products[j] = temp;
                }
            }
        }

        for (let i = 0; i < 3; i++) {
            let product = products[i];
            if (i == 0) {
                $("#carouselBottomControls").append(`
                    <div class="carousel-item active">
                        <img src="${product.product_image}" class="d-block w-100" alt="Product ${+i + 1}">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Product ${+i + 1}</h5>
                            <p>${product.product_desciption}</p>
                        </div>
                    </div>
            `);
            } else {
                $("#carouselBottomControls").append(`
                    <div class="carousel-item">
                        <img src="${product.product_image}" class="d-block w-100" alt="Product ${+i + 1}">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Product ${+i + 1}</h5>
                            <p>${product.product_desciption}</p>
                        </div>
                    </div>
                `);
            }
        }
    }
})