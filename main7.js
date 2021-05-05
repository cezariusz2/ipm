const DB_NAME = 'Zadanie5Database';
const DB_VERSION = 3;
const DB_STORE_NAME = 'Clients';
var db;

var request = indexedDB.open(DB_NAME, DB_VERSION);
request.onerror = function (event) {
    console.log("Error occured");
};
request.onsuccess = function (event) {
    db = event.target.result;
    console.log("Open success");

    readAll();
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
function add(request) {
    var name = document.getElementById('name1').value;
    var email = document.getElementById('email1').value;
    var name2 = document.getElementById('name2').value;
    var pesel1 = document.getElementById('pesel1').value;
    var phone1 = document.getElementById('phone1').value;
    var address1 = document.getElementById('address1').value;
    var address2 = document.getElementById('address2').value;
    var postalcode1 = document.getElementById('postalcode1').value;




    var request = db.transaction([DB_STORE_NAME], 'readwrite')
        .objectStore(DB_STORE_NAME)
        .add({ name: name, lname: name2, email: email, pesel: pesel1, phone: phone1, address1: address1, address2: address2, postalcode: postalcode1 });

    request.onsuccess = function (event) {
        console.log('The data has been written successfully');
    };

    request.onerror = function (event) {
        console.log('The data has been written failed');
    }
}
function clearObjectStore() {

    var store = db.transaction(DB_STORE_NAME, 'readwrite').objectStore(DB_STORE_NAME);
    var req = store.clear();
    req.onsuccess = function (evt) {
        console.log("Cleared")
    };
    req.onerror = function (evt) {
        console.error("clearObjectStore:", evt.target.errorCode);
    };
    const table_clients = document.getElementById("table-clients");
    while (table_clients.firstChild) {
        table_clients.removeChild(table_clients.lastChild);
    }
    readAll();
}
function readAll() {
    var filterS = document.getElementById("name2filter").value;
    filterS.innerHTML = "";
    filter();
}
function clear_table_clients() {
    var table_clients = document.getElementById("table-clients");
    while (table_clients.lastElementChild && table_clients.lastElementChild != table_clients.firstElementChild) {
        table_clients.removeChild(table_clients.lastElementChild);
    }
}
function filter() {
    var objectStore = db.transaction(DB_STORE_NAME).objectStore(DB_STORE_NAME);
    var filter = document.getElementById("name2filter").value;
    clear_table_clients();
    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        var exists = false;
        const words = filter.trim().split(' ');
        var matchedF = 0;
        if (cursor) {
            for (var word in words) {
                for (var field in cursor.value) {
                    if (cursor.value[field].toLowerCase().includes(words[word].toLowerCase())) {
                        exists = true;
                        matchedF += 1;
                        break;
                    }
                }
            }
            if (matchedF >= words.length || filter == '') {

                var r = document.createElement('tr');
                var t = document.createElement('td');
                t.innerHTML = cursor.value.name;
                r.appendChild(t);
                var t = document.createElement('td');
                t.innerHTML = cursor.value.lname;
                r.appendChild(t);
                var t = document.createElement('td');
                t.innerHTML = cursor.value.email;
                r.appendChild(t);
                var t = document.createElement('td');
                t.innerHTML = cursor.value.pesel;
                r.appendChild(t);
                var t = document.createElement('td');
                t.innerHTML = cursor.value.phone;
                r.appendChild(t);
                var t = document.createElement('td');
                t.innerHTML = cursor.value.address1;
                r.appendChild(t);
                var t = document.createElement('td');
                t.innerHTML = cursor.value.address2;
                r.appendChild(t);
                var t = document.createElement('td');
                t.innerHTML = cursor.value.postalcode;
                r.appendChild(t);
                var t = document.createElement('button');
                var t2 = document.createElement('td');
                t.innerHTML = 'X';
                t.id = cursor.key;
                t.onclick = function () { deleteRow(t.id) };
                t2.appendChild(t);
                r.appendChild(t2);
                var t = document.createElement('button');
                var t2 = document.createElement('td');
                t.innerHTML = 'Edit';
                t.id = cursor.key;
                t.onclick = function () { editRow(t.id) };
                t2.appendChild(t);
                r.appendChild(t2);
                r.id = "row" + t.id;
                document.getElementById("table-clients").appendChild(r);
            }
            cursor.continue();
        }
    };
}
function editRow(key) {
    var objectStore = db.transaction(DB_STORE_NAME).objectStore(DB_STORE_NAME);
    var request = objectStore.get(parseInt(key));

    request.onsuccess = function (event) {
        document.getElementById('name1').value = request.result.name;
        document.getElementById('email1').value = request.result.email;
        document.getElementById('name2').value = request.result.lname;
        document.getElementById('pesel1').value = request.result.pesel;
        document.getElementById('phone1').value = request.result.phone;
        document.getElementById('address1').value = request.result.address1;
        document.getElementById('address2').value = request.result.address2;
        document.getElementById('postalcode1').value = request.result.postalcode;
        deleteRow(key);
    };
}
function deleteRow(key) {
    var objectStore = db.transaction(DB_STORE_NAME, 'readwrite').objectStore(DB_STORE_NAME);
    var deleteReq = objectStore.delete(parseInt(key));
    deleteReq.onsuccess = function (evt) {
        console.log("delete successful");
        const table_clients = document.getElementById("table-clients");
        document.getElementById("row" + key).remove();
    };
    deleteReq.onerror = function (evt) {
        console.error("deletePublication:", evt.target.errorCode);
    };

}
function generate() {
    console.log("generate");
    var names1 = ['Jan', 'Marian', 'Piotr', 'Robert', 'Jerzy', 'Stefan', 'Paweł'];
    var names2 = ['Kowalski', 'Malinowski', 'Nowak', 'Maliniak'];
    var emailDomains = ['test', 'test2', 'wp', 'onet', 'gmail'];
    var addresses1 = ['Wschodnia', 'Zachodnia', 'Północna', 'Południowa'];
    var addresses2 = ['Warszawa', 'Gdańsk', 'Łódź', 'Poznań']
    var name = names1[Math.floor(Math.random() * names1.length)];
    var email = makeid(5) + '@' + emailDomains[Math.floor(Math.random() * emailDomains.length)] + '.com';
    var name2 = names2[Math.floor(Math.random() * names2.length)] + getRandomIntInclusive(1, 100);
    var pesel1 = getRandomIntInclusive(10000000000, 99999999999);
    var phone1 = getRandomIntInclusive(100000000, 999999999);
    var address1 = addresses1[Math.floor(Math.random() * addresses1.length)] + ' ' + getRandomIntInclusive(1, 100);
    var address2 = addresses2[Math.floor(Math.random() * addresses2.length)];
    var postalcode1 = getRandomIntInclusive(10000, 99999).toString();
    postalcode1 = postalcode1.substring(0, 2) + '-' + postalcode1.substring(2);

    document.getElementById('name1').value = name;
    document.getElementById('email1').value = email;
    document.getElementById('name2').value = name2;
    document.getElementById('pesel1').value = pesel1;
    document.getElementById('phone1').value = phone1;
    document.getElementById('address1').value = address1;
    document.getElementById('address2').value = address2;
    document.getElementById('postalcode1').value = postalcode1;

}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function makeid(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}



function getDbObjects(filter = (object) => true) {
    let ret = new Promise((res, rej) => {
        let objects = [];
        if (database) {
            var store = database.transaction(OBJECTSTORE_NAME, 'readonly').objectStore(OBJECTSTORE_NAME);
            store.openCursor().onsuccess = (e) => {
                var c = e.target.result;
                if (c) {
                    if (filter(c.value)) {
                        objects.push(c.value);
                    }
                    c.continue();
                } else {
                    res(objects);
                }
            };
        }
    });
    return ret;
}
window.onload = () => {
    //if (window != self) {
        console.log("worker");
        worker_function();
        worker = new Worker('worker7.js');
        const triggerWorkerButton = document.getElementById('TriggerWorker');
        triggerWorkerButton.addEventListener('click', (e) => {
            getDbObjects().then((value) => {
                worker.postMessage(JSON.stringify(value))
            });
        });
    //}


}
function worker_function() {

}