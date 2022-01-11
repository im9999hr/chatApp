import React from "react";
import Messages from "./Messages";
import Input from "./Input";
import PropTypes from "prop-types";
import Members from "./Members";

export default class ChatRoom extends React.Component {

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
          <Members
            members={mmbs}
            currentMember={current}
          />
        </aside>
      </div>
      
    )
  }
}

ChatRoom.propTypes = {
  onSend: PropTypes.func.isRequired,
  current: PropTypes.object.isRequired,
  mmbs: PropTypes.arrayOf(PropTypes.object).isRequired,
  msgs: PropTypes.arrayOf(PropTypes.object).isRequired,
}