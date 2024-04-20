const userContainer = document.querySelector('#userContainer')
const searchUser = document.querySelector('#searchUser')


class Message {
    constructor(users, messages) {
        this.users = users;
        this.messages = messages;
    }

    userUi(user) {

        let lastMessage = this.getLastMessage(user.id)

        return `
            <div class="flex items-center space-x-[10px] cursor-pointer">
                <figure class="size-[75px] rounded-full border-2 border-gray-400 overflow-hidden">
                    <img src="./assets/images/${user.photo}" class="size-full object-cover" alt="">
                </figure>
                <div>
                    <div class="font-bold text-[16px]">${user.name}</div>
                    <div class="flex text-sm text-gray-400">${lastMessage}</div>
                </div>
            </div>
        `
    }




    displayUsers(search = ''){
        const obj = this
        let html = ''
        this.users.forEach((user) => {
            if(user.id !== 6) {
                if(search && user.name.toLowerCase().includes(search.trim())) {
                    html += obj.userUi(user) 
                }
                else if(!search)
                html += obj.userUi(user) 
            }
        })


        userContainer.innerHTML = html
    }


    getLastMessage(id) {
        let lastMessage = ''
        this.messages.forEach((message) => {
            if((message.sendId === id || message.receiverId === id) && (message.sendId === 6 || message.receiverId === 6)){
            lastMessage = message.text
        }
        })
        return lastMessage
    }



    



}
const message = new Message(users, messages)


message.displayUsers()

searchUser.addEventListener('keyup', (e) => {
    message.displayUsers(e.target.value)
})

