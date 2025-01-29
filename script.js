let createBtn = document.getElementById("create");
let title = document.querySelector("#title");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let taxes = document.querySelector(".inputs .price #taxes");
let price = document.querySelector(".inputs .price #price");
let ads = document.querySelector(".inputs .price #ads");
let discount = document.querySelector(".inputs .price #discount");
let total = document.querySelector(".total .result");
let switching = document.querySelector(".switch i");
let mood = "create";
let tmp;
let byTitle = document.querySelector("#title-search");
let byCategory = document.querySelector("#category-search");
let searchPlace = document.querySelector("#search");

switching.addEventListener("click" , function () {
    document.body.classList.toggle("light-mode");
    if (document.body.classList.contains("light-mode") === true) {
        switching.classList.remove("fa-sun");
        switching.classList.add("fa-moon");
    }
    if (document.body.classList.contains("light-mode")===false) {
        switching.classList.add("fa-sun");
        switching.classList.remove("fa-moon");
    }
})

createBtn.addEventListener("click" , function () {
    addProduct();
    showData();
})

function getTotal() {
    if (price.value !== "") {
        let result = +price.value - +taxes.value - +ads.value + +discount.value;
        total.innerHTML = result;
    }
    else {
        total.innerHTML = "";
    }
}

let products;
if (localStorage.product == null) {
    products = [];
} else {
    products = JSON.parse(localStorage.product);
}

getTotal();

function addProduct() {
    let newProduct = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value
    }
    if (title.value !== "" && price.value !== "" && category.value !== "") {
        if (mood === "create") {
            if (parseInt(count.value) < 1001) {
                if (count.value > 1) {
                    for (let i = 0; i < count.value; i++) {
                        products.push(newProduct);
                    }
                }
                else {
                    products.push(newProduct);
                }
                clearInputs();
            }
        } else {
            products[tmp] = newProduct;
            mood = "create";
            createBtn.innerHTML = "Create";
            count.style.display = "block";
            clearInputs();
        }
    }
    localStorage.setItem("product" ,JSON.stringify(products));
}

function clearInputs() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    count.value = "";
    total.innerHTML = "";
    category.value = "";
}

function showData() {
    let table = "";
    for (let i = 0; i < products.length; i++) {
        table += `<tr>
                        <td>${i+1}</td>
                        <td>${products[i].title}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].taxes}</td>
                        <td>${products[i].ads}</td>
                        <td>${products[i].discount}</td>
                        <td>${products[i].total}</td>
                        <td>${products[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>`;
    }
    document.querySelector("tbody").innerHTML = table;
    let deleteAll = document.querySelector(".delete-all");
    if (products.length > 0) {
        deleteAll.innerHTML = `<button onclick="deleteAveryThing()" >Delete All ${products.length}</button>`;
    } else {
        deleteAll.innerHTML = "";
    }

}

showData();

function deleteData(i) {
    products.splice(i,1);
    localStorage.product = JSON.stringify(products);
    showData();
}

function deleteAveryThing() {
    mood = "create";
    createBtn.innerHTML = "Create";
    count.style.display = "block";
    localStorage.clear();
    products.splice(0);
    showData();
}

function updateData(i) {
    scroll({
        top:0,
    })
    mood = "update";
    title.value = products[i].title;
    price.value = products[i].price;
    taxes.value = products[i].taxes;
    ads.value = products[i].ads;
    discount.value = products[i].discount;
    getTotal();
    count.style.display = "none";
    category.value = products[i].category;
    createBtn.innerHTML = "Update";
    tmp = i;
}

let moodOfSearch = "title";
searchPlace.placeholder = "Search By Title";

function searchMood(id) {
    if (id === "title-search") {
        moodOfSearch = "title";
        searchPlace.placeholder = "Search By Title";
    }
    else {
        moodOfSearch = "category";
        searchPlace.placeholder = "Search By Category";
    }
    searchPlace.focus()
    searchPlace.value = "";
    showData();
}

function searching(thevalue) {
    thevalue = thevalue.toLowerCase();
    console.log(thevalue);
    let table = "";
    if (moodOfSearch === "title") {
        for (let i = 0; i < products.length; i++) {
            if (products[i].title.toLowerCase().includes(thevalue)) {
                table += `<tr>
                <td>${i+1}</td>
                <td>${products[i].title}</td>
                <td>${products[i].price}</td>
                <td>${products[i].taxes}</td>
                <td>${products[i].ads}</td>
                <td>${products[i].discount}</td>
                <td>${products[i].total}</td>
                <td>${products[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>`;
            }
        }
    } else {
        for (let i = 0; i < products.length; i++) {
            if (products[i].category.toLowerCase().includes(thevalue)) {
                table += `<tr>
                <td>${i+1}</td>
                <td>${products[i].title}</td>
                <td>${products[i].price}</td>
                <td>${products[i].taxes}</td>
                <td>${products[i].ads}</td>
                <td>${products[i].discount}</td>
                <td>${products[i].total}</td>
                <td>${products[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>`;
            }
        }
    }
    document.querySelector("tbody").innerHTML = table;
}