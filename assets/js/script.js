const userContainer = document.querySelector('#userContainer')
const searchUser = document.querySelector('#searchUser')
const userConvoName = document.querySelector('#userConvoName')
const messageArea = document.querySelector('#messageArea')
const messageInput = document.querySelector('#messageInput')
const chatArea = document.querySelector('#chatArea')


class Message {
    constructor(users, messages) {
        this.users = users;
        this.messages = messages;
    }

    userUi(user) {

        let lastMessage = this.getLastMessage(user.id)

        return `
            <div class="flex items-center space-x-[10px] cursor-pointer js-item" data-id="${user.id}">
                <figure class="size-[75px] rounded-full border-2 shrink-0 border-gray-400 overflow-hidden">
                    <img src="./assets/images/${user.photo}" class="size-full object-cover" alt="">
                </figure>
                <div>
                    <div class="font-bold text-[16px]">${user.name}</div>
                    <div class="flex text-sm text-gray-400">${lastMessage}</div>
                </div>
            </div>
        `
    }




    displayUsers(search = '') {
        const obj = this
        let html = ''
        this.users.forEach((user) => {
            if (user.id !== 6) {
                if (search && user.name.toLowerCase().includes(search.trim())) {
                    html += obj.userUi(user)
                }
                else if (!search)
                    html += obj.userUi(user)
            }
        })


        userContainer.innerHTML = html
    }


    getLastMessage(id) {
        let lastMessage = ''
        this.messages.forEach((message) => {
            if ((message.sendId === id || message.receiverId === id) && (message.sendId === 6 || message.receiverId === 6)) {
                lastMessage = message.text
            }
        })
        return lastMessage
    }



    displayMessages(userId) {
        messageArea.innerHTML = ''
        let html = ''
            this.messages.forEach((message) => {
                if (parseInt(userId) === message.sendId && message.receiverId === 6)
                    html += `
                    <div class="flex">
                        <div class="flex w-[400px] gap-[15px]">
                            <figure  class="size-[50px] shrink-0 rounded-full border-2 border-gray-400 overflow-hidden">
                                <img src="./assets/images/${this.users[userId-1].photo}" class="size-full object-cover" alt="">
                            </figure>
                            <div class="bg-[#476CFF] p-4 rounded-2xl text-white">${message.text}</div>
                        </div>
                    </div>
                    `
                else if(parseInt(userId) === message.receiverId && message.sendId === 6)
                html += `
                <div class="flex justify-end">
                    <div class="flex w-[400px] flex-row-reverse gap-[15px]">
                        <figure  class="size-[50px] shrink-0 rounded-full border-2 border-gray-400 overflow-hidden">
                            <img src="./assets/images/spngebob.jpg" class="size-full object-cover" alt="">
                        </figure>
                        <div class="bg-[#476CFF] p-4 rounded-2xl text-white">${message.text}</div>
                    </div>
                </div>
                `

            })

        messageArea.innerHTML += html

    }



    displayConvoSide(userId) {
        let u = ''
        this.users.forEach((user) => {
            if (user.id === parseInt(userId))
                u = user

        })
        userConvoName.innerHTML = `
            <div class="flex items-center justify-between h-[70px]">
                <div class="flex items-center justify-between space-x-[15px]">
                    <figure class="size-[70px] rounded-full border-2 border-gray-400 overflow-hidden">
                        <img src="./assets/images/${u.photo}" class="size-full object-cover" alt="">
                    </figure>
                    <div class="text-[32px] font-bold">${u.name}</div>
                </div>
           </div>
        `
    }


    addInputBtn() {
        chatArea.innerHTML = ''
        chatArea.innerHTML += `
        <div class="h-[60px] bg-[#E2E2E2] flex items-center rounded-full overflow-hidden">
                <input id="messageInput" type="text" placeholder="Message" class="h-full bg-transparent outline-none w-full px-[20px]">
           </div>
        `
    }

    addNewMessage(object) {
        this.messages.push(object)
        
        this.displayMessages(object.receiverId)
    }


}
const message = new Message(users, messages)


message.displayUsers()

searchUser.addEventListener('keyup', (e) => {
    message.displayUsers(e.target.value)
})





let currentUserId = null;
let chatAreaKeyupListener = null;

userContainer.addEventListener('click', (e) => {
    let item = e.target.closest(".js-item");
    let id = '';

    if (item) {
        id = item.getAttribute('data-id');
        currentUserId = parseInt(id); 
        message.displayMessages(currentUserId);
        message.displayConvoSide(currentUserId);
    }

    message.addInputBtn();



    if (chatAreaKeyupListener) {
        chatArea.removeEventListener('keyup', chatAreaKeyupListener);
    }


    chatAreaKeyupListener = (e) => {
        if (e.keyCode === 13) {
            let object = {
                sendId: 6, 
                receiverId: currentUserId,
                text: e.target.value
            };

       
            message.addNewMessage(object);

          
            e.target.value = '';
        }
    };

 
    chatArea.addEventListener('keyup', chatAreaKeyupListener);
});




