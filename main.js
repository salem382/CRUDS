
/* document element */
var productName = document.getElementById('productName'),
    productPrice = document.getElementById('productPrice'),
    productCategory = document.getElementById('productCategory'),
    productDesc = document.getElementById('productDesc'),
    nameAlert = document.getElementById('name-alert'),
    priceAlert = document.getElementById('price-alert'),
    categoryAlert = document.getElementById('categ-alert'),
    searchContainer = document.querySelector('.search-container'),
    tableHead = document.querySelector('.table-head'),
    tableRow = document.getElementById('tableRow'),
    addButton = document.getElementById('addProduct'),
    inputSearch,
    selectSearch;
    


var  isUpdate = false,
     globalUpdateindex,
     nameVald = false,
     priceVald = false,
     categoryVald = false,
     selectSearchValue = 'name';




if (localStorage.getItem('allProd') == null) {
    allProducts = [];
} else {
    var allProducts = JSON.parse(localStorage.getItem('allProd'));
    display()
}

/* functions */


function noItems () {

    if (localStorage.getItem('allProd') == null || localStorage.getItem('allProd') == '[]') {
        searchContainer.innerHTML = '';
        tableHead.innerHTML = `<div class ="border shadow-sm text-center fs-3">No items to show</div>`;
    }
    else {
        searchContainer.innerHTML = `
        <input type="text" class="form-control w-75 my-5 mx-auto" placeholder="Search..." id="search"/>
        <select id = "select-search">
          <option value="name" >name</option>
          <option value="price">price</option>
          <option value="category">category</option>
        </select>
        `;
        tableHead.innerHTML = `<th>Index</th>
        <th>productName</th>
        <th>productprice</th>
        <th>productCategory</th>
        <th>productDesc</th>
        <th>Delete</th>
        <th>update</th>`;
        inputSearch = document.getElementById('search');
        selectSearch = document.getElementById('select-search');
        inputSearch.addEventListener('keyup',search);
        search ();
    }
}
noItems ();



function addProduct () {
    nameValidation();
    priceValidation();
    categoryValidation();
    if (nameVald && priceVald && categoryVald) {
        productName.classList.remove('is-valid');
        productPrice.classList.remove('is-valid');
        productCategory.classList.remove('is-valid');
        var product = {
            name:productName.value,
            price : productPrice.value,
            category : productCategory.value,
            desc : productDesc.value    
        }  
        if (!isUpdate) { 
            allProducts.push (product);
        }
        else {
            allProducts[globalUpdateindex] = product;
            isUpdate = false;
            addButton.innerHTML = 'add product';
        }
        localStorage.setItem('allProd',JSON.stringify(allProducts));
        noItems ();
        remove ();
        display () ;
    }
}

function remove () {

    productName.value = '';
    productPrice.value = '';
    productCategory.value = '';
    productDesc.value = '';
}


function display () {

    trs = '';
        
        for (var i = 0; i < allProducts.length; i++) {

            trs += `  <tr>
            <td>${i + 1}</td>
            <td>${allProducts[i].name}</td>
            <td>${allProducts[i].price}</td>
            <td>${allProducts[i].category}</td>
            <td>${allProducts[i].desc}</td>
            <td><button onclick = "Delete (${i})" class="btn btn-danger">Delete</button></td>
            <td><button onclick = "update (${i})" class="btn btn-primary">update</button></td>
          </tr>`
        }
        tableRow.innerHTML = trs;
    

}

function Delete (ind) {

    allProducts.splice(ind, 1);
    localStorage.setItem('allProd', JSON.stringify(allProducts));
    noItems ();
    display ();
}
function update (ind) {
    productName.value = allProducts[ind].name;
    productPrice.value = allProducts[ind].price;
    productCategory.value = allProducts[ind].category;
    productDesc.value = allProducts[ind].desc;
    addButton.innerHTML = 'Update Product';
    isUpdate = true;
    globalUpdateindex = ind;
}

function search () {
    
    searchBy(selectSearchValue);
    selectSearch.addEventListener('change',() => {

        selectSearchValue = selectSearch.value;
        searchBy(selectSearchValue);
    })
}

