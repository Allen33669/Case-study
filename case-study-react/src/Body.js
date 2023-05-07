import "./Body.css";
import Grid from '@mui/material/Unstable_Grid2';
import { Paper } from '@mui/material';

import Card1 from "./Card1.js";

function CardComponent(props){
  return(
  		<Grid xs={6} sm={6} lg={4}>
  		<Paper elevation={3}  sx={{m: 1, mt: 3, mb: 3}}>
		<Card1 href={props.caseName} />
		</Paper>
		</Grid>		
  	);
}



export default function Body(){
	return(
		<div className="body">
		<Grid container rowSpacing={5} columnSpacing={3}>
		<CardComponent caseName="HooksCase" />
		<CardComponent caseName="TableCase" />
		<CardComponent caseName="AutocompleteCase" />
		<CardComponent caseName="RatingCase" />
		<CardComponent caseName="InputValidationCase" />
		<CardComponent caseName="AvatarCase" />
		</Grid>
		</div>
		);
	}