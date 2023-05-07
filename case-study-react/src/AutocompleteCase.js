import { Autocomplete, TextField} from '@mui/material';

import Header from "./Header.js";
import "./Body.css";



const optionsTest = [];
let char1, char2;
for (let i = 0; i < 50; i++){
	char1 = "";
	char2 = "";

    if ((65 + i) <= 90) {
      char1 = String.fromCharCode(65 + i);
    }else{
      char1 = String.fromCharCode(65 + i - 26);
      char2 = char1;
    }
	
	let nameString = char1 + char2;

	optionsTest.push({id: i, label: nameString});
}

export default function AutocompleteCase(){
	return(
		<Autocomplete id="AutocompleteCase" options={optionsTest} renderInput={(params) => <TextField {...params} label="Name" />} />
		);
}


