import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCpassShow] = useState(false);
  const [inputValue,setInputValue] = useState({
    fname:"",
    email:"",
    password:"",
    cpassword:""
  })

  const handleValueChange = (e) =>{
      const {name,value} = e.target;
      setInputValue({
        ...inputValue,
        [name]:value
      })
  }

  const handleFormSubmit =async (e) =>{
      e.preventDefault();
      const {fname,email,password,cpassword} = inputValue;
      
      if(fname === ""){
        alert("please enter your name");
      }else if(email === ""){
        alert("please enter your name");
      }else if(!email.includes("@")){
        alert("enter valid email");
      }else if(password === ""){
        alert("please enter your password");
      }else if(password.length < 6){
        alert("password must be 6 char");
      }else if(cpassword === ""){
        alert("please enter your confirm password");
      }else if(cpassword.length < 6){
        alert("confirm password must be 6 char");
      }else if(password !== cpassword){
        alert("password and cpassword not matched")
      }else{
        // console.log("user registration successfully");

        const data = await fetch("http://localhost:8009/signup",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            fname,email,password,cpassword
          })
        });
        const res = await data.json();
        console.log("check response",res);
        if(res.status === 201){
          alert("user registration done");
          setInputValue({
            ...inputValue,
            fname:"",
            email:"",
            password:"",
            cpassword:""
          })
        }
      }

  }
  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p>
              We are glad that you will be using Project Cloud to manage <br/> your
              tasks! We hope that you will get like it.
            </p>
          </div>
          <form onSubmit={handleFormSubmit}>
          <div className="form_input">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="fname"
                id="name"
                value={inputValue.fname}
                placeholder="Enter Your name"
                onChange={handleValueChange}
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={inputValue.email}
                placeholder="Enter Your Email Address"
                onChange={handleValueChange}
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  name="password"
                  id="password"
                  value={inputValue.password}
                  placeholder="Enter Your password"
                  onChange={handleValueChange}
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "show" : "Hide"}
                </div>
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="password">Confirm Password</label>
              <div className="two">
                <input
                  type={!cpassShow ? "password" : "text"}
                  name="cpassword"
                  id="cpassword"
                  value={inputValue.cpassword}
                  placeholder="Enter Your Confirm password"
                  onChange={handleValueChange}
                />
                <div
                  className="showpass"
                  onClick={() => setCpassShow(!cpassShow)}
                >
                  {!cpassShow ? "show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn">Sign Up</button>
            <p>Already have an Account? <NavLink to="/">Log In</NavLink></p>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