function searchBy (par) {

    if (par == 'name') {
        var trs = '';

        for (var i = 0 ; i < allProducts.length ; i++) {
    
            if (allProducts[i].name.toLowerCase().includes(inputSearch.value.toLowerCase())) {
                var searchedword = inputSearch.value; 
                if (searchedword != '') {
                    if (searchedword[0].toLowerCase() == allProducts[i].name[0].toLowerCase()) {
                        searchedword = searchedword.toLowerCase().replace(/^[a-z]/, (letter) => letter.toUpperCase());
                    }
                }
                trs += `<tr>
                <td>${i + 1}</td>
                <td>${allProducts[i].name.replace(searchedword,
                    `<span>${searchedword}</span>`)}</td>
                <td>${allProducts[i].price}</td>
                <td>${allProducts[i].category}</td>
                <td>${allProducts[i].desc}</td>
                <td><button onclick = "Delete (${i})" class="btn btn-danger">Delete</button></td>
                <td><button onclick = "update (${i})" class="btn btn-primary">update</button></td>
              </tr>`
            }
        }
        tableRow.innerHTML = trs;
    }
    else if (par == 'price') {
        var trs = '';

        for (var i = 0 ; i < allProducts.length ; i++) {
    
            if (allProducts[i].price.toLowerCase().includes(inputSearch.value.toLowerCase())) {
                var searchedword = inputSearch.value;
                trs += `<tr>
                <td>${i + 1}</td>
                <td>${allProducts[i].name}</td>
                <td>${allProducts[i].price.replace(searchedword,
                    `<span>${searchedword}</span>`)}</td>
                <td>${allProducts[i].category}</td>
                <td>${allProducts[i].desc}</td>
                <td><button onclick = "Delete (${i})" class="btn btn-danger">Delete</button></td>
                <td><button onclick = "update (${i})" class="btn btn-primary">update</button></td>
              </tr>`
            }
        }
        tableRow.innerHTML = trs;
    }
    else if (par == 'category') {
        var trs = '';

        for (var i = 0 ; i < allProducts.length ; i++) {
    
            if (allProducts[i].category.toLowerCase().includes(inputSearch.value.toLowerCase())) {
                var searchedword = inputSearch.value;
                if (searchedword != '') {
                    if (searchedword[0].toLowerCase() == allProducts[i].category[0].toLowerCase()) {
                        searchedword = searchedword.toLowerCase().replace(/^[a-z]/, (letter) => letter.toUpperCase());
                    }
                }
                trs += `<tr>
                <td>${i + 1}</td>
                <td>${allProducts[i].name}</td>
                <td>${allProducts[i].price}</td>
                <td>${allProducts[i].category.replace(searchedword,
                    `<span>${searchedword}</span>`)}</td>
                <td>${allProducts[i].desc}</td>
                <td><button onclick = "Delete (${i})" class="btn btn-danger">Delete</button></td>
                <td><button onclick = "update (${i})" class="btn btn-primary">update</button></td>
              </tr>`
            }
        }
        tableRow.innerHTML = trs;
    }
}

