// src/components/chat.js

export class Chat {
    constructor() {
        this.messages = [];
        this.init();
    }

    init() {
        // Initialize chat functionality
        this.render();
        this.setupListeners();
    }

    setupListeners() {
        const sendButton = document.getElementById('send-button');
        sendButton.addEventListener('click', () => this.sendMessage());
    }

    sendMessage() {
        const messageInput = document.getElementById('message-input');
        const message = messageInput.value;
        if (message) {
            this.messages.push(message);
            messageInput.value = '';
            this.render();
        }
    }

    render() {
        const chatWindow = document.getElementById('chat-window');
        chatWindow.innerHTML = this.messages.map(msg => `<div class="message">${msg}</div>`).join('');
    }
}