import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import "./Header.css";
import { LoginContext } from "../ContextPrivider/Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { loginData, setLoginData } = useContext(LoginContext);
const history = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutuser = async() =>{
    let token = localStorage.getItem("userssatatoken");

    const res = await fetch("http://localhost:8009/logout", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": token,
          Accept: "application/json"
      },
      credentials: "include"
    });
    const data = await res.json();
    console.log("=====------>",data);
    if (data.status == 201) {
      console.log("user logout");
      localStorage.removeItem("userssatatoken");
      setLoginData(false);
      history("/");
    } else {
      console.log("error");
    }
  }

  const goDash = () =>{
    history("/dashboard")
  }

  const goError = () =>{
    history("*");
  }

  return (
    <>
      <header>
        <nav>
          <h1>Lk Cloud</h1>
          <div className="avtar">
            {loginData.ValidUserOne ? (
              <Avatar
                style={{
                  background: "orange",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
                onClick={handleClick}
              >
                {loginData.ValidUserOne.fname[0].toUpperCase()}
              </Avatar>
            ) : (
              <Avatar style={{ background: "blue" }} onClick={handleClick} />
            )}
          </div>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {loginData.ValidUserOne ? (
              <>
                <MenuItem onClick={()=>{
                  goDash()
                  handleClose()
                }}>Profile</MenuItem>
                <MenuItem onClick={()=>{
                  logoutuser()
                  handleClose()
                }}>Logout</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={()=>{
                  goError()
                  handleClose()
                }}>Profile</MenuItem>
              </>
            )}
          </Menu>
        </nav>
      </header>
    </>
  );
};

export default Header;
