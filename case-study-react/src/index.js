import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import Grid from '@mui/material/Unstable_Grid2';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { useState, createContext, useEffect } from "react";
import { Button } from '@mui/material';

import Header from "./Header.js";
import Body from "./Body.js";
import AutocompleteCase from "./AutocompleteCase.js"
import RatingCase from "./RatingCase.js";
import InputValidationCase from "./InputValidationCase.js";
import AvatarCase from "./AvatarCase.js";
import TableCase from "./TableCase.js";
import HooksCase from "./HooksCase.js";



const root = ReactDOM.createRoot(document.getElementById('root'));

  

function AppRoute() {
  const [display, setDisplay] = useState(true);
  const displayContext = createContext();

  function MainPage(){
    return(
      <>
      <displayContext.Provider value={display}>
      <Header displayContext={displayContext} />
      <Body />
      </displayContext.Provider>
      </>
      );
  }

  function CardPage(props){
    return(
      <>
      <displayContext.Provider value={display}>
      <Header displayContext={displayContext} />
      <div className="body">
      <Grid container rowSpacing={5} columnSpacing={3}>
      <Grid xs={12} sm={12} lg={12}>
      {props.cardComponent}
      </Grid>
      </Grid>
      </div>
      </displayContext.Provider>
      </>
      );
    }

  return(
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="AutocompleteCase" element={<CardPage cardComponent={<AutocompleteCase />} />} />
      <Route path="RatingCase" element={<CardPage cardComponent={<RatingCase />} />} />
      <Route path="InputValidationCase" element={<CardPage cardComponent={<InputValidationCase />} />} />
      <Route path="AvatarCase" element={<CardPage cardComponent={<AvatarCase />} />} />
      <Route path="TableCase" element={<CardPage cardComponent={<TableCase />} />} />
      <Route path="HooksCase" element={<CardPage cardComponent={<HooksCase display={display} setDisplay={setDisplay} />} />} />
      </Routes>
    </BrowserRouter>
    );
}



root.render(<AppRoute />);







// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
