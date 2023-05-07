import { useState, useReducer } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TableFooter, Tooltip } from '@mui/material';
import { FormControl, FormHelperText, Input, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';

import "./Body.css";

const labelData = { ID: "ID", Product: "Product", Weight: "Weight", Volumn: "Volumn", Color: "Color" };

function createData(ID, Product, Weight, Volumn, Color) {
  return { ID, Product, Weight, Volumn, Color };
}

const data = [
    createData(1, "apple", 100, 5, "red"), 
    createData(2, "apple", 80, 50, "green"), 
    createData(3, "orange", 65, 100, "orange"), 
    createData(4, "banana", 100, 55, "yellow"), 
    createData(5, "strawberry", 100, 33, "red"), 
    createData(6, "pineapple", 500, 57, "yellow"), 
    createData(11, "apple", 100, 5, "red"), 
    createData(12, "apple", 80, 50, "green"), 
    createData(13, "orange", 65, 100, "orange"), 
    createData(14, "banana", 100, 55, "yellow"), 
    createData(15, "strawberry", 100, 33, "red"), 
    createData(16, "pineapple", 500, 57, "yellow"), 
    createData(21, "apple", 100, 5, "red"), 
    createData(22, "apple", 80, 50, "green"), 
    createData(23, "orange", 65, 100, "orange"), 
    createData(24, "banana", 100, 55, "yellow"), 
    createData(25, "strawberry", 100, 33, "red"), 
    createData(26, "pineapple", 500, 57, "yellow"), 
	];

const generateIdNumber = generateId();

function* generateId(){
  let i = 1000;
  while(i < 2000){
    yield i++;
  }
}



export default function TableCase(){
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [sort, setSort] = useState("decrease");
	const [sortItem, setSortItem] = useState("ID");

  const [product, setProduct] = useState("apple");
  const [weight, setWeight] = useState(1);
  const [volumn, setVolumn] = useState(1);
  const [color, setColor] = useState("red");
  const [dataR, setDataR] = useReducer(AddOrdersReducer, data);



	function HandlePageChange(event, newPage){
    setPage(newPage);
  }

  function HandleRowsPerPageChange(event){
    setRowsPerPage(event.target.value);
    setPage(0);
  }

  function HandleSort(a, b){
    switch(sortItem) {
      case labelData.ID:
      	switch(sort){
          case "increment":
          	return (a.ID - b.ID);
          case "decrease":
            return (b.ID - a.ID);
      	}
      	break;
      case labelData.Weight:
      	switch(sort){
          case "increment":
          	return (a.Weight - b.Weight);
          case "decrease":
            return (b.Weight - a.Weight);
      	}
      	break;
      case labelData.Volumn:
      	switch(sort){
          case "increment":
          	return (a.Volumn - b.Volumn);
          case "decrease":
            return (b.Volumn - a.Volumn);
      	}
      	break;
      case labelData.Product:
      	switch(sort){
          case "increment":
          	return (a.Product.charCodeAt(0) - b.Product.charCodeAt(0));
          case "decrease":
            return (b.Product.charCodeAt(0) - a.Product.charCodeAt(0));
      	}
      	break;
      case labelData.Color:
      	switch(sort){
          case "increment":
          	return (a.Color.charCodeAt(0) - b.Color.charCodeAt(0));
          case "decrease":
            return (b.Color.charCodeAt(0) - a.Color.charCodeAt(0));
      	}
      	break;

      default:
    }
  }

  function HandleSortID(event){
    setSortItem("ID");
    if (sort === "increment"){
      setSort("decrease");
    }else{
    	setSort("increment");
    }
  }

  function HandleSortWeight(event){
    setSortItem("Weight");
    if (sort === "increment"){
      setSort("decrease");
    }else{
    	setSort("increment");
    }
  }

  function HandleSortVolumn(event){
    setSortItem("Volumn");
    if (sort === "increment"){
      setSort("decrease");
    }else{
    	setSort("increment");
    }
  }

  function HandleSortProduct(event){
    setSortItem("Product");
    if (sort === "increment"){
      setSort("decrease");
    }else{
    	setSort("increment");
    }
  }

  function HandleSortColor(event){
    setSortItem("Color");
    if (sort === "increment"){
      setSort("decrease");
    }else{
    	setSort("increment");
    }
  }

  function HandleSelectChangeProduct(event){
    setProduct(event.target.value);
  }

  function HandleSelectChangeWeight(event){
    setWeight(event.target.value);
  }

  function HandleSelectChangeVolumn(event){
    setVolumn(event.target.value);
  }

  function HandleSelectChangeColor(event){
    setColor(event.target.value);
  }



  function AddOrdersReducer(state, action){
    let newData = state;

    switch(action.ordersX){
      case 1:
        let newOrder = createData(generateIdNumber.next().value, product, weight, volumn, color);
        newData.push(newOrder);
        return newData;
      case 5:
        for (let i = 0; i < 5; i++){
          let newOrder = createData(generateIdNumber.next().value, product, weight, volumn, color);
          newData.push(newOrder);
        }
        return newData;
      case 10:
        for (let i = 0; i < 10; i++){
          let newOrder = createData(generateIdNumber.next().value, product, weight, volumn, color);
          newData.push(newOrder);
        }
        return newData;
      default:
        return state;
    }

    return state;
  }

  function AddOrder(event){
    setDataR({ordersX: 1});
    setPage(0);
  }

  function AddOrder5(event){
    setDataR({ordersX: 5});
    setPage(0);
  }

  function AddOrder10(event){
    setDataR({ordersX: 10});
    setPage(0);
  }

	return(
		<div id="TableCase">

    <Box sx={{width: "100%"}}>
    <FormControl sx={{ m: 1, minWidth: 120 }}>
    <InputLabel id="TableCase-form-Product">{labelData.Product}</InputLabel>
    <Select labelId="TableCase-form-Product" value={product} label={labelData.Product} onChange={HandleSelectChangeProduct}>
    <MenuItem value="apple">apple</MenuItem>
    <MenuItem value="banana">banana</MenuItem>
    <MenuItem value="orange">orange</MenuItem>
    <MenuItem value="pineapple">pineapple</MenuItem>
    <MenuItem value="strawberry">strawberry</MenuItem>
    </Select>
    </FormControl>

    <FormControl sx={{ m: 1, minWidth: 120 }}>
    <InputLabel htmlFor="TableCase-form-Weight">{labelData.Weight}</InputLabel>
    <Input id="TableCase-form-Weight" value={weight} onChange={HandleSelectChangeWeight} />
    <FormHelperText>{`Enter product's weight gram`}</FormHelperText>
    </FormControl>

    <FormControl sx={{ m: 1, minWidth: 120 }}>
    <InputLabel htmlFor="TableCase-form-Volumn">{labelData.Volumn}</InputLabel>
    <Input id="TableCase-form-Volumn" value={volumn} onChange={HandleSelectChangeVolumn} />
    <FormHelperText>{`Enter product's volumn`}</FormHelperText>
    </FormControl>

    <FormControl sx={{ m: 1, minWidth: 120 }}>
    <InputLabel id="TableCase-form-Color">{labelData.Color}</InputLabel>
    <Select labelId="TableCase-form-Color" value={color} label={labelData.Color} onChange={HandleSelectChangeColor}>
    <MenuItem value="green">green</MenuItem>
    <MenuItem value="orange">orange</MenuItem>
    <MenuItem value="red">red</MenuItem>
    <MenuItem value="yellow">yellow</MenuItem>
    </Select>
    </FormControl>
    </Box>

    <Box sx={{width: "100%"}}>
    <Button variant="contained" sx={{ m: 1}} onClick={AddOrder}>Add order</Button>
    <Button variant="contained" sx={{ m: 1}} onClick={AddOrder5}>Add order X5</Button>
    <Button variant="contained" sx={{ m: 1}} onClick={AddOrder10}>Add order X10</Button>
    </Box>

		<TableContainer>
		<Table>
		<TableHead>
		<TableRow>
		<Tooltip title="Press to sort" arrow><TableCell className="cursor-hand" onClick={HandleSortID}>{labelData.ID}</TableCell></Tooltip>
		<Tooltip title="Press to sort" arrow><TableCell className="cursor-hand" onClick={HandleSortProduct}>{labelData.Product}</TableCell></Tooltip>
		<Tooltip title="Press to sort" arrow><TableCell className="cursor-hand" onClick={HandleSortWeight}>{labelData.Weight}</TableCell></Tooltip>
		<Tooltip title="Press to sort" arrow><TableCell className="cursor-hand" onClick={HandleSortVolumn}>{labelData.Volumn}</TableCell></Tooltip>
		<Tooltip title="Press to sort" arrow><TableCell className="cursor-hand" onClick={HandleSortColor}>{labelData.Color}</TableCell></Tooltip>
		</TableRow>
		</TableHead>
		<TableBody>
		{dataR.sort(HandleSort).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ele) => (
			<TableRow key={ele.ID}>
			<TableCell>{ele.ID}</TableCell>
			<TableCell>{ele.Product}</TableCell>
			<TableCell>{ele.Weight}</TableCell>
			<TableCell>{ele.Volumn}</TableCell>
			<TableCell>{ele.Color}</TableCell>
			</TableRow>
		))}
		</TableBody>
		<TableFooter>
    <TableRow>
		<TablePagination count={dataR.length} rowsPerPage={rowsPerPage} onRowsPerPageChange={HandleRowsPerPageChange} page={page} onPageChange={HandlePageChange} />
		</TableRow>
		</TableFooter>
		</Table>
		</TableContainer>
		</div>
		);
}