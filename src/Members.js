import React from "react";

export default function Members ({currentMember, members}) {
  return(
    <ul className="allMembers">
      {members.map(member => 
        <li key={member.id} className="oneMember">
          <div
            className={member.id === currentMember.id? "currentMemberAvatar":"anyMemberAvatar"}
            style={{backgroundColor: member.clientData.color}}/>
          <div
            className="usernameMember"
            style={member.id === currentMember.id? {fontWeight: "bold"}:{fontWeight: "normal"}}>
            {member.clientData.username}
          </div>
        </li>
      )}
    </ul>
  );
}