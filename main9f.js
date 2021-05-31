function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}
console.log(GetURLParameter("products"));
console.log(GetURLParameter("id"));
const product = GetURLParameter("products");
const id = GetURLParameter("id");
const cena = GetURLParameter("cena");

const DB_NAME = 'Zadanie5Database';
const DB_VERSION = 4;
const DB_STORE_NAME = 'Clients';
var db;
var request = indexedDB.open(DB_NAME, DB_VERSION);
request.onerror = function (event) {
    console.log("Error occured");
};
request.onsuccess = function (event) {
    db = event.target.result;
    console.log("Open success");

    readId(id);
};
request.onupgradeneeded = function (event) {
    db = event.target.result;
    var objectStore;
    if (!db.objectStoreNames.contains(DB_STORE_NAME)) {
        objectStore = db.createObjectStore(DB_STORE_NAME, { autoIncrement: true });
        objectStore.createIndex("name", "name", { unique: false });
        objectStore.createIndex("email", "email", { unique: true });
        objectStore.createIndex("lname", "lname", { unique: false });
        objectStore.createIndex("pesel", "pesle", { unique: true });
        objectStore.createIndex("phone", "phone", { unique: false });
        objectStore.createIndex("address1", "address1", { unique: false });
        objectStore.createIndex("address2", "address2", { unique: false });
        objectStore.createIndex("postalcode", "postalcode", { unique: false });
    }
}
function readId(key){
    var objectStore = db.transaction(DB_STORE_NAME).objectStore(DB_STORE_NAME);
    var request = objectStore.get(parseInt(key));

    request.onsuccess = function (event) {
        document.getElementById('name1').innerHTML = request.result.name;
        document.getElementById('email1').innerHTML = request.result.email;
        document.getElementById('name2').innerHTML = request.result.lname;
        document.getElementById('pesel1').innerHTML = request.result.pesel;
        document.getElementById('phone1').innerHTML = request.result.phone;
        document.getElementById('address1').innerHTML = request.result.address1;
        document.getElementById('address2').innerHTML = request.result.address2;
        document.getElementById('postalcode1').innerHTML = request.result.postalcode;
        document.getElementById('selectedProduct').innerHTML = product;
        document.getElementById('selectedProductCena').innerHTML = cena + "zł";
        
    };
}