import React, { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";


const Login = () => {

  const history = useNavigate();
  const [passShow, setPassShow] = useState(false);
  const [inputValue,setInputValue] = useState({
    email:"",
    password:""
  })

  const handleValueChange = (e) =>{
      const {name,value} = e.target;
      setInputValue({
        ...inputValue,
        [name]:value
      })
  }

  const handleFormSubmit = async(e) =>{
     e.preventDefault();
     const {email,password} = inputValue;

    if(email === ""){
      alert("please enter your email");
    }else if(!email.includes("@")){
      alert("enter valid email");
    }else if(password === ""){
      alert("please enter your password");
    }else if(password.length < 6){
      alert("password must be 6 char");
    }else{
      // console.log("user login successfully");
      
      const data = await fetch("http://localhost:8009/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email,password
        })
      });
      const res = await data.json();
      console.log("check response",res);
      if(res.status === 201){
        localStorage.setItem("userssatatoken", res.result.token)
        history("/dashboard")
        setInputValue({
          ...inputValue,
          email:"",
          password:""
        })
      }
    }
  }
  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcom Back, log In</h1>
            <p>Hi, we are you glad you are back, please login.</p>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
              onChange={handleValueChange}
                type="email"
                name="email"
                id="email"
                value={inputValue.email}
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                onChange={handleValueChange}
                  type={!passShow ? "password" : "text"}
                  name="password"
                  id="password"
                  value={inputValue.password}
                  placeholder="Enter Your password"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn">Login</button>
            <p>Don't have an Account? <NavLink to="/signup">Sign Up</NavLink></p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
