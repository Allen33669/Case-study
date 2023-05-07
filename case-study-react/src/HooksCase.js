import { useState, useContext, useEffect, useRef, useCallback, useMemo } from "react";
import { Button } from '@mui/material';



let renderNum = 0;
let openUseMemo = true;

export default function HooksCase(props){
	

	const [effectNumber, setEffectNumber] = useState(0);
	const [noEffectNumber, setNoEffectNumber] = useState(0);
	const [useMemoNumber, setUseMemoNumber] = useState(0);

    const ref = useRef(0);

    const testUseMemo = useMemo(() => {
    	expensiveFunction();
    }, [useMemoNumber]);


    //useContext case with Header.js
	function SetDisplay(){
		props.setDisplay(!props.display);
	}

    //useEffect case
    useEffect(() => {
        setTimeout(() => {
        	setEffectNumber(effectNumber + 1);
        }, 1500);
      }, []);

    setTimeout(() => {
        	setNoEffectNumber(noEffectNumber + 1);
        }, 1500);

    //useRef case
    function handleRef(){
    	ref.current++;
    }
 
    //useMemo case
    renderNum++;

    function expensiveFunction (){
      let i = 0;
      while(i < 3900000000) i++;
      return i;
    }

    function ExpensiveFunction(){
      let i = expensiveFunction();
      return(
        <>
        <h1>ExpensiveFunction: {i}</h1>
        </>
      	);
    }

    function setUseMemoNumber1(){
    	setUseMemoNumber(useMemoNumber + 1);
    }

    function handleUseMemo(){
    	openUseMemo = !openUseMemo;
    }

	return(
		<>
		<h1>{`Total render number in this page: ${renderNum}`}</h1>
		<Button variant="contained" onClick={SetDisplay} sx={{m: 1}}>Press it and see the header above, also see the number below! It will trigger expensiveFunction in useMemo, too</Button>
		<h1>useEffect once: {effectNumber}</h1>
		<h1>no useEffect: {noEffectNumber}</h1>
		<Button variant="contained" onClick={handleRef} sx={{m: 1}}>Press it several times and see the number below, wait few seconds, see it again!</Button>
		<h1>useRef number: {ref.current}</h1>
		<Button variant="contained" onClick={handleUseMemo} sx={{m: 1}}>Open or close useMemo</Button>
		<Button variant="contained" onClick={setUseMemoNumber1} sx={{m: 1}}>Press it to trigger expensiveFunction in useMemo</Button>
		{openUseMemo ? testUseMemo : <ExpensiveFunction />}
        <h1>useMemo status: {openUseMemo ? "useMemo open" : "useMemo close"}</h1>
        <h1>Trigger useMemoNumber: {useMemoNumber}</h1>
		</>
		);
}