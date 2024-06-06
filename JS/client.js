const socket = io('http://localhost:8000')
const form = document.getElementById('senderOfmessage')
const messageInput = document.getElementById('messageValInp')
const messageContainer = document.querySelector('.container')




const name = prompt("Enter your name to enter in chat:");
socket.emit('new-userJoined', name)

const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('Message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)

}
socket.on('userJoined', name=>{
    append(`${name} Joined the chat`, 'right')
})


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You Sended :${message}`,'right');
    socket.emit('send', message);
    messageInput.value='';
})





socket.on('recieve', data=>{
    append(`${data.message} :${data.name}`, 'left')
})