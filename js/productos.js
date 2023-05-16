const productsString = JSON.parse(localStorage.getItem("ObjetoProductos")) || []
let idCount = parseInt(localStorage.getItem("idCount")) || 3
const carts = JSON.parse(localStorage.getItem("Cart")) || []

const products = []
productsString.forEach(pushProducts)
function pushProducts(product) {
    products.push(new Product(
        product.name,
        product.stock,
        product.id,
        product.price,
        product.category,
        product.date
    ))
}

function printProducts(product) {
    const productCard = document.createElement("div")
    productCard.className = "prodCard"
    productCard.innerHTML = `
    <div><img src="../../img/productos/setposavasomadera.jpeg" class="img-fluid rounded"></div>
    <div class="prodInfo">
    <h2 class="">${product.name}</h2>
    <span class="">Quedan: ${product.stock}</span><p class="priceStyle">$${product.price}</p>
    </div>
    <div class="buttonForm">
    <input class="btn btn-outline-success1 aFormat2" type="number" placeholder="1" name="amount" min="1" max="${product.stock}" required><button class="btn btn-outline-success1 aFormat2 addCart" data-index="${product.id}">Añadir al carrito</button>
    </div>
    `
    container.append(productCard)
}

const container = document.getElementById("prodCards")
products.forEach((product) => {
    printProducts(product)
})

container.addEventListener(("click"), (e) => {
    if (e.target.classList.contains("addCart")) {
        const productId = parseInt(e.target.getAttribute("data-index"))
        const productIndex = products.findIndex((product) => product.id == productId)
        const data = e.target.parentElement.children
        console.log((data["amount"].value))
        const amount = parseInt(data["amount"].value) || 1
        const cartIndex = carts.findIndex((cart) => cart.id == productId)
        if (carts[cartIndex] == undefined) {
            const modifiedProd = { ...products[productIndex], amount: amount }
            carts.push(modifiedProd)
        } else {
            if ((carts[cartIndex].amount + amount) > products[productIndex].stock) {
                toastPop("No puedes añadir mas productos de los existentes", false)
                return // Detengo la funcion solo en este caso
            } else {
                carts[cartIndex].amount += amount
            }
        }
        toastPop("Añadiste " + amount + " productos al carro ✓", true)
        localStorage.setItem("Cart", JSON.stringify(carts))
    }
})