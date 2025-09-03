console.log("This Product List loaded");

document.addEventListener("DOMContentLoaded", () => {
    async function fetchProduct(){
        const response = await axios.get("https://fakestoreapi.com/products");
        console.log(response.data);
        return response.data;
    }
    async function populateProduct(){
        const products = await fetchProduct();
        const productList = document.getElementById("product-list-box");
        products.forEach(element => {
            const productLink = document.createElement("a");
            productLink.href = "productDetails.html";
            productLink.classList.add("product-item", "text-decoration-none", "d-inline-block", "text-center");
            productLink.target = "_blank";

            // image
            const productImg = document.createElement("div");
            productImg.classList.add("product-image");
            const imgLink = document.createElement("img");
            imgLink.src = element.image;
            imgLink.alt = element.title;
            productImg.appendChild(imgLink);

            // Name
            const productName = document.createElement("div");
            productName.classList.add("product-name");
            productName.textContent = element.title.substring(0,12) + "...";

            // Price
            const productPrice = document.createElement("div");     
            productPrice.classList.add("product-price");
            productPrice.textContent = `₹ ${element.price}`;
            
            // append div
            productLink.appendChild(productImg);
            productLink.appendChild(productName);
            productLink.appendChild(productPrice);

            productList.appendChild(productLink);
        });
    }
    populateProduct();
});


