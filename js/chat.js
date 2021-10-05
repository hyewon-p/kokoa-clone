const message = document.querySelector(".reply__column input");
const sendingForm = document.querySelector(".reply");
const messageBubble = document.querySelector(".message-row--own .message-row__content")

let messages = [];

function saveMessage(){
    localStorage.setItem("message", JSON.stringify(messages));
}

function sendMessage(sendingMessage){
    const div = document.createElement("div");
    div.className = "message__info";
    const span = document.createElement("span");
    span.className = "message__bubble";
    span.innerText = sendingMessage.text;
    const button = document.createElement("button");
    button.addEventListener("click", deleteMessage);
    button.className = "delButton";
    const resend = document.createElement("i");
    resend.className = "fas fa-redo-alt";
    const fix = document.createElement("i");
    fix.className = "fas fa-times";
    button.appendChild(resend);
    button.appendChild(fix);
    div.appendChild(span);
    div.appendChild(button);
    messageBubble.appendChild(div);
}

function deleteMessage(event){
    let message = event.target.parentElement;
    if(event.target !== this) {message = event.target.closest("div")};
    messages = messages.filter((message) => message.id !== parseInt(message.id));
    saveMessage();
    message.remove();
}

function handleMessage(event){
    event.preventDefault();
    const newMessage = message.value;
    message.value = "";
    const newMessageSending = {
        text : newMessage,
        id: Date.now(),
    }
    messages.push(newMessageSending);
    saveMessage();
    console.log(messages);
    sendMessage(newMessageSending);
}

sendingForm.addEventListener("submit", handleMessage);

const savedMessages = localStorage.getItem("message");

if(savedMessages){
    const parsedMessages = JSON.parse(savedMessages);
    messages = parsedMessages;
    parsedMessages.forEach((item)=>sendMessage(item));
}

