const socket = io();

var output = document.getElementById('output');
var message = document.getElementById('message');


window.onload = function(){
    document.getElementById('chat-box').style.visibility = 'hidden';
    document.getElementById('chat-info').style.visibility = 'hidden';
    document.getElementById('handler').style.visibility = 'hidden';
}


function setRoomName(){
    const roomID = document.getElementById('roomID').value;
    const userName = document.getElementById('userName').value;

    socket.emit('set_room',{
        roomID,
        userName
    });

    document.getElementById('roomID').value = '';
    document.getElementById('userName').value = '';
    document.getElementById('input-box').remove();
    document.getElementById('chat-box').style.visibility = 'visible';
    document.getElementById('chat-info').style.visibility = 'visible';
    document.getElementById('chat-user').innerHTML = '<strong>User : </strong>'+userName;
    document.getElementById('chat-room').innerHTML = '<strong>Room : </strong>'+roomID;
    document.getElementById('handler').style.visibility = 'visible';

    
    return false;
}



function emitMessage(){
    const message = document.getElementById('message').value;
    socket.emit('message',message);
    document.getElementById('message').value = '';
    return false;
}


message.addEventListener('keypress',()=>{
    socket.emit('typing',' is typing');
});


socket.on('typing',data=>{
    document.getElementById('typing_status').innerHTML = data;
});

socket.on('message',(data)=>{
    output.innerHTML += '<p><strong>'+data.userName +' : </strong>'+data.msg+'</p>';
    document.getElementById('typing_status').innerHTML = '';
});





socket.on('user_count',data=>{
    document.getElementById('client_count').innerHTML = '<strong>'+data +'</strong>'+ ' user connected to the room';
});