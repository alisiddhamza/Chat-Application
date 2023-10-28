const socket =io('http://localhost:8000');

const form =document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer=document.querySelector('.container');

var audio = new Audio('tone.mp3');

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerHTML=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.appendChild(messageElement);
    if(position=='left')
    audio.play();
};
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value = '';
})

const name1 = prompt("Enter your name to join the chat");
socket.emit('new-user-joined',name1);

socket.on('user-joined',name1 =>{
    append(`${name1} joined the chat`,'left');
});

socket.on('receive',data =>{
    append(`${data.name}:${data.message}`,'left');
});
socket.on('left',name =>{
    append(`${name} left the chat`,'left');
});
