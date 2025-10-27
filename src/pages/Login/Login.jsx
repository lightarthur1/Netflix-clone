import React from 'react'
import './Login.css'
import logo from '../../assets/logo.png'

const Login = () => {

const [signState, setSignState] = React.useState('sign In');


  return (
    <div className='login'>
      <img src={logo} alt="" className='login-logo' />
      <div className='login-form'>
        <h1>{signState}</h1>
        <form action="">
          {signState === 'Sign Up' ? <input type="text" placeholder='Enter your name' /> : null}
          
          <input type="email" placeholder='Email or phone number' />
          <input type="password" placeholder='Password' />
          <button>{signState}</button>

          <div className='form-help'>
            <div className='remember-me'>
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
      <div className="form-switch">
        {signState === 'Sign Up' ? 
        <p >Already have an account? <span onClick={() => setSignState('sign In')}>Sign In</span></p> 
        : <p>New to Netflix? <span onClick={() => setSignState('Sign Up')}>Sign Up</span></p>}       
      </div>
    </div>
    </div>
  )
}

export default Login