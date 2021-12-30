import React from "react";
import Messages from "./Messages";
import Input from "./Input";

export default class ChatRooms extends React.Component {

  render() {
    const {members, currentMember, messages, onSendMessage} = this.props;
    return (
      <div className="main">
        <section>
          <Messages
            messages={messages}
            currentMember={currentMember}
          />
          <Input
            onSendMessage={onSendMessage}
          />
        </section>
        <aside>
          <ul>
            {members.map(member =>
              <li
                key={member.id}
              >
                {member.clientData.username}
              </li>
            )}
          </ul>
        </aside>
      </div>
      
    )
  }
}