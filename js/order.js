const form = document.querySelector(".add-form");
const selectCategory = document.querySelector(".select-category");

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
    const totalPrice = (weight.value * categoryPrice).toFixed(2);
    let metric;
    if(category.value == 'Яйцо'){
        metric = ' руб/10шт';
    }else if(category.value == 'Доставка'){
        metric ='';
    }else {
        metric = ' руб/кг';
    }

    const rec = {
        number: num,
        category: category.value,
        categoryPrice: categoryPrice + metric,
        weight: weight.value,
        totalPrice:totalPrice,
        flagDel: false
    };

    dataOrder.push(rec);

    tbody.innerHTML += `<tr class="record">
                            <td class="td-number">
                                ${num}
                            </td>
                            <td >
                                ${category.value}
                            </td>
                            <td>
                                ${categoryPrice + metric}
                            </td>
                            <td class="td-text">
                                ${weight.value}
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
    localStorage.setItem("tbody",tbody.innerHTML);
}

function printDataTable(){
    const tbody = document.querySelector(".tbody");

    dataOrder.forEach(rec =>{
        tbody.innerHTML += `<tr class="record">
                            <td class="td-number">
                                ${rec.number}
                            </td>
                            <td >
                                ${rec.category}
                            </td>
                            <td>
                                ${rec.categoryPrice} 
                            </td>
                            <td >
                                ${rec.weight}
                            </td>
                            <td >
                                ${rec.totalPrice}
                            </td>
                            <td >
                                <button class="delete-btn">Удалить</button>
                            </td>
                        </tr>`;
    });
    btnClickEvent();
}


function btnClickEvent(){
    const btns = document.querySelectorAll(".delete-btn");
    btns.forEach(btn=>{
        btn.addEventListener("click", event =>{
            const table  = document.querySelector(".table-order");
            table.deleteRow(event.target.value);
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
