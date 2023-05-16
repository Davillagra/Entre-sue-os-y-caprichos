const carts = JSON.parse(localStorage.getItem("Cart")) || []
const productsString = JSON.parse(localStorage.getItem("ObjetoProductos")) || []
let idCount = parseInt(localStorage.getItem("idCount")) || 3
const products = []

async function getJSONData () {
    try {
        const resp = await fetch("../../js/productos.json")
        const productsData = await resp.json()
        productsData.forEach((product) => {
            const productIndex = productsString.findIndex((p) => p.id === product.id)
            console.log(productIndex)
            if (productIndex == -1) {
                productsString.push(product)
            }
        })
        //localStorage.setItem("ObjetoProductos", JSON.stringify(productsString))
        productsString.forEach((product) => {
            products.push(new Product(
                product.name,
                product.stock,
                product.id,
                product.price,
                product.category,
                product.date
            ))
        })
        localStorage.setItem("ObjetoProductos", JSON.stringify(products))
        print()
        console.log(products)
    } catch (error) {
        console.log(error)
    }
}
getJSONData()

function printProducts(product) {
    const productCard = document.createElement("form")
    productCard.className = "prodCard"
    productCard.dataset.index = product.id;
    productCard.innerHTML = `
    <div><img src="../../img/productos/setposavasomadera.jpeg" class="img-fluid rounded"></div>
    <div class="prodInfo">
    <h2 class="fs-5">Nombre: </h2><input type="text" class="fs-5" placeholder="${product.name}" name="name" required autocomplete="off"></input>
    <p class="">Precio : $ </p><input type="number" class="" placeholder="${product.price}" name="price" required autocomplete="off"></input>
    <p class="">Stock: </p><input type="number" class="" placeholder="${product.stock}" name="stock" required autocomplete="off"></input>
    <p class="">Categoría: </p><input type="text" class="" placeholder="${product.category}" name="category" required autocomplete="off"></input>
    </div>
    <div class="buttonForm">
    <button class="btn btn-outline-success1 aFormat2 editCard" type="sumbit" data-index="${product.id}">Editar</button>
    <button class="btn btn-outline-success1 aFormat2 deleteCard" data-index="${product.id}">Borrar</button>
    </div>
    `
    productCard.addEventListener("submit", sumbitHandler)
    container.append(productCard)
}

const container = document.getElementById("prodCards")
JSON.parse(localStorage.getItem("ObjetoProductos"))

products.forEach((product) => {
    printProducts(product)
})

function print() {
    products.forEach((product) => {
        printProducts(product)
    })
}
function clearCartView() {
    container.innerHTML = "";
}

const form = document.getElementById("prodForm")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    const data = e.target.children
    const name = data["name"].value
    const price = parseInt(data["price"].value)
    const stock = parseInt(data["stock"].value)
    const category = data["category"].value
    const product = new Product(name, stock, idCount, price, category)
    toastPop("Producto creado ✓", true)
    idCount++
    products.push(product)
    form.reset()
    printProducts(product)
    localStorage.setItem("ObjetoProductos", JSON.stringify(products))
    localStorage.setItem("idCount", idCount)
})

container.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteCard")) {
        const productId = parseInt(e.target.getAttribute("data-index"))
        const productIndex = products.findIndex((product) => product.id == productId)
        products.splice(productIndex, 1)
        localStorage.setItem("ObjetoProductos", JSON.stringify(products))
        e.target.parentElement.parentElement.remove()
        const cartIndex = carts.findIndex((cart) => cart.id == productId)
        console.log(cartIndex)
        if (cartIndex != -1) {
            carts.splice(cartIndex, 1)
            localStorage.setItem("Cart", JSON.stringify(carts))
        }
        toastPop("Producto borrado X", false)
    }
})

const editForms = document.querySelectorAll(".prodCard")
editForms.forEach((editForm) => {
    editForm.addEventListener("submit", sumbitHandler)
    editForm.reset()
})

function sumbitHandler(e) {
    e.preventDefault()
    const productId = parseInt(e.target.getAttribute("data-index"))
    const productIndex = products.findIndex((product) => product.id == productId)
    const data = e.target
    const name = data["name"].value
    const price = data["price"].value
    const stock = data["stock"].value
    const category = data["category"].value
    products[productIndex] = new Product(name, stock, productId, price, category)
    const cartIndex = carts.findIndex((cart) => cart.id == productId)
    if (cartIndex != -1) {
        carts[cartIndex] = { ...carts[cartIndex], name: products[productIndex].name, price: products[productIndex].price, stock: products[productIndex].stock, category: products[productIndex].category}
        console.log(carts[cartIndex])
        if (carts[cartIndex].amount > products[productIndex].stock) {
            carts[cartIndex].amount = products[productIndex].stock
        }
        localStorage.setItem("Cart", JSON.stringify(carts))
    }
    toastPop("Producto actualizado ✓", true)
    localStorage.setItem("ObjetoProductos", JSON.stringify(products))
    clearCartView()
    print()
}