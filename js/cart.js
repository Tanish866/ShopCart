document.addEventListener("DOMContentLoaded", () => {
    function prepareWrapperDivforCartItems(product, productQuantityMapping){
        const orderDetailsProduct = document.createElement("div");
        orderDetailsProduct.classList.add("order-details-product", "d-flex", "flex-row");
        const orderDetailsProductImage = document.createElement("div");
        orderDetailsProductImage.classList.add("order-details-product-img", "d-flex");
        const image = document.createElement("img");
        image.src = product.image;
        orderDetailsProductImage.appendChild(image);

        const orderDetailsProductData = document.createElement("div");
        orderDetailsProductData.classList.add("order-details-product-data", "d-flex", "flex-column", "justify-content-center");
        const name = document.createElement("div");
        const price = document.createElement("div");
        price.textContent = product.price;
        name.textContent = product.title;

        orderDetailsProductData.appendChild(name);
        orderDetailsProductData.appendChild(price);

        const orderDetailsProductAction = document.createElement("div");
        orderDetailsProductAction.classList.add("order-details-product-action", "d-flex", "flex-column");
        const orderDetailsProductQuantity = document.createElement("div");
        orderDetailsProductQuantity.classList.add("order-details-product-quantity");
        const quantityLabel = document.createElement("div");
        quantityLabel.classList.add("fw-bold");
        quantityLabel.textContent = "Quantity";

        const formGroup = document.createElement("div");
        formGroup.classList.add("form-group");
        const select = document.createElement("select");
        select.classList.add("form-select");
        for(let i=1;i<=10;i++){
            const option = document.createElement("option");
            option.textContent = i;
            option.value = i;
            if(i==productQuantityMapping[product.id]){
                option.selected = "true";
            }
            select.appendChild(option);
        }
        formGroup.appendChild(select);
        orderDetailsProductQuantity.appendChild(quantityLabel);
        orderDetailsProductQuantity.appendChild(formGroup);
        orderDetailsProductAction.appendChild(orderDetailsProductQuantity);
        const removeButton = document.createElement("button");
        removeButton.classList.add("order-details-product-remove", "btn", "btn-danger");
        removeButton.textContent = "Remove";
        orderDetailsProductAction.appendChild(removeButton);

        const hr = document.createElement("hr");

        orderDetailsProduct.appendChild(orderDetailsProductImage);
        orderDetailsProduct.appendChild(orderDetailsProductData);
        orderDetailsProduct.appendChild(orderDetailsProductAction);

        document.getElementById("orderDetails").appendChild(orderDetailsProduct);
        document.getElementById("orderDetails").appendChild(hr);

    }

    async function populateCart(){
        const cart = await fetchProductByCart(2);
        const cartProducts = cart.products;
        console.log(cartProducts);
        const productQuantityMapping = {};
        const cartProductDownloadPromise = cartProducts.map(product => {
            productQuantityMapping[product.productId] = product.quantity;
            return fetchProductById(product.productId);
        });
        const products = await Promise.all(cartProductDownloadPromise);
        let total = 0;
        products.forEach(product => {
            prepareWrapperDivforCartItems(product, productQuantityMapping);
            total+=product.price * productQuantityMapping[product.id];
        });
        document.getElementById("total-price").textContent = total;
        document.getElementById("net-price").textContent = total - 10;
        removeLoader();
    }
    populateCart();
});
