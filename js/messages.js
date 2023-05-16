//import { toastPop } from "./toast.js"
let messageIdCount = parseInt(localStorage.getItem("MessageIdCount")) || 0
const message = JSON.parse(localStorage.getItem("Message")) || []

const contactForm = document.getElementById("contactForm")
contactForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const data = e.target.elements
    const name = data["name"].value
    const lastName = data["lastName"].value
    const eMail = data["eMail"].value
    const letter = data["letter"].value
    const promotions = data["promotions"].checked
    message.push(new Message(messageIdCount,name,lastName,eMail,letter,promotions))
    toastPop("Mensaje enviado! ✓",true)
    messageIdCount ++
    console.log(message)
    contactForm.reset()
    localStorage.setItem("Message", JSON.stringify(message))
    localStorage.setItem("MessageIdCount", messageIdCount)
})

console.log(message)