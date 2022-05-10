const form = document.querySelector(".add-form");
const selectCategory = document.querySelector(".select-category");
let dataOrder = [];

localStorage.setItem("number", 1);

categories.forEach(category => {
    selectCategory.innerHTML += ` <option name="${category}">${category}</option>`;
});

form.innerHTML += `<label class="price">Цена за кг: ${localStorage.getItem(categories[0])} руб.</label>
                    <div>
                        <label style="font-size: 14px;">Вес: </label>
                        <input class="input-weight" placeholder="Введите вес...">
                    </div>
                   <button class="add-button" onclick="addRecord()">Добавить</button>`;

const tbody = document.querySelector(".tbody");
tbody.innerHTML += `<tr class="record">
                            <td class="td-number td-text">
                                ${1}
                            </td>
                            <td >
                                Доставка
                            </td>
                            <td class="td-text">
                                ${localStorage.getItem('Доставка')} руб.
                            </td>
                            <td class="td-text">
                                ${(1).toFixed(2)}
                            </td>
                            <td class="td-text">
                                ${(+localStorage.getItem('Доставка')).toFixed(2)}
                            </td>
                            <td >
                                <button value="1" class="delete-btn" >Удалить</button>
                            </td>
                        </tr>`;
dataOrder.push({
    number: 1,
    totalPrice:(+localStorage.getItem('Доставка')).toFixed(2)
});
btnClickEvent();

function changePrice(){
    const price = document.querySelector(".price");
    const selectCategory = document.querySelector(".select-category");
    const category = selectCategory.value;

    if(category == "Доставка"){
        price.innerHTML = `Цена за доставку: ${localStorage.getItem(selectCategory.value)} руб.`;
    }else if(category == "Яйцо"){
        price.innerHTML = `Цена за 10шт: ${localStorage.getItem(selectCategory.value)} руб.`;
    }else {
        price.innerHTML = `Цена за кг: ${localStorage.getItem(selectCategory.value)} руб.`;
    }
}


function addRecord(){
    const category = document.querySelector(".select-category");
    const weight = document.querySelector(".input-weight");
    const tbody = document.querySelector(".tbody");

    if(isNaN(weight.value) || weight.value == "") {
        weight.style.borderColor = "red";
        return;
    }else{
        weight.style.borderColor = "";
    }

    const num = +localStorage.getItem("number") + 1;
    localStorage.setItem("number", num);
    const categoryPrice = localStorage.getItem(category.value);
    const totalPrice = (+weight.value * categoryPrice).toFixed(2);
    let metricPrice;
    let metricWeight;

    if(category.value == 'Яйцо'){
        metricPrice = ' руб/10шт';
        metricWeight = '';
    }else if(category.value == 'Доставка'){
        metricPrice =' руб';
        metricWeight = ''
    }else {
        metricPrice = ' руб/кг';
        metricWeight = ' кг'
    }

    const rec = {
        number: num,
        totalPrice:totalPrice
    };

    dataOrder.push(rec);

    tbody.innerHTML += `<tr class="record">
                            <td class="td-number td-text">
                                ${num}
                            </td>
                            <td >
                                ${category.value}
                            </td>
                            <td class="td-text">
                                ${categoryPrice + metricPrice}
                            </td>
                            <td class="td-text">
                                ${(+weight.value).toFixed(2) + metricWeight}
                            </td>
                            <td class="td-text">
                                ${totalPrice}
                            </td>
                            <td >
                                <button value=${num} class="delete-btn" >Удалить</button>
                            </td>
                        </tr>`;
    weight.value = '';

    btnClickEvent();
}

function generateTbody(){
    const tbody = document.querySelector(".tbody");
    const discount = document.querySelector('input[name="discount"]:checked').value;
    let totalPrice = 0;
    dataOrder.forEach(obj =>{
        totalPrice += +obj.totalPrice;
    });
    localStorage.setItem("totalPrice", totalPrice);
    localStorage.setItem("tbody",tbody.innerHTML);
    localStorage.setItem("discount", discount);
}


function btnClickEvent(){
    const btns = document.querySelectorAll(".delete-btn");
    btns.forEach(btn=>{
        btn.addEventListener("click", event =>{
            const table  = document.querySelector(".table-order");
            table.deleteRow(event.target.value);
            dataOrder.splice(event.target.value-1,1);
            changeNumber();
        });
    });
}


function changeNumber(){
    const tds = document.querySelectorAll(".td-number");
    const btns = document.querySelectorAll(".delete-btn");
    let num = 0;
    for(let i=0; i<tds.length; i++){
        num++;
        tds[i].innerHTML = num;
        btns[i].value = num;
    }
    localStorage.setItem("number", num);
}
