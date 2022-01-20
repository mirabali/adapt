import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navigbar from './navigbar';
import {
    useParams,
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from 'react-router-dom';

function AdaptTable(props) {
    var params = useParams()
    console.log("PARAMS " + params.any)
    var [data, setData] = useState({})
    var [headers, setHeaders] = useState([]) // var x = useState([]); var headers = x[0]; var setHeaders = x[1];
  
    useEffect(() => {
      fetch("http://localhost:8080/api/v1/adapt/4ece74fa1d6d11e7a7ae93aba127dfe8/table/" + params.any + "/view/admin/type/1?start=1", {
        method: 'GET',
        credentials: 'include'
      }).then(res => res.json()).then(
        res => {
          setData(res)
          console.log(res)
          setHeaders(res["config"]["field"]);
        }
      )
    }, [params.any])
  
  
    return (
      <>
      <Navigbar/>
        {data.config == undefined ? null :
          <h2> {data.config.table.displayValue} </h2>
        }
        <TableContainer component={Paper}>
          <Table sx={{ backgroundColor: "lavender", minWidth: 650, border: 10}} aria-label="a dense table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "lightpink", fontWeight: "bold" }}>
                {headers.slice(0, 8).map(headers => (
                  <TableCell>{headers["displayName"]}</TableCell>
                ))}
              </TableRow>
  
            </TableHead>
            {data.items == undefined ? null :
              <TableBody>
                {data.items.map(item => (
                  <TableRow>
                    {Object.keys(item).slice(0, 8).map(key => 
                      (key === "id") ? 
                      <TableCell>
                      <Link to={"/form/" + item[key]["uuid"] + "/" + params.any} style={{textDecoration: "none", color: "black"}}> {item[key]["displayValue"]} </Link>
                      </TableCell>
                    :
                      <TableCell>
                        {item[key]["displayValue"]}
                      
                      </TableCell>
                    
                    )}
                  </TableRow>

                ))}

              </TableBody>}
          </Table>
  
        </TableContainer>
  
  
        <pre> {JSON.stringify(data, "", 4)}</pre>
      </>
    );
  }

export default AdaptTable;