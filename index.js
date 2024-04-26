import { initializeApp } from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://realtime-database-1365b-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListDB = ref(database, "shoppingList")

const inputFildEl = document.getElementById("input-field")
const addingButtonEl = document.getElementById("add-button")
const shoppListEl = document.getElementById("shopping-list")


addingButtonEl.addEventListener("click", function() {
    let inputValue = inputFildEl.value
    
    push(shoppingListDB, inputValue)
    
    shoppListEl.innerHTML += `<li>${inputValue}</li>`
    clearinputFildEl()
})

onValue(shoppingListDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToShoppingListEl(currentItem)
        }    
    } else {
        shoppListEl.innerHTML = "No items here... yet"
    }
})

function clearShoppListEl() {
    shoppListEl.innerHTML = ""
}

function clearInputFildEl() {
    inputFildEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    shoppListEl.append(newEl) }