import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PasswordChecklist from "react-password-checklist";
import './RegisterPage.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const navigate = useNavigate();

  //handle register
  const handleRegister = async () => {
    try {
      //register the user
      const response = await axios.post(
        'http://localhost:3000/users/register',
        { username, email, password }
      );
      //login the user
      const loginResponse = await axios.post(
        'http://localhost:3000/users/login',
        { username, email, password }
      );

      // Store the token in the localstorage as token
      localStorage.setItem('token', loginResponse.data.token);
      navigate('/dashboard');
    } catch (error) {
      alert('Registration failed. Try again.');
    }
  };

  return (
    <div className='registerBody'>
      <div className='registerBox'>
          <div className='imageArea'>
              <img src='https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='Picture of plant inside pot filled with coins'/>
          </div>

          <form className='registerForm'>
              <div className='registerDescription'>
                  <h1>Sign Up</h1>
                  <p>Already have an account? <a href='/login'>Log in</a></p>
              </div>

              <label>Email</label>
              <input
                  type='text'
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />

              <label>Username</label>
              <input
                  type='text'
                  onChange={(e) => setUsername(e.target.value)}
                  required
              />

              <label>Password</label>
              <input
                  type={
                      showPassword1 ? 'text' : 'password'
                  }
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />

              <div className='showPassword1Area'>
                  <input
                      id='check1'
                      type='checkbox'
                      value={showPassword1}
                      onChange={() =>
                          setShowPassword1((prev) => !prev)
                      }
                  />
                  <label for='check'>Show Password</label>
              </div>

              <label>Retype Password</label>
              <input
                  type={
                      showPassword2 ? 'text' : 'password'
                  }
                  onChange={(e) => setPasswordAgain(e.target.value)}
                  required
              />

              <div className='showPassword2Area'>
                  <input
                      id='check2'
                      type='checkbox'
                      value={showPassword2}
                      onChange={() =>
                          setShowPassword2((prev) => !prev)
                      }
                  />
                  <label for='check'>Show Password</label>
              </div>

              <PasswordChecklist
                  rules={[
                      "minLength",
                      "specialChar",
                      "number",
                      "capital",
                      "match",
                  ]}
                  minLength={8}
                  value={password}
                  valueAgain={passwordAgain}
                  onChange={setIsValidPassword}
              />
              
              <div className='registerButtonArea'>
                  <button onClick={handleRegister} className='registerButton' disabled={!isValidPassword}>Create Account</button>
                  {/* <button onClick={() => navigate('/register')} className='registerButton'>Go to Register</button> */}
              </div>
          </form>
          
      </div>
    </div>
  );
};

export default Register;