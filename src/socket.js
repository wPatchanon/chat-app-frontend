const io = require('socket.io-client')

export default function () {
    const socket = io.connect('http://172.20.10.5:3000')

    function registerHandler(onMessageReceived) {
        socket.on('message', onMessageReceived)
    }

    function getMessages(username, roomID, cb) {
        socket.emit('getMessages', { username, roomID }, cb)
    }

    function unregisterHandler(username, msg) {
        socket.off('message')
        if (msg) socket.emit('exit', username, msg)
    }

    function updateGroup(onMessageReceived) {
        socket.on('group', onMessageReceived)
    }

    function newGroup(room, cb) {
        socket.emit('newGroup', room, cb)
    }

    socket.on('error', function (err) {
        console.log('received socket error:')
        console.log(err)
    })

    function register(name, cb) {
        socket.emit('register', name, cb)
    }

    function join(username, chatroomName, cb) {
        socket.emit('join', { username: username, roomID: chatroomName }, cb)
    }

    function leave(chatroomName, cb) {
        socket.emit('leave', chatroomName, cb)
    }

    function message(chatroomName, msg, cb) {
        socket.emit('message', msg, cb)
    }

    function getChatrooms(cb) {
        socket.emit('chatrooms', null, cb)
    }

    function getAvailableUsers(cb) {
        socket.emit('availableUsers', null, cb)
    }

    //function newGroup(cb)

    return {
        register,
        join,
        leave,
        message,
        getChatrooms,
        getAvailableUsers,
        registerHandler,
        unregisterHandler,
        updateGroup,
        newGroup,
        getMessages
    }
}