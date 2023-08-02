import React, { useState, } from 'react';
import { useNavigate } from "react-router-dom"

function Register() {
  const initialValue = {
    name: "",
    email: '',
    mobile: "",
    password: "",
    conpassword: "",
    address: ""
  }
  const [state, setState] = useState(initialValue);
  const handler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const navigate = useNavigate();
  const submitData = async () => {
    try {
      const { name, email, mobile, address, password, conpassword } = state;

      if (password === conpassword) {
        const response = await fetch('http://localhost:5000/registerHere', {
          method: 'POST',
          body: JSON.stringify({ name, email, mobile, address, password, conpassword }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });

        if (response.ok) {
          const jsonData = await response.json();
          console.log(jsonData);
          navigate("/fetch");
          document.getElementById("res").innerHTML = "Register Successfully!!!";
          setState(initialValue);
        } else {
          const errorData = await response.json();
          console.error("Failed to register:", errorData);
        }
      } else {
        alert("Your password and confirm password do not match");
      }
    } catch (error) {
      console.error("Error while submitting data:", error);
    }
  };
  return (
    <>
      <div className='container'>
        <div className='row'>
          <h1 className='text-center text-uppercase'>Register Here</h1>
          <form >
            {/* <fieldset>
                        <legend><h1>Register Here</h1></legend> */}
            <div class="row g-3">
              <div class="col">
                <input
                  type='text'
                  name='name'
                  value={state.name}
                  onChange={handler}
                  placeholder='Your Name'
                  className='form-control my-3' />
              </div>
              <div class="col">
                <input type='text' name='mobile' value={state.mobile}
                  onChange={handler} placeholder='Mobile number' className='form-control my-3 my-3' />
              </div>
            </div>
            <input type='email' value={state.email}
              onChange={handler} name='email' placeholder='Your Email ID' className='form-control my-3' />
            <div class="row g-3">
              <div class="col"> 
              <input type='password' name='password' value={state.password}
              onChange={handler} placeholder='Password' className='form-control my-3' />
              </div>
              <div class="col">
              <input type='password' value={state.conpassword}
              onChange={handler} name='conpassword' placeholder='Confirm Password' className='form-control my-3' />
              </div>
            </div>
            <textarea rows={'2'} name='address' value={state.address}
              onChange={handler} placeholder='Your Address' className='form-control my-3'></textarea>
            <input type='button' className='btn btn-primary' value={"Submit"} onClick={submitData} />

            {/* </fieldset> */}
          </form>

          <h2 id='res'> </h2>


        </div>
      </div>
    </>
  )
}

export default Register
