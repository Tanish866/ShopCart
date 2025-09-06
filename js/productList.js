console.log("This Product List loaded");

document.addEventListener("DOMContentLoaded", async () => {
    async function fetchProduct(){
        const response = await axios.get("https://fakestoreapi.com/products");
        console.log(response.data);
        return response.data;
    }

    async function fetchProductsByCategory(category){
        const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
        console.log(response.data);
        return response.data;
    }

    async function fetchCategories(){
        const response = await fetch("https://fakestoreapi.com/products/categories");
        const data = await response.json();
        return data;
    }

    const downloadProducts = await fetchProduct();

    async function populateProduct(flag, customProducts){
        let products;
        const queryParams = getQueryParams();
        if(flag == false){
            if(queryParams[`category`]){
                products = await fetchProductsByCategory(queryParams[`category`]);
            }
            else{
                products = await fetchProduct();
            }
        }
        else{
            products = customProducts;
        }
        const productList = document.getElementById("product-list-box");
        products.forEach(element => {
            const productLink = document.createElement("a");
            productLink.href = `productDetails.html?id=${element.id}`;
            productLink.classList.add("product-item", "text-decoration-none", "d-inline-block", "text-center");
            productLink.target = "blank";

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
    async function populateCategories(){
        const categories = await fetchCategories();
        const categoryList = document.getElementById("categorylist");
        categories.forEach(category => {
            const categoryLink = document.createElement("a");
            categoryLink.classList.add("d-flex", "text-decoration-none");
            categoryLink.textContent = category;
            categoryLink.href = `productList.html?category=${category}`;
            categoryList.appendChild(categoryLink);
        });
    }

    async function downloadandPopulateProduct(){
        Promise.all([populateProduct(false), populateCategories()])
        .then(() => {
            removeLoader();
        });
    }
    downloadandPopulateProduct();
    const filterSearch = document.getElementById("search");
    filterSearch.addEventListener("click", async () => {
        const productList = document.getElementById("product-list-box");
        const minPrice = Number(document.getElementById("minPrice").value);
        const maxPrice = Number(document.getElementById("maxPrice").value);
        const products = downloadProducts;
        filterProducts = products.filter(
            product => product.price >= minPrice && product.price <= maxPrice
        );
        productList.innerHTML = "";
        populateProduct(true,filterProducts);
    });

    const resetFilter = document.getElementById("clear");
    resetFilter.addEventListener("click", () => {
        window.location.reload();
    });
});

