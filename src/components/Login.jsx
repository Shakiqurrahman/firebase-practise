import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useRef, useState } from 'react';
import app from '../firebase/firebase.config';
import { Link } from 'react-router-dom';
const auth = getAuth(app);

const Login = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const emailRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess('');
        setError('')
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        // sign in with firebase 
        signInWithEmailAndPassword(auth, email,password )
        .then(result => {
            const loggedUser = result.user;
            if(loggedUser.emailVerified === false) {
                setError("Your Email is not verified, Please Verify First");
            }
            else{
                setSuccess('User Login Successfully');
            }
            console.log(loggedUser)
      
        })
        .catch(error => {
            setError(error.message);
        })
    }

    const handleResetPassword = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        if (!email) {
            alert('Please provide your email address to reset password');
            return;
        }
        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('Please check your email');
            setSuccess("Check your email to reset your password")
        })
        .catch(error => {
            console.log(error);
        })
    }

    // eye icon for showing password 
    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
    const handlePasswordChange =(event)=>{
        setPasswordInput(event.target.value);
    }
    const togglePassword =()=>{
      if(passwordType==="password")
      {
       setPasswordType("text")
       return;
      }
      setPasswordType("password")
    }
   
    return (
        <div className="max-width registar-page">
      <h2 className="title">Login Now</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Your Email"
          ref={emailRef}
          required
        />
        <br />
        <div className='p-div'>
        <input
        type={passwordType} onChange={handlePasswordChange} value={passwordInput}
          name="password"
          id="password"
          placeholder="Your Password"
          required
        />
        <p className='show' onClick={togglePassword}>Show</p>
        </div>
     
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
        <p>Forget password? Please <span onClick={handleResetPassword} className="special-text">Reset password</span></p>
        <input className="btn" type="submit" value="Login" />
        <p>New to this website? Please <Link to='/registar' className="special-text">Registar</Link></p>

      </form>
    </div>
    );
};

export default Login;