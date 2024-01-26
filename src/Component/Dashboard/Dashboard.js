import React, { useContext, useEffect } from "react";
import Img from "../../Assets/Images/man.png";
import {useNavigate} from 'react-router-dom';
import { LoginContext } from "../ContextPrivider/Context";

const Dashboard = () => {

  const {loginData,setLoginData} = useContext(LoginContext); 
console.log(loginData);
  const history = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("userssatatoken");

    const res = await fetch("http://localhost:8009/validauster", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    });
    const data = await res.json();
    if (data.status === 401 || !data) {
      history("*");
    } else {
      setLoginData(data);
      history("/dashboard");
    }
  };

  useEffect(() => {
    DashboardValid();
  },[]);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={Img} style={{ width: "200px", marginTop: 20 }} />
        <h1>User Email:{loginData ? loginData.ValidUserOne?.email : ""}</h1>
      </div>
    </>
  );
};

export default Dashboard;
