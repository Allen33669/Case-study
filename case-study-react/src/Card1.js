import "./Card1.css";
import { Button, Card, CardActions, CardContent } from '@mui/material';

export default function Card1(props){
    let cardName = props.href;
    let cardName2 = "";
    let start = 0;

    for (let i = 1; i < cardName.length; i++){
      let char = cardName.charAt(i);

      if (char == char.toUpperCase()){
          cardName2 +=  cardName.slice(start, i) + " ";
          start = i;
      }
    }

    cardName2 +=  cardName.slice(start, cardName.length);

	return(
        <Card sx={{width : "100%", height : "100%"}}>
        <CardContent><p>{cardName2}</p></CardContent>
        <CardActions>
        <Button variant="contained" href={props.href}>look at it!</Button>
        </CardActions>
        </Card>
		);
}