import { TextField } from "@material-ui/core";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSignUpApiMutation } from "../../services/user";


const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setConfPassword] = useState("");
  const [pic, setPic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
  const [SignUpApi,responseInfo]= useSignUpApiMutation()
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ name, email, password, confpassword, pic });
   await dispatch(SignUpApi({name, email, password, pic})) 
   
    console.log({responseInfo});
  };
  const imageUpload = (img) => {
    setIsLoading(true);
    if (
      img.type === "image/jpeg" ||
      img.type === "image/png" ||
      img.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "Chat-app");
      data.append("cloud_name", "dp6gpirbt");

      fetch("https://api.cloudinary.com/v1_1/dp6gpirbt/image/upload", {
        method: "post",
        body: data,
      }).then((res)=> res.json()).then((data)=>{
        setPic(data.url.toString())
        setIsLoading(false)
      }).catch((e)=>{
        console.log(e)
        setIsLoading(false)
      })
    } else {
      toast.error("Select Only Image!", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
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
          SignUp
        </Typography>
      </Box>

      <Box sx={{ m: "0px 60px 0px 59px" }}>
        <Box>
          <form>
            <Box sx={{ mb: "10px" }}>
              <TextField
                id="standard-name-input"
                label="Name"
                type="text"
                fullWidth
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              />
            </Box>
            <Box sx={{ mb: "10px" }}>
              <TextField
                id="standard-email-input"
                label="Email"
                type="text"
                fullWidth
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </Box>

            <Box sx={{ mb: "10px" }}>
              <TextField
                id="standard-new-password-input"
                label="Password"
                type="password"
                fullWidth
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                autoComplete="on"
              />
            </Box>
            <Box sx={{ mb: "10px" }}>
              <TextField
                id="standard-ConfPassword-input"
                label="Confirm Password"
                type="password"
                fullWidth
                onChange={(e) => {
                  setConfPassword(e.target.value);
                }}
                value={confpassword}
                autoComplete="on"
              />
            </Box>
            <Box sx={{ mb: "10px" }}>
              <TextField
                id="standard-file-input"
                type="file"
                fullWidth
                onChange={(e) => {
                  imageUpload(e.target.files[0]);
                }}
              />
            </Box>
            <Box sx={{ mb: "10px" }}>
              <Button
                variant="contained"
                color="primary"
                label=""
                fullWidth={true}
                sx={{ m: "26px 0px 30px 0px" }}
                onClick={handleSubmit}
              >
                {isLoading ? <CircularProgress color="inherit" /> : "Submit"}
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
            you have alredy registered? <Link to="/signin">LogIn</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
