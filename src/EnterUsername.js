import React, {useState} from "react";
import PropTypes from "prop-types";
let enb = true;

export default function EnterUsername({onUsernameSubmit, onUsernameCancel}) {
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

  const handleCancel = () => {
    onUsernameCancel();
    enb = true;
  }

  return (
    <form className="formContainer" onSubmit = {handleSubmit}>
      <label> Unesi svoj nadimak za CHAT 
        <input  className="input" type="text" placeholder="nadimak" value={username} onChange={handleUsernameChange}/>
      </label> 
      <input className ="button" type="submit" disabled = {!enb} value="PRIJAVA"/>
      <input className ="button" type='button' disabled = {enb} value="ODJAVA" onClick={handleCancel}/>
    </form>
  );
}

EnterUsername.propTypes = {
  onUsernameSubmit: PropTypes.func.isRequired,
  onUsernameCancel: PropTypes.func.isRequired
}