import React from "react";
import NavBar from "./NavBar";
import { Box } from "@mui/material";
import Login from "./Login";

const HomePage=()=>{
    return(
        <div>
        <NavBar />
        <Box
        display="flex"
        alignItems="center" 
        justifyContent="center" 
      >
        <h1>Welcome to DealsDry</h1>
      </Box>
      <Login/>
        </div>
    )
}
export default HomePage