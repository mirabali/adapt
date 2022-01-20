import { ratingClasses } from "@mui/material";
import React, { useState } from "react";
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
  import AdaptForm from "./form";

function Navigbar() {


    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(5),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(80),
          width: 'auto',
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'right',
      }));
      
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '20ch',
          },
        },
      }));

      const general = createTheme({
          width: "100ch"
      });

    
      const [anchorEl, setAnchorEl] = useState(null);
      const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
      }
      const open = Boolean(anchorEl);
      const handleClose = () => {
        setAnchorEl(null)
      }

      const tableNames = {
          "ACL": "adapt_acl_table",
          "App org report pc": "adapt_app_org_report_pc",
          "Assignment Rule": "adapt_assignment_rule",
          "Filter": "adapt_filter",
          "Team": "adapt_group",
          "Group Member": "adapt_group_user_pc",
          "Knowledge": "adapt_kb",
          "KB-Service-Category": "adapt_kb_m2m", 
          "Lookup": "adapt_lookup",
          "Menu": "adapt_menu",
          "Metadata": "adapt_metadata",
          "Service": "http://localhost:8080/api/v1/adapt/4ece74fa1d6d11e7a7ae93aba127dfe8/filter/1f5a05ac83455f85a720a23e7bc7f36f/view/related_service/type/1?start=1",
          "Organization": "adapt_org",
          "Report": "adapt_report",
          "Rule": "adapt_script",
          "User": "adapt_user",
          "View Detail": "adapt_view_field",
          "JDM Ticket": "jdm_ticket",
      }

      return (
        <>
        <ThemeProvider theme={general}>
          <AppBar position="static">
              <Toolbar> 
                <Typography
                    variant="h6"
                    component="div"
                    >
                        <Link to="/" style={{textDecoration: "none", color: "white"}}>Adapt</Link>
                </Typography>
              <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Button onClick={handleClick} theme={general} style={{color: "white", textTransform: "none"}}
          endIcon={<KeyboardArrowDownIcon style={{fontSize: "15px", position:"relative", marginLeft: "2px", textAlign: "center"}}></KeyboardArrowDownIcon>}> 
          Configure 
          </Button>
          <Menu id="long-menu" MenuListProps={{ 'aria-labelledby': 'long-button'}}
              onClose={handleClose} open={open} anchorEl={anchorEl}>
                {(Object.keys(tableNames)).map(key => (
                  (key === "Service") ? null :
                    <MenuItem onClick={handleClose}> 
                    <Link to={"/list/" + tableNames[key]} style={{textDecoration: "none", color: "black"}}>{key}</Link>
                    </MenuItem>
          
                ))
}
            </Menu>
            
          Meta
          <ThemeProvider theme={general}> View </ThemeProvider>
          <ThemeProvider theme={general}> Knowledge Articles </ThemeProvider>

              </Toolbar>
          </AppBar>
          </ThemeProvider>
        </>
      );
  }
  
  
  
  export default Navigbar;