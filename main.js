let title = document.getElementById('title'), price = document.getElementById('price'), taxes = document.getElementById('taxes'), 
    ads = document.getElementById('ads'), discount = document.getElementById('discount'), total = document.getElementById('total'), 
    res, amount = document.getElementById('amount'), category = document.getElementById('category'), create = document.getElementById('create'),
    search = document.getElementById('search'), searchTit = document.getElementById('searchTit'), searchCat = document.getElementById('searchCat'),
    btnDelete = document.getElementById('deleteAll'), products = [], mood = 'create', moodSearch = 'title', ind;

// get total
function getTotal(){
    if(price.value != ''){
        total.innerHTML = +price.value + +taxes.value + +ads.value - +discount.value;
        total.style.background = 'green';
    }
    else{
        total.innerHTML = '';
        total.style.background = 'orangered';
    }
}

// create product
if(localStorage.product != null){
    products = JSON.parse(localStorage.product);
}
else{
    products = [];
}

create.onclick = function(){
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        amount: amount.value,
        category: category.value.toLowerCase()
    }
    if(title.value != '' && price.value != '' && category.value != '' && amount.value < 101){
        if(mood == 'create'){
            if(newPro.amount > 1){
                for (let i = 0; i < newPro.amount; i++) {
                    products.push(newPro);
                }
            }
            else{
                products.push(newPro);
            }
        }
        else{
            products[ind] = newPro;
            mood = 'create';
            create.innerHTML = 'Create';
            amount.style.display = 'block';
        }
        clearInput();
    }

    // save data
    localStorage.product = JSON.stringify(products);
    showData();
}

// clear inputs
function clearInput(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    amount.value = '';
    category.value = '';
    getTotal();
}

// read data
function showData(){
    let table = '', i = 0;

    for(; i < products.length; i++){
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${products[i].title}</td>
                <td>${products[i].price}</td>
                <td>${products[i].taxes}</td>
                <td>${products[i].ads}</td>
                <td>${products[i].discount}</td>
                <td>${products[i].total}</td>
                <td>${products[i].category}</td>
                <td><button id="update" onclick="updateData(${i})">Update</button></td>
                <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
            </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;

    if(products.length){
        btnDelete.innerHTML = `
            <button onclick="deleteAll()">Delete all products (${products.length})</button>
        `
    }
    else{
        btnDelete.innerHTML = '';
    }
}
showData();

// delete data
function deleteData(index){
    products.splice(index,1);
    localStorage.product = JSON.stringify(products);
    showData();
}

function deleteAll(){
    localStorage.clear();
    products.splice(0);
    showData();
}

// update
function updateData(index){
    title.value = products[index].title;
    price.value = products[index].price;
    taxes.value = products[index].taxes;
    ads.value = products[index].ads;
    discount.value = products[index].discount;
    category.value = products[index].category;
    getTotal();
    amount.style.display = 'none';
    create.innerHTML = 'Update';
    mood = 'update';
    ind = index;
}

// search
function searchMood(id) {
    if(id == 'searchCat'){
        moodSearch = 'category'; 
    }
    search.placeholder = 'Search by ' + moodSearch;
    search.focus();
    search.value = '';
    showData();
}

function searchData(value){
    let i = 0, table = '';
    for(; i < products.length; i++){
        if(moodSearch == 'title'){
            if(products[i].title.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${products[i].title}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].taxes}</td>
                        <td>${products[i].ads}</td>
                        <td>${products[i].discount}</td>
                        <td>${products[i].total}</td>
                        <td>${products[i].category}</td>
                        <td><button id="update" onclick="updateData(${i})">Update</button></td>
                        <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
                    </tr>
                `
            }
        }
        else{
            if(products[i].category.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${products[i].title}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].taxes}</td>
                        <td>${products[i].ads}</td>
                        <td>${products[i].discount}</td>
                        <td>${products[i].total}</td>
                        <td>${products[i].category}</td>
                        <td><button onclick="updateData(${i})">Update</button></td>
                        <td><button onclick="deleteData(${i})">Delete</button></td>
                    </tr>
                `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}