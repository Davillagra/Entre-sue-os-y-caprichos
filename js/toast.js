function toastPop(message,value) {
    if(value) {
        Toastify({
            text: message,
            className: "info",
            offset: {
                x: "5em",
                y: "7.5rem"
            },
            style: {
                borderRadius: "5px",
                background: "linear-gradient(to right, #013f01, #02bd02)"
            }
        }).showToast()
    }else {
        Toastify({
            text: message,
            className: "info",
            offset: {
                x: "5em",
                y: "7.5rem"
            },
            style: {
                borderRadius: "5px",
                background: "linear-gradient(to right, #fb6f92, #ff7f50)"
            }
        }).showToast()
    }
}