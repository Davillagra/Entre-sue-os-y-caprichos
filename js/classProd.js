class Product {
    constructor(name, stock, id, price, category, date, discount) {
        this.name = name
        this.stock = stock
        this.id = id
        this.date = new Date().toISOString()
        this.price = price
        this.category = category
    }
    discountPrice(discount) {
        const discPrice = this.price - (this.price * (discount / 100))
        return discPrice
    }
}
class Message {
    constructor(id,name, lastName, eMail,letter,promotions) {
        this.id = id
        this.name = name
        this.lastName = lastName
        this.eMail = eMail
        this.letter = letter
        this.promotions = promotions
        this.date = new Date().toISOString()      
    }
}