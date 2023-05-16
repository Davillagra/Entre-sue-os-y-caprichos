const carts = JSON.parse(localStorage.getItem("Cart")) || []
const productsString = JSON.parse(localStorage.getItem("ObjetoProductos")) || []
const products = []
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

function printCart(card) {
        const fixedCardPrice = card.price * card.amount
        const productCard = document.createElement("div")
        productCard.className = "prodCard"
        productCard.innerHTML = `
        <div class="imgCart"><img src="../../img/productos/setposavasomadera.jpeg" class="img-fluid rounded"></div>
        <div class="prodInfo">
        <h2 class="">${card.name}</h2>
        <span class="">Cantidad: ${card.amount}</span><p class="priceStyle">$${fixedCardPrice}</p>
        </div>
        <div class="buttonForm">
        <input class="btn btn-outline-success1 aFormat2" type="number" placeholder="1" name="amount" min="1" max="${card.amount}" required><button class="btn btn-outline-success1 aFormat2 removeElement" data-index="${card.id}">Quitar del carro</button>
        <button class="btn btn-outline-success1 aFormat2 removeCard" data-index="${card.id}">Eliminar todos</button>
        </div>
        `
        container.append(productCard)
}

const container = document.getElementById("prodCards")
carts.forEach((card) => {
    printCart(card)
})
function print() {
    carts.forEach((card) => {
        printCart(card)
    })
}
function clearCartView() {
    container.innerHTML = "";
}

container.addEventListener(("click"), (e) => {
    if (e.target.classList.contains("removeElement")) {
        const productId = parseInt(e.target.getAttribute("data-index"))
        const productIndex = carts.findIndex((cart) => cart.id == productId)
        const data = e.target.parentElement.children
        const dataAmount = parseInt(data["amount"].value) || 1
        console.log(carts[productIndex].amount)
        console.log(dataAmount)
        if (dataAmount == carts[productIndex].amount) {
            e.target.parentElement.parentElement.remove()
            carts.splice(productIndex, 1)
        } else {
            carts[productIndex].amount = carts[productIndex].amount - dataAmount
        }
        toastPop("Se removieron " + dataAmount + " productos", false)
        localStorage.setItem("Cart", JSON.stringify(carts))
        clearCartView()
        print()
    }
    if (e.target.classList.contains("removeCard")) {
        const productId = parseInt(e.target.getAttribute("data-index"))
        const productIndex = carts.findIndex((cart) => cart.id == productId)
        carts.splice(productIndex, 1)
        toastPop("Producto eliminado", false)
        localStorage.setItem("Cart", JSON.stringify(carts))
        e.target.parentElement.parentElement.remove()
    }
})