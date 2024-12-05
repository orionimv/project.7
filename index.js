let title = document.getElementById("title");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let button = document.getElementById("submit");

let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");

let mode = 'Create';
let globalI;

function calculateTotal() {
    if (price.value != '' || taxes.value != '' || ads.value != '' || discount.value != '') {
        let subTotal = +price.value + +taxes.value + +ads.value;
        let discountValue = subTotal * (+discount.value / 100); // Считаем процент скидки
        let result = subTotal - discountValue;
        total.innerHTML = result.toFixed(2); // Округляем результат до двух знаков после запятой
        total.style.background = '#040';
    } else {
        total.innerHTML = 0;
        total.style.background = '#a00d02';
    }
}


let data;
if(localStorage.crud != null){
    data = JSON.parse(localStorage.crud);
} else {
    data = [];
}

button.addEventListener('click', () =>{
    let object = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    };

    if (mode === 'create'){

        if (object.count > 0){
            for (let i = 0; i < object.count; i++){
                data.push(object)
            }
        } else  {
            data.push(object)
        }
    } else {
        data[globalI] = object;
        button.innerHTML = 'Create';
        mode = 'create';
        count.style.display = 'block'
    }

    localStorage.setItem('crud', JSON.stringify(data));
    clearData()
    showData()
})

function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

function showData(){
    calculateTotal()
    let table = '';
    for (let i = 0; i < data.length; i++){
        table += ` 
        <tr> 
          <td>${i}</td>
          <td>${data[i].title}</td>
          <td>${data[i].price}</td>
          <td>${data[i].taxes}</td>
          <td>${data[i].ads}</td>
          <td>${data[i].discount}</td>
          <td>${data[i].total}</td>
          <td>${data[i].category}</td>
          <td><button onclick="updateData(${i})" id="update">Update</button></td>
          <td><button onclick="deleteData(${i})" id="del">Delete</button></td>
        </tr>
          `
    }
    document.getElementById('tablebody').innerHTML = table
    let buttonDel = document.getElementById('deleteAll')
    if (data.length > 0){
        buttonDel.innerHTML = `<button onclick="deleteAll()" id="delete">Delete All(${data.length})</button>`
    } else {
        buttonDel.innerHTML = '';
    }
}
showData()

function deleteData(i) {
    data.splice(i,1);
    localStorage.crud = JSON.stringify(data)
    showData()
}

function deleteAll (){
    localStorage.clear();
    data.splice(0);
    showData()
}

function updateData(i){

    title.value = data[i].title
    price.value = data[i].price
    taxes.value = data[i].taxes
    ads.value = data[i].ads
    discount.value = data[i].discount
    count.style.display = 'none'
    category.value = data[i].category
    calculateTotal()
    showData();
    mode = 'update'
    button.innerHTML = 'Update'
    globalI = i
    scroll({
        top:0,
        behavior: 'smooth'
    })
}

let searchMode = 'title';
function getSearchMode(id){
    let search = document.getElementById('search')
    if (id == 'searchBtnT') {

        searchMode = 'title'
        search.placeholder = 'Search by Title'

    } else {
        searchMode = 'category'
        search.placeholder = 'Search by Category'
    }
    search.focus();
}

function searchData(value) {
    let table = '';
    if (searchMode == 'title') {
        for (let i = 0; i < data.length; i++) {
            if (data[i].title.includes(value)) {
                table += ` 
            <tr>
               <td>${i}</td>
               <td>${data[i].title}</td>
               <td>${data[i].price}</td>
               <td>${data[i].taxes}</td>
               <td>${data[i].ads}</td>
               <td>${data[i].discount}</td>
               <td>${data[i].total}</td>
               <td>${data[i].category}</td>
               <td><button onclick="updateData(${i})" id="update">Update</button></td>
               <td><button onclick="deleteData(${i})" id="del">Delete</button></td>
            </tr>
            `
            };
        }
    } else {
        let table = '';
        for (let i = 0; i < data.length; i++) {
            if (data[i].category.includes(value)) {
                table += ` 
            <tr>
               <td>${i}</td>
               <td>${data[i].title}</td>
               <td>${data[i].price}</td>
               <td>${data[i].taxes}</td>
               <td>${data[i].ads}</td>
               <td>${data[i].discount}</td>
               <td>${data[i].total}</td>
               <td>${data[i].category}</td>
               <td><button onclick="updateData(${i})" id="update">Update</button></td>
               <td><button onclick="deleteData(${i})" id="del">Delete</button></td>
            </tr>
            `
            };
        };
    }
    document.getElementById('tablebody').innerHTML = table
}

