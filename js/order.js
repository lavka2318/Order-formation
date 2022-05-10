const form = document.querySelector(".add-form");
const selectCategory = document.querySelector(".select-category");
let dataOrder = [];

localStorage.setItem("number", 0);

categories.forEach(category => {
    selectCategory.innerHTML += ` <option name="${category}">${category}</option>`;
});

form.innerHTML += `<label class="price">Цена за кг: ${localStorage.getItem(categories[0])}</label>
                    <div>
                        <label>Вес: </label>
                        <input class="input-weight" placeholder="Введите вес...">
                    </div>
                   <button class="add-button" onclick="addRecord()">Добавить</button>`;


function changePrice(){
    const price = document.querySelector(".price");
    const selectCategory = document.querySelector(".select-category");
    price.innerHTML = `Цена за кг: ${localStorage.getItem(selectCategory.value)}`;
}


function addRecord(){
    const category = document.querySelector(".select-category");
    const weight = document.querySelector(".input-weight");
    const tbody = document.querySelector(".tbody");

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
                                ${weight.value + metricWeight}
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
    let totalPrice = 0;
    dataOrder.forEach(obj =>{
        totalPrice += +obj.totalPrice;
    });
    localStorage.setItem("totalPrice", totalPrice);
    localStorage.setItem("tbody",tbody.innerHTML);
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
