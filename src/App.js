import React, {useState} from "react";
import "./App.css";
import EnterUsername from "./EnterUsername";
import ChatRoom from "./ChatRoom";

const PageChatRoom = "PAGE_CHATROOM";
let drone = {};

/* Because of unknown reason 'members' state variable was not possible to read (always had initial state) e.g. not 
possible to read in chatRoom.on('members'),
even 'members' was correctly displayed in html part when rendering. Also function setMembers worked properly (checked in html when rendering).
As a workaround it is used 'helpArray' variable that keep value contained in 'members' variable and 
'helpArray' is possible to read and use (e.g. in chatRoom.on('members')).
Same is done for 'messages'i.e. 'helpMessages' is additionally created. */

let helpArray, helpMessages = [];
let currentMember = {};

function randomColor() {
  let x = Math.random() * 0xFFFFFF;
  let y = Math.floor(x);
  let c = "#" + y.toString(16);
  return c;
}

function scrollToDown (className) {
  const chatMessage = document.querySelector("." + className);
  chatMessage.scrollTop = chatMessage.scrollHeight; // to avoid manual scrolling when new message appear (works also for list of members when new member appear)
}

function App() {
  const [page, setPage] = useState("");
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  
 
  const handleUsernameSubmit = u => {
    setPage(PageChatRoom);
    currentMember.username = u;
    currentMember.color = randomColor();

    drone = new window.Scaledrone("8la9N2dxGlbbMLdw", {
        data: {username:currentMember.username, color:currentMember.color}
       });

    drone.on("open", error => {
      if (error) {
        return console.error(error);
      }
      currentMember.id = drone.clientId;
    });

    const chatRoom = drone.subscribe("observable-ChatRoom"); 
    
    chatRoom.on('data', (text, memb) => {
      //const newMessages = [...messages];
      const newMessages = [...helpMessages];
      newMessages.push({member: memb, txt: text}); //here is defined object structure for one message (used latter in Messages.js)
      helpMessages = [...newMessages];
      setMessages(newMessages);
      scrollToDown("allMessages");
    });
    /* 
    Explanation for chatRoom.on('data', (text, memb)...
    - 'memb' (can be any name here) attribute is the same type as 'data' property defined in drone = new window.Scaledrone
    - here 'memb' defines sender of message, because 'data' event is triggered when message arrive from sender
    - object structure of 'memb' is:
     {
      id: "id from sender (same as drone.clientId from sender)",
      clientData: {
        username: "username from sender",
        color: "color from sender"
      }
     }
    - 'text' (can be any name here) attribute is the same as 'message' property defined in drone.publish
    */

    chatRoom.on('members', m => {
      //m is array of objects
      setMembers(m);
      helpArray = [...m];
      //helpArray = m.map(obj => {return {...obj}}); (sometimes this way is necessary for array of objects, it is not working with [...obj])
      scrollToDown("allMembers");
     });

     chatRoom.on('member_join', m => {
        //m is object
        const newMembers = [...helpArray];
        newMembers.push(m);
        helpArray = [...newMembers];
        setMembers(newMembers);
        scrollToDown("allMembers");
     });

     chatRoom.on('member_leave', m => {
      //m is object
      const newMembers = helpArray.filter(member => member.id !== m.id);
      helpArray = [...newMembers];
      setMembers(newMembers);
     });

  };

  const handleUsernameLeave = () => {
    setPage("");
    setMembers([]);
    setMessages([]);
    helpMessages = [];
    drone.close();
  };

  const sendMessage = txt => {
    if (txt === "") txt = " ";
    drone.publish({
      room: "observable-ChatRoom",
      message: txt //here also some object is possible to define, not only string as now (now same message will be received in 'data' event)
    });
  }

  return (
    <div className="app">
      <header className="app-header">
        <img src="https://dashboard.scaledrone.com/img/logo_rgb.svg" className="app-logo" alt="logo"/>
        <div className="title-header">Chat aplikacija</div>
      </header>
      <main>
        <EnterUsername onUsernameSubmit = {handleUsernameSubmit} onUsernameLeave = {handleUsernameLeave}/>
        {page===PageChatRoom && <ChatRoom current = {currentMember} mmbs = {members} msgs = {messages} onSend = {sendMessage}/>}
      </main>
    </div>
  );
}

export default App;
