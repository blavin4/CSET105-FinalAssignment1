let input = document.getElementById("item-input")
let mode = document.getElementById("mode")
let filter = document.getElementById("filter")
let list = document.getElementById("list")

let items = []

function enterItem() {
    if (input.value.length > 0) {
        let itemName = input.value
        itemName.toLowerCase()
        if (itemName.charCodeAt(0) >= 97 && itemName.charCodeAt(0) <= 122) {
            itemName = String.fromCharCode(itemName.charCodeAt(0) - 32) + itemName.slice(1, itemName.length)
        }
        if (mode.value == "add") addItem(itemName)
        else if (mode.value == "delete") deleteItem(itemName)
        input.value = ""
    }
}

function addItem(itemName) {
    let inList = false
    items.forEach(item => {
        if (item.name == itemName) inList = true
    })
    if (!inList) {
        let item = document.createElement("button")
        items.push(item)
        item.name = itemName
        item.class = "item"
        item.onclick = () => {
            toggleItem(item)
        }

    }
    input.innerHTML = ""
    updateList()
}

function deleteItem(itemName) {
    let inList = false
    items.forEach(item => {
        if (item.name == itemName) inList = true
    })
    if (inList) items.splice(items.indexOf(itemName), 1)

    console.log(items)
    updateList()
}

function updateList() {
    list.replaceChildren()
    items.forEach(item => {
        if (filter.value == "all" || (item.className == "strikethrough" && filter.value == "purchased") || (item.className != "strikethrough" && filter.value == "not-purchased")) {
            item.innerHTML = `${list.childElementCount + 1}. ${item.name}`
            list.appendChild(item)
        }
    })
    console.log("hi")
}

function toggleItem(item) {
    console.log("something")
    item.classList.toggle("strikethrough")
    updateList()
}

function clearList() {
    items = []
    updateList()
}