function nameValidation () {
    nameAlert.classList.add('d-none');
    var name = /^[A-Z][a-z]{0,10}[0-9]{0,3}$/;
    nameVald =  name.test(productName.value);
    if (!nameVald) {
        productName.classList.remove('is-valid')
        var name = productName.value;
        var val = name.slice(1, name.length);
        var isUpper = (string) => /[A-Z]{1,}/.test(string);
        var letterLength = (string) => /^[a-z]{11,}[0-9]{0,}$/.test(string);
        var space = (string) => / {1,}/.test(string);
        var numberLength = (string) => /^[A-Za-z]{0,}[0-9]{4,}$/.test(string);
        var numberPosition = (string) => /[A-Za-z]{0,}[0-9]{1,}[A-Za-z]/.test(string);
        var Alphanumeric = (string) => /[=\-)(*&^%$#@!~*\/+\\\|_.]/.test(string);
        var alpha = /[=\-)(*&^%$#@!~*\/+\\\|_.]/;
        var AlphanumericMatch = name.match(alpha);
        if (name == '') {
            nameAlert.classList.remove('d-none');
            nameAlert.innerHTML = 'you shouid enter product name';
        }
        else if (Alphanumeric(name)) {
            nameAlert.classList.remove('d-none');
            nameAlert.innerHTML = `Not allowed to add ${AlphanumericMatch}`;
        }
        else if (numberPosition (name)) {
            nameAlert.classList.remove('d-none');
            nameAlert.innerHTML = 'The numbers should be at the end of the word';
        }
        else if (space(name)) {
            nameAlert.classList.remove('d-none');
            nameAlert.innerHTML = 'There should be no spaces';
        }
        else if (name[0].toUpperCase() != name[0]) {
            nameAlert.classList.remove('d-none');
            nameAlert.innerHTML = 'you shouid start with upper case';
        }
        else if (isUpper(val)) {
            nameAlert.classList.remove('d-none');
            nameAlert.innerHTML = 'Only the first letter must be a capital';
        }
        else if (letterLength(val)) {
            nameAlert.classList.remove('d-none');
            nameAlert.innerHTML = 'The number of letters should not exceed 11 letters';
        }
        else if (numberLength(name)) {
            nameAlert.classList.remove('d-none');
            nameAlert.innerHTML = 'The number of numbers must not exceed three digits';
        }
        else {
            nameAlert.classList.remove('d-none');
            nameAlert.innerHTML = 'somthing worng product name must be like this Ahmed582';   
        }
    }
    else {
        productName.classList.add('is-valid')
    }
}
function priceValidation () {
    var price = /^\d{1,8}(\.\d{1,4})?$/;
    priceVald =  price.test(productPrice.value);
    priceAlert.classList.add('d-none');
    if (!priceVald) {
        var price = productPrice.value;
        var dotNum = 0;
        for (var i = 0; i < price.length; i++) {
            if (price[i] == '.') {
                dotNum++;
            }
        }
        productPrice.classList.remove('is-valid');
        var foundLetters = (string) => /[A-Za-z]/.test(string);
        var space = (string) => / {1,}/.test(string);
        var numberBfDotLength = (string) =>/\d{9,}.{0,1}\d{0,}$/.test(string);
        var numberAfDotLength = (string) => /.{5,}$/.test(string);
        var startWithDot = (string) => /^\.\d{0,}$/.test(string);
        var Alphanumeric = (string) => /[=\-)(*&^%#@!~*\/+\\\|_$]/.test(string);
        var alpha = /[=\-)(*&^%$#@!~*\/+\\\|_.]/;
        var AlphanumericMatch = price.match(alpha);
        if (price == '') {
            priceAlert.classList.remove('d-none');
            priceAlert.innerHTML = 'you shouid enter product price';
        }
        else if (space(price)) {
            priceAlert.classList.remove('d-none');
            priceAlert.innerHTML = `Not allowed to add space`;
        }
        else if (Alphanumeric(price)) {
            priceAlert.classList.remove('d-none');
            priceAlert.innerHTML = `Not allowed to add ${AlphanumericMatch}`;
        }
        else if (foundLetters(price)) {
            priceAlert.classList.remove('d-none');
            priceAlert.innerHTML = `Not allowed to add letters`;
        }
        else if (dotNum > 1) {
            priceAlert.classList.remove('d-none');
            priceAlert.innerHTML = `dot must be increase than one`;
        }
        else if (numberBfDotLength(price)) {
            priceAlert.classList.remove('d-none');
            priceAlert.innerHTML = `length of number before dot must exceed 8 number`;
        }
        else if (numberAfDotLength(price)) {
            priceAlert.classList.remove('d-none');
            priceAlert.innerHTML = `length of number after dot must exceed 4 number`;
        }
        else if (startWithDot(price)) {
            priceAlert.classList.remove('d-none');
            priceAlert.innerHTML = `you can't start with dot`;
        }
        else {
            priceAlert.classList.remove('d-none');
            priceAlert.innerHTML = `somthing worng the way to type price like this 123.123`;   
        }
        
    }
    else {
        productPrice.classList.add('is-valid')
    }
}
function categoryValidation () {
    console.log ('enter..')
    categoryAlert.classList.add('d-none');
    var category = /^[A-Z][a-z]{0,10}[0-9]{0,3}$/;
    categoryVald =  category.test(productCategory.value);
    if (!categoryVald) {
        productCategory.classList.remove('is-valid')
        var catValue = productCategory.value;
        var catSlice = catValue.slice(1, catValue.length);
        var isUpper = (string) => /[A-Z]{1,}/.test(string);
        var letterLength = (string) => /^[a-z]{11,}[0-9]{0,}$/.test(string);
        var space = (string) => / {1,}/.test(string);
        var numberLength = (string) => /^[A-Za-z]{0,}[0-9]{4,}$/.test(string);
        var numberPosition = (string) => /[A-Za-z]{0,}[0-9]{1,}[A-Za-z]/.test(string);
        var Alphanumeric = (string) => /[=\-)(*&^%$#@!~*\/+\\\|_.]/.test(string);
        var alpha = /[=\-)(*&^%$#@!~*\/+\\\|_.]/;
        var AlphanumericMatch = catValue.match(alpha);
        if (catValue == '') {
            categoryAlert.classList.remove('d-none');
            categoryAlert.innerHTML = 'you shouid enter category name';
        }
        else if (Alphanumeric(catValue)) {
            categoryAlert.classList.remove('d-none');
            categoryAlert.innerHTML = `Not allowed to add ${AlphanumericMatch}`;
        }
        else if (numberPosition (catValue)) {
            categoryAlert.classList.remove('d-none');
            categoryAlert.innerHTML = 'The numbers should be at the end of the word';
        }
        else if (space(catValue)) {
            categoryAlert.classList.remove('d-none');
            categoryAlert.innerHTML = 'There should be no spaces';
        }
        else if (catValue[0].toUpperCase() != catValue[0]) {
            categoryAlert.classList.remove('d-none');
            categoryAlert.innerHTML = 'you shouid start with upper case';
        }
        else if (isUpper(catSlice)) {
            categoryAlert.classList.remove('d-none');
            categoryAlert.innerHTML = 'Only the first letter must be a capital';
        }
        else if (letterLength(catSlice)) {
            categoryAlert.classList.remove('d-none');
            categoryAlert.innerHTML = 'The number of letters should not exceed 11 letters';
        }
        else if (numberLength(catValue)) {
            categoryAlert.classList.remove('d-none');
            categoryAlert.innerHTML = 'The number of numbers must not exceed three digits';
        }
        else {
            categoryAlert.classList.remove('d-none');
            categoryAlert.innerHTML = 'somthing worng Category name must be like this Ahmed582';   
        }
    }
    else {
        productCategory.classList.add('is-valid')
    }
}


productName.addEventListener('blur',nameValidation);
productPrice.addEventListener('blur',priceValidation);
productCategory.addEventListener('blur',categoryValidation);

