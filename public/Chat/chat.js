var form = document.getElementById('chat-form');

form.addEventListener('submit', SaveToBackend);

async function SaveToBackend(event) {
    event.preventDefault();
    const message = event.target.chatmessage.value;
    const obj = {
        message
    }
    try {
        const token = localStorage.getItem('token');
        await axios.post("http://localhost:3000/message/add-message", obj, { headers: { "Authorization": token } })
        .then(() => {
            document.getElementById("inputmessage").value = "";
        })
       
    } catch (error) {
        document.body.innerHTML += `<h2>${error}</h2>`;
        console.log(error);
    }
}



window.addEventListener("DOMContentLoaded", () => {

    const localStorageData = JSON.parse(localStorage.getItem("Messages"));
    console.log(localStorageData)
    let lastMessageId;
    if (localStorageData == null) {
        lastMessageId = 0;
    } else {
        lastMessageId = localStorageData[localStorageData.length - 1].id;
    }
    let mergeMessage = [];
    console.log(lastMessageId)

    axios.get(`http://localhost:3000/message/get-messages?id=${lastMessageId}`) 
    .then((response) => {

        if (response.data.allMessages.length > 0) {

          if (localStorageData) {
            mergeMessage = localStorageData.concat(response.data.allMessages);
          
          } else {
            mergeMessage = response.data.allMessages;
          }
          if (mergeMessage.length > 10) {
            let messagesToremove = mergeMessage.length - 10;
            for (let i = 0; i < messagesToremove; i++) {
                mergeMessage.shift();
            }
          }
          
        } else {
          mergeMessage = JSON.parse(localStorage.getItem("Messages"));
        }
        localStorage.setItem("Messages", JSON.stringify(mergeMessage));
  
        const messageBox = document.getElementById("messages");
        messageBox.innerHTML = "";
        messageBox.innerHTML = "<h1>Messages:</h1>";
  
        for (let i = 0; i < mergeMessage.length; i++) {
          const msgdiv = document.createElement("div");
          msgdiv.classList.add("msgdiv");
          const name = document.createElement("div");
          name.innerHTML = `<p>${mergeMessage[i].name} :</p>`;
          name.style.textDecoration ='underline';
          msgdiv.appendChild(name);
          const message = document.createElement("div");
          message.innerHTML = `<p>${mergeMessage[i].message}</p>`;
          message.style.fontStyle='italic';
          msgdiv.appendChild(message);
          messageBox.appendChild(msgdiv);
        }
    })
    .catch((err) => {
        console.log(err);
    });  
})

// setInterval(() =>{
//     const localStorageData = JSON.parse(localStorage.getItem("Messages"));
//     let lastMessageId;
//     if (localStorageData == null) {
//         lastMessageId = 0;
//     } else {
//         lastMessageId = localStorageData[localStorageData.length - 1].id;
//     }
//     let mergeMessage = [];

//     axios.get(`http://localhost:3000/message/get-messages?id=${lastMessageId}`) 
//     .then((response) => {

//         if (response.data.allMessages.length > 0) {

//           if (localStorageData) {
//             mergeMessage = localStorageData.concat(messages.data);
//           } else {
//             mergeMessage = response.data.allMessages;
//           }
//           if (mergeMessage.length > 10) {
//             let messagesToremove = mergeMessage.length - 10;
//             for (let i = 0; i < messagesToremove; i++) {
//                 mergeMessage.shift();
//             }
//           }
          
//         } else {
//           mergeMessage = JSON.parse(localStorage.getItem("Messages"));
//         }
//         localStorage.setItem("Messages", JSON.stringify(mergeMessage));
  
//         const messageBox = document.getElementById("messages");
//         messageBox.innerHTML = "";
//         messageBox.innerHTML = "<h1>Messages:</h1>";
  
//         for (let i = 0; i < mergeMessage.length; i++) {
//           const msgdiv = document.createElement("div");
//           msgdiv.classList.add("msgdiv");
//           const name = document.createElement("div");
//           name.innerHTML = `<p>${mergeMessage[i].name} :</p>`;
//           name.style.textDecoration ='underline';
//           msgdiv.appendChild(name);
//           const message = document.createElement("div");
//           message.innerHTML = `<p>${mergeMessage[i].message}</p>`;
//           message.style.fontStyle='italic';
//           msgdiv.appendChild(message);
//           messageBox.appendChild(msgdiv);
//         }
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// }, 10000);
