const tbody = document.querySelector(".tbody");

tbody.innerHTML = localStorage.getItem("tbody");


let rows = tbody.getElementsByTagName('tr'),
rowsB = rows.length;
for (let i=0; i<rowsB; i++){
    let row = rows[i];
    row.deleteCell(-1);
}

const totalPriceField = document.querySelector(".total-price");
const totalPrice = +localStorage.getItem("totalPrice");
totalPriceField.innerHTML = `Общая сумма заказа: ${totalPrice.toFixed(2)} руб.`;

