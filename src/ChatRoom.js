import React from "react";
import Messages from "./Messages";
import Input from "./Input";
import PropTypes from "prop-types";

export default class ChatRooms extends React.Component {

  render() {
    const {mmbs, current, msgs, onSend} = this.props;
    return (
      <div className="chatContainer">
        <section>
          <Messages
            messages={msgs}
            currentMember={current}
          />
          <Input
            onSendMessage={onSend}
          />
        </section>
        <aside>
          <ul>
            {mmbs.map(member =>
              <li key={member.id}>
                {member.clientData.username}
              </li>
            )}
          </ul>
        </aside>
      </div>
      
    )
  }
}

ChatRooms.propTypes = {
  onSend: PropTypes.func.isRequired,
  current: PropTypes.object.isRequired,
  mmbs: PropTypes.arrayOf(PropTypes.object).isRequired,
  msgs: PropTypes.arrayOf(PropTypes.object).isRequired,
}