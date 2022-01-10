import {Component} from "react";
import React from "react";
let uniqueId = 0;

class Messages extends Component {
  render() {
    const {messages} = this.props;
    return (
      <ul className="allMessages">
        {messages.map(m =>this.renderMessage(m))}
      </ul>
    );
  }

  renderMessage(message) {
    const {member, txt} = message;
    const {currentMember} = this.props;
    const messageFromCurrentMember = member.id === currentMember.id;
    const className = messageFromCurrentMember ?
      "oneMessage oneMessageCurrentMember" : "oneMessage oneMessageAnyMember";
    return (
      <li key = {uniqueId++} className={className}>
        <div className="avatar" style={{backgroundColor: member.clientData.color}}/>
        <div>
          <div className="username">
            {member.clientData.username}
          </div>
          <div className="textMessage">{txt}</div>
        </div>
      </li>
    );
  }
}

export default Messages;
