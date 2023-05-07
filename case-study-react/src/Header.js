import { useContext } from "react";
import { Tooltip } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import "./Header.css";

export default function Header(props){
    const display = useContext(props.displayContext);

	return(
		<Grid container>
		<Grid xs={12} sm={8} smOffset={2} lg={6} lgOffset={3}>
        <div className="header">
            <Tooltip title="Go to main page" arrow><a href="/"><h1>Case study react</h1></a></Tooltip>
            {display ? <h2>Some interesting react gadgets</h2> : <h2>The useContext hook is opened</h2>}
        </div>
        </Grid>
        </Grid>
		);
}
