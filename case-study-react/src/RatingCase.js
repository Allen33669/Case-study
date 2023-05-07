import { Rating } from '@mui/material';
import { useState } from "react";

import Header from "./Header.js";
import "./Body.css";

const labels = {
  0.5: 'Score: 0.5',
  1: 'Score: 1',
  1.5: 'Score: 1.5',
  2: 'Score: 2',
  2.5: 'Score: 2.5',
  3: 'Score: 3',
  3.5: 'Score: 3.5',
  4: 'Score: 4',
  4.5: 'Score: 4.5',
  5: 'Score: 5',
  5.5: 'Score: 5.5',
  6: 'Score: 6',
  6.5: 'Score: 6.5',
  7: 'Score: 7',
  7.5: 'Score: 7.5',
  8: 'Score: 8',
  8.5: 'Score: 8.5',
  9: 'Score: 9',
  9.5: 'Score: 9.5',
  10: 'Score: 10',
};

export default function RatingCase(){
    const [value, setValue] = useState(2);
    const [hoverValue, setHoverValue] = useState(2);

	return(
		<>
		<Rating
        name="rating"
        value={value}
        precision={0.5}
        onChange={(event, value) => {
          setValue(value);
        }}
        onChangeActive={(event, hoverValue) => {
          setHoverValue(hoverValue);
        }}
        max={10} 
        size="large" 
      />
      <p style={{color:"var(--text-color33)"}}>{labels[hoverValue !== -1 ? hoverValue : value]}</p>
       </>
		);
}