import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  useParams,
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'; 
import { pink, teal } from '@mui/material/colors';
import Navigbar from './components/navigbar';
import AdaptTable from './components/adapt_table';
import AdaptForm from './components/form';

/*
function useState (init) {
  var data = init
  setter = (s) => {data=s; jahaan data dikhe rerender;}
  return [data, setter]
}
*/

function Counter() {
  var [value, setValue] = useState(0);
  return (<button onClick={() => { setValue(value + 1) }}>
    {value}
  </button>)
}

function TablePage () {
  var params = useParams()
  return (
    <>

      <h1> Header </h1>
      <AdaptTable />
    </>
  )
}

function App() {
  var tables = ["adapt_acl_table", "adapt_user"];
  

  return (
    <>
    {/* <Navigbar/> */}

    <Router>
      <Routes>
        <Route path="/hello" element={<>world</>}></Route>
        <Route path="/" element={<Navigbar/>}></Route>
        <Route path="/form/:id/:tableName" element={<AdaptForm/>}></Route>
        <Route path="/list/:any" element={<AdaptTable />}></Route>
        <Route path="/counter" element={<Counter />}></Route>
        <Route path="/acl" element={<AdaptTable name={tables[0]} />}></Route>
      </Routes>
    </Router>
    </>

  )
}

export default App;
