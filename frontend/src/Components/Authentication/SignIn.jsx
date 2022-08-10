import React from 'react'
import { TextField } from "@material-ui/core";
import { Box, Button, Typography } from "@mui/material";
import {Link} from 'react-router-dom'
const SignIn = () => {
  return (
    <Box sx={{ p: "0px 0px 38px 0px" }}>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography
          variant="h4"
          p={1}
          fontFamily="Roboto"
          sx={{
            color: "#6C63FF",
            textShadow: "#FC0 1px 0 31px",
            bgcolor: "#FFFFFF",
          }}
        >
          LogIn
        </Typography>
      </Box>
      <Box sx={{ m: "0px 60px 0px 59px" }}>
        <Box>
          <form>
            <Box sx={{mb:"10px"}}>
              <TextField
                id="standard-email-input"
                label="Email"
                type="text"
                fullWidth
              />
            </Box>

            <Box sx={{mb:"10px"}}>
              <TextField
                id="standard-Password-input"
                label="Password"
                type="password"
                fullWidth
              />
            </Box>
            
            <Box sx={{mb:"10px"}}>
              <Button
                variant="contained"
                color="primary"
                label=""
                fullWidth={true}
                sx={{ m: "26px 0px 30px 0px" }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>
            you have alredy registered? <Link to="/signup">SignUp</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default SignIn