import { ratingClasses } from "@mui/material";
import React, { useState, useEffect } from "react";
import { styled, alpha, createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
    useParams,
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import TextField from "@mui/material/TextField"
import { FormControl, Select, InputLabel, Alert, Popover, Grid } from "@mui/material"
//import { alertService } from "././_services";
import Navigbar from "./navigbar"


function AdaptForm(props) {


    const id = useParams().id
    const tableName = useParams().tableName
    var [data, setData] = useState({})
    const [dropdown, setDropdown] = useState('')
    var values = {}
    const [content, setContent] = useState({})
    const [anchorEl, setAnchorEl] = useState(null)




    useEffect(function () {
        fetch("http://localhost:8080/api/v1/adapt/4ece74fa1d6d11e7a7ae93aba127dfe8/table/" + tableName + "/view/admin/type/2/uuid/" + id, {
            method: 'GET',
            credentials: 'include'
        }).then(res => res.json()).then(
            res => {
                setData(res)

                if (res.items !== undefined) {
                    Object.keys(res.items[0]).map(key => {
                        if (key !== "uuid") {
                            values[key] = res.items[0][key]["displayValue"]
                        }
                    })
                    setContent(values)
                    console.log("Values: " + values.id)
                }
            }
        )
    }, [tableName, id])


    console.log("sajkdhsajkdlsakddsa;hcsatywqio ", content, values)

    /*
    var types = {}
    if (data.config !== undefined) {
        data.config.field.map(function (obj) {
            (obj.type === "lookup") ?
                types[obj.name] = true
                :
                types[obj.name] = false

        })
    }*/

    const ifFunction = (condition, returnIfTrue, returnIfFalse) => {
        if (condition) {
            return returnIfTrue
        }
        return returnIfFalse
    }

    const handleChange = (key, event) => {
        values = { ...content }
        console.log("KEY: " + key)
        values[key] = event.target.value
        console.log("WHAT", values)
        setContent(values)
    }

    function handleClick(event) {
        console.log("Alert")
        popHandleClick(event)
        //{<Alert severity="success">Success: Update Successful!</Alert>}
        var contentSend = { ...content }
        data.config.field.map(obj => {
            if (obj.type === "lookup") {
                obj.option.map(option => {
                    if (option[obj.name]["displayValue"] === contentSend[obj.name]) {
                        contentSend[obj.name] = option[obj.name]["value"]
                    }
                })
            }
        })
        fetch("http://localhost:8080/api/v1/adapt/4ece74fa1d6d11e7a7ae93aba127dfe8/table/" + tableName + "/view/admin/type/2/uuid/" + id,
            {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contentSend)
            }).then(res => { console.log("DONE", res) }
            )

    }

    function popHandleClick(event) {
        setAnchorEl(event.currentTarget)
    }
    function popHandleClose() {
        setAnchorEl(null)
    }
    const popOpen = Boolean(anchorEl)
    const popId = popOpen ? "simple-popover" : undefined

    console.log("Actual: ", content)
    return (
        <>
        <Navigbar/>
            { /* Object.keys(data.items[0]).map(key => (
                <TextField id="outlined-basic" label={data.items[0][key]["displayValue"]} size="small" required="true" variant="outlined" />
            )) */}
            {data.config === undefined ? null :
                console.log("Miraaaaaa")}
            {content.active === undefined ? null :
                //<Box sx={{ display: "flex", flexDirection: 'row', justifyContent: 'space_evenly', alignItems: "flex-start", p: 1, m: 1 }}>
                <Box sx={{display: "flex", flexDirection: 'row', p: 1, flexGrow: 1, m: 3, justifyContent: "center"}}>
                    <Grid container spacing={2}>
                        {data.config.field.map((obj, index) => (
                            (obj.name === "uuid") ? null :
                                <Grid item xs={6}>
                                    {(obj.type === "lookup") ?
                                        <FormControl sx={{minWidth: 120 }}>
                                            <Typography variant="h6"> {obj.displayName}
                                                <Select
                                                    autoWidth
                                                    size="small"
                                                    value={content[obj.name]}
                                                    onChange={(event) => handleChange(obj.name, event)}
                                                >
                                                    {obj.option.map(option => (
                                                        <MenuItem value={option[obj.name]["displayValue"]}>{option[obj.name]["displayValue"]}</MenuItem>
                                                    ))}
                                                </Select>
                                            </Typography>
                                        </FormControl>
                                        :
                                        (obj.subtype_format === "row_full") ? 
                                        <Typography variant="h6">{obj.displayName}
                                            <TextField fullWidth id="outlined-basic" label={content[obj.name]} size="small" required="true" variant="outlined" onChange={(event) => handleChange(obj.name, event)} />
                                        </Typography>
                                        :
                                        <Typography variant="h6">{obj.displayName}
                                            <TextField autoWidth id="outlined-basic" label={content[obj.name]} size="small" required="true" variant="outlined" onChange={(event) => handleChange(obj.name, event)} />
                                        </Typography>
                                    }
                                </Grid>
                        ))}


                    </Grid>
                </Box>

            }

            <Button sx = {{m: 2}} aria-describedby={popId} variant="contained" onClick={handleClick}>Save</Button>
            <Popover id={popId} open={popOpen} anchorEl={anchorEl} onClose={popHandleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>

                <Typography sx={{ p: 2 }}>Success: Update Successful!</Typography>
            </Popover>



            <pre> {JSON.stringify(data, "", 4)}</pre>
        </>
    )




}

export default AdaptForm;




            