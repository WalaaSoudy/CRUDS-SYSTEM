let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('sumbit');

let mood='create'
let tmp;
let searchMood='title'

function getTotal() {
   if(price.value != '')
   {
    let result = (+price.value + +taxes.value + +ads.value) - (+discount.value);
    total.innerHTML = result;
   }
   else{
    total.innerHTML=''
   }
}

let dataPro;
if(localStorage.product != null)
{
    dataPro = JSON.parse(localStorage.product)
}
else{
    dataPro = [];
}

create.onclick = function(){
newObj = {
   title: title.value.toLowerCase(),
   price :price.value,
   taxes :taxes.value,
   ads :ads.value,
   discount :discount.value,
   total :total.innerHTML,
   count :count.value,
   category : category.value.toLowerCase()
}
if(title.value != '' && category.value != '')
{
    if(mood==='create')
    {
        if(newObj.count >1)
        {
            for(let i = 0 ; i < newObj.count ; i++)
            {
                dataPro.push(newObj);  
            }
        }
        else{
            dataPro.push(newObj);
        }
    }
    else{
        dataPro[tmp] = newObj;
        mood = 'create'
        create.innerHTML='Create'
        count.style.display ='block'
    }
    clearData()
}



localStorage.setItem ('product',JSON.stringify(dataPro))
// clearData()
showData();
}

function clearData(){
    title.value =''
    price.value =''
    taxes.value =''
    ads.value =''
    discount.value =''
    count.value =''
    total.innerHTML =''
    category.value =''
    
}

function showData(){
    let table = '';
    for(let i=0;i<dataPro.length;i++)
    {
        table +=`<tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].count}</td>
        <td>${dataPro[i].category}</td>
        <td><button class="btn-info px-3 py-2 text-center mt-2 me-2 rounded-pill" onclick="updateData(${i})">Update</button></td>
        <td><button class="btn-info px-3 py-2 text-center mt-2 rounded-pill" onclick="deleteData(${i})">Delete</button></td>
      </tr>`;
    }
   document.getElementById('tbody').innerHTML=table;
   let deleteAll = document.getElementById('deleteAll');
   if(dataPro.length>0)
   {
    deleteAll.innerHTML=`
    <td><button class="btn-info px-3 py-2 text-center mt-2 rounded-pill w-100" onclick="deleteAll()">Delete All(${dataPro.length})</button></td>
    `
   }
   else{
    deleteAll.innerHTML=''
   }
   
}
showData();

function deleteData(i){
dataPro.splice(i,1);
localStorage.product = JSON.stringify(dataPro)
showData()
}

function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData()
}

function updateData(i){
title.value = dataPro[i].title
price.value = dataPro[i].price
taxes.value = dataPro[i].taxes
ads.value = dataPro[i].ads
discount.value = dataPro[i].discount
category.value = dataPro[i].category
getTotal()
count.style.display = 'none'
create.innerHTML = 'Update'
mood='update'
tmp=i;
scroll(
    {
        top : 0,
        behavior:'smooth'
    }
)
}
function getSearch(id)
{
  let search = document.getElementById('search');
  if(id === 'SearchTitle')
  {
    searchMood ='title'
    search.placeholder = 'Search By Title'
  }
  else{
    searchMood ='category'
    search.placeholder = 'Search By Category'
  }
  
  search.value = '';
  showData()
}

function searchData(value){
let table = ''
if(searchMood == 'title')
{
    for(let i = 0 ; i < dataPro.length ; i++)
    {
        if(dataPro[i].title.includes(value.toLowerCase()))
        {
            table +=`<tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].count}</td>
            <td>${dataPro[i].category}</td>
            <td><button class="btn-info px-3 py-2 text-center mt-2 me-2 rounded-pill" onclick="updateData(${i})">Update</button></td>
            <td><button class="btn-info px-3 py-2 text-center mt-2 rounded-pill" onclick="deleteData(${i})">Delete</button></td>
          </tr>` ; 
        }
    }
}
else{
    for(let i = 0 ; i < dataPro.length ; i++)
    {
        if(dataPro[i].category.includes(value.toLowerCase()))
        {
            table +=`<tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].count}</td>
            <td>${dataPro[i].category}</td>
            <td><button class="btn-info px-3 py-2 text-center mt-2 me-2 rounded-pill" onclick="updateData(${i})">Update</button></td>
            <td><button class="btn-info px-3 py-2 text-center mt-2 rounded-pill" onclick="deleteData(${i})">Delete</button></td>
          </tr>` ; 
        }
    }
}
 document.getElementById('tbody').innerHTML=table;
}