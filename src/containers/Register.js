import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../store/activeUser/slice";

function Register() {
  const [credentials, setCredentials] = useState({
    'firstName': '',
    'lastName': '',
    'email': '',
    'password': '',
    'password_confirmation': '',
    'agreed': '',
  });

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    dispatch(register(credentials));

    setCredentials({
      'firstName': '',
      'lastName': '',
      'email': '',
      'password': '',
      'password_confirmation': '',
      'agreed': '',
    })
  }

  const handleFirstNameChange = (e) => {
    setCredentials({
      ...credentials,
      firstName: e.target.value
    })
  }

  const handleLastNameChange = (e) => {
    setCredentials({
      ...credentials,
      lastName: e.target.value
    })
  }
  
  const handleEmailChange = (e) => {
    setCredentials({
      ...credentials,
      email: e.target.value
    })
  }

  const handlePasswordChange = (e) => {
    setCredentials({
      ...credentials,
      password: e.target.value
    })
  }

  const handlePasswordConfirmationChange = (e) => {
    setCredentials({
      ...credentials,
      password_confirmation: e.target.value
    })
  }

  const handleAgreedChange = (e) => {
    setCredentials({
      ...credentials,
      agreed: e.target.checked
    })
  }

  return (
    <div>
      <form className="container" onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input required className="form-control" id="firstName" placeholder="Name..." type="text" value={credentials.firstName} onChange={handleFirstNameChange} />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input required className="form-control" id="lastName" placeholder="Name..." type="text" value={credentials.lastName} onChange={handleLastNameChange} />
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input required className="form-control" id="email" placeholder="Email..." type="email" value={credentials.email} onChange={handleEmailChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input required className="form-control" id="password" placeholder="Password" type="password" value={credentials.password} onChange={handlePasswordChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password_confirmation">Confirm password</label>
            <input required className="form-control" id="password_confirmation" placeholder="Confirm password" type="password" value={credentials.password_confirmation} onChange={handlePasswordConfirmationChange} />
          </div>
          <div className="form-check">
            <input required type="checkbox" name="agreed" className="form-check-input" id="agreed" onChange={handleAgreedChange} />
            <label className="form-check-label" htmlFor="agreed">I agree to terms and conditions.</label>
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Register</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register;