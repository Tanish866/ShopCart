function getQueryParams(){
    const queryParams = new URLSearchParams(window.location.search);
    const queryParamObject = Object.fromEntries(queryParams.entries());
    return queryParamObject;
}
function removeLoader(){
    const loaderBackdrop = document.getElementById("loader-backdrop");
    if(loaderBackdrop){
        loaderBackdrop.style.display = 'none';
    }
}

async function fetchProductById(id){
    const product = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return product.data;
}

async function fetchProductByCart(id){
    const cart = await axios.get(`https://fakestoreapi.com/carts/${id}`);
    return cart.data;
}