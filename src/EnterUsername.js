import React, {useState} from "react";
import PropTypes from "prop-types";
let enb = true;

export default function EnterUsername({onUsernameSubmit, onUsernameLeave}) {
  const [username, setUsername] = useState("");

  const handleUsernameChange = e => {
    const trimStart = e.target.value.trimStart();
    setUsername(trimStart);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimEnd = username.trimEnd();
    if (trimEnd) {
      onUsernameSubmit(trimEnd);
      setUsername("");
      enb = false;
    }
  };

  const handleLeave = () => {
    onUsernameLeave();
    enb = true;
  }

  return (
    <div className="containerEnterUsername">
      <form onSubmit = {handleSubmit}>
        <label htmlFor="nickname">Unesi svoj nadimak za CHAT</label> <br/>
        <input className="inputClass" id="nickname" type="text" placeholder="nadimak" value={username} onChange={handleUsernameChange}/>
        <input className ="buttonClass" type="submit" disabled = {!enb} value="PRIJAVA"/>
        <input className ="buttonClass" type='button' disabled = {enb} value="ODJAVA" onClick={handleLeave}/>
      </form>
    </div>
  );
}

EnterUsername.propTypes = {
  onUsernameSubmit: PropTypes.func.isRequired,
  onUsernameLeave: PropTypes.func.isRequired
}