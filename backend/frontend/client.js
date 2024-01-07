const socket = io()

//////////---Take the User name---////////

let Name;

do {
    Name = prompt("Enter your name: ")
} while (!Name)


////////////////----Message-Area---/////////////////

const messageArea = document.querySelector(".msg_area")
let textArea = document.querySelector("#msg")

textArea.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        sendMessage(e.target.value)
        textArea.value = ''
    }
})



const sendMessage = (message) => {
    let msg = {
        user: Name,
        messageParagraph: message.trim()
    }

    ////---Append
    appendMessage(msg, 'incoming_msg')
    AutoScroll()
    /////---Send to Server---////////

    socket.emit('message', msg)
}



const appendMessage = (msg, type) => {
    let mainDiv = document.createElement("div")
    let className = type;
    mainDiv.classList.add(className, "message")

    let markup = ` <h2>${msg.user}</h2>
    <p>${msg.messageParagraph}</p>`

    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv)
}


//////---Received Mesaage---///////

socket.on('message', (msg) => {
    appendMessage(msg, "outgoing_msg")
    AutoScroll()
})

////////---Auto Scroll to message---/////

const AutoScroll = () => {
    messageArea.scrollTop = messageArea.scrollHeight
}