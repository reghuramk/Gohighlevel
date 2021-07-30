import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { NavLink } from "react-router-dom";




export default function NavBar() {
 
    const activeLink = {
     
      color: "#fb9a55",
    }
    
    
    const link = {
      color: "white",
      paddingLeft: '30px',
      paddingRight: '30px',
      textDecoration: 'none'
    }
    
    const appbar = {
      backgroundColor : 'black',

    }


  return (
    <div >
      <AppBar style = {appbar} position="static">
        <Toolbar>
         
          <Typography variant="h6" >
            Wallet System
          </Typography>
          
           <NavLink to ='/setup' activeStyle={activeLink} style = {link} >Setup New Wallet</NavLink> 
           <NavLink to = '/transact' activeStyle={activeLink}  style = {link}>Make a New Transaction</NavLink> 
           <NavLink to = '/wallet' activeStyle = {activeLink}  style = {link}>Fetch Wallet Details</NavLink> 
           <NavLink to = '/transactions' activeStyle = {activeLink}  style = {link}>Fetch Transactions</NavLink> 
          


        </Toolbar>
      </AppBar>
    </div>
  );
}