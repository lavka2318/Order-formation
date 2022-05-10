const priceWrapper = document.querySelector(".price-wrapper");

categories.forEach((category, num) => {
    priceWrapper.innerHTML += `<div class="item-category">
                                    <label class="name-category">${category}: </label>
                                    <input class="input-price" id=${num} value=${localStorage.getItem(category)== null ? 0 : localStorage.getItem(category)} >
                                </div>`;
});

function addPrice(){
    categories.forEach((category, num) => {
        const inputPrice = document.getElementById(num);
        localStorage.setItem(category, inputPrice.value);
    });
}

