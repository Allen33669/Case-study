import { TextField } from '@mui/material';
import { useState } from "react";

import Header from "./Header.js";
import "./Body.css";

export default function InputValidationCase(){
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    function HandleInput(event){
      setValue(event.target.value);

      let value = event.target.value;
      let errorMessage = "";
      if (value.match(/[a-z]/)){
          errorMessage += "Message contains lower character. ";
      }

      if (value.match(/[A-Z]/)){
          errorMessage += "Message contains upper character. ";
      }

      if (value.match(/[0-9]/)){
          errorMessage += "Message contains number. ";
      }

      setError(errorMessage);

    }
 
	return(
		<TextField
		  id = "InputValidationCase" 
          label="Message"
          helperText={error} 
          onChange={HandleInput}
          placeholder="please enter your message" 
          value={value}
        />
		);
}

