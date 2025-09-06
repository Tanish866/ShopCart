console.log("Index class loaded");
async function fetchCategories(){
    const response = await fetch("https://fakestoreapi.com/products/categories");
    const data = await response.json();
    return data;
}

async function populateCategories(){
    const categories = await fetchCategories();
    const categoryList = document.getElementById("category-list");
    const loaderBackdrop = document.getElementById("loader-backdrop");
    if(loaderBackdrop){
        loaderBackdrop.style.display = 'none';
    }
    categories.forEach(category => {
        const categoryHolder = document.createElement("div");
        const categoryLink = document.createElement("a");
        categoryLink.textContent = category;
        categoryLink.href = `productList.html?category=${category}`;
        categoryHolder.classList.add("category-items", "d-flex", "justify-content-center", "align-items-center");
        categoryHolder.appendChild(categoryLink);
        categoryList.appendChild(categoryHolder);
    });
}
populateCategories();
