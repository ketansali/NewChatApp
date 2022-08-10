import React from "react";
import AuthPagesvg from "../images/AuthPage.svg";
import { Container, Typography, Box } from "@mui/material";
import SignUp from "../Components/Authentication/SignUp";
import SignIn from "../Components/Authentication/SignIn";
import {useLocation} from 'react-router-dom'
import { useSelector } from "react-redux";



const HomePage = () => {
  const location = useLocation()
  const userdata = useSelector(state=>state.usersignupApi)
  console.log({userdata});
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        bgcolor: "grey.300",
        height:"900px",
      }}
    >
      <Box
        sx={{
          flex: "50%",
          display: "flex",
          width: "100%",
          justifyContent: "center",
          m: "20px",
          
        }}
      >
        <Box sx={{ display:"flex",justifyContent:"center", width: "80%", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "#FFFFFF",
              borderRadius: "30px",
            }}
          >
            <Typography
              variant="h3"
              p={1}
              fontFamily="Roboto"
              sx={{
                color: "#6C63FF",
                textShadow: "#FC0 1px 0 31px",
                bgcolor: "#FFFFFF",
              }}
            >
              ChatIpY
            </Typography>
          </Box>
          <Box sx={{  bgcolor: "#FFFFFF", borderRadius: "30px", mt: "10px"}}>
          {
            location.pathname === "/" || location.pathname === "/signin" ?  <SignIn/> :<SignUp/> 
          }
                     
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          flex: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h2"
          p={6}
          sx={{ color: "#6C63FF", textShadow: "#FC0 1px 0 31px" }}
          fontSize="120px"
          fontFamily="Roboto"
        >
          ChatIpY
        </Typography>
        <img src={AuthPagesvg} width="70%" alt="" />
      </Box>
    </Container>
  );
};

export default HomePage;
