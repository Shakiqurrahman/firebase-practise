import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import app from "../firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Registar = () => {
  // const handleEmailChange = (event) => {
  //     event.preventDefault()
  //     console.log(event.target.value)
  // }

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccess('');
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, email, password);

    //create user in firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setError('')
        event.target.reset();
        setSuccess('User has created successfully')
        sendVerificationEmail(loggedUser);
        updateUserData(result.user, name);
      })
      .catch((err) => {
        console.error(err.message)
        setError(err.message);
    });
  };

  const sendVerificationEmail = (user) => {
    sendEmailVerification(user)
    .then(result => {
        console.log(result)
        alert('Please verify Your Email Address');
    })
}

const updateUserData = (user, name) => {
    updateProfile(user, {
        displayName : name
    })
    .then(() => {
        console.log('user name updated')
    })
    .catch(err => {
        setError(err.message);
    })
}

  return (
    <div className="max-width registar-page">
      <h2 className="title">Registar Now</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Your Name"
          required
        />
        <br />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Your Email"
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Your Password"
          required
        />
        <br />
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
        <input className="btn" type="submit" value="Registar" />
        <p>Already have an account? Please <Link to='/login' className="special-text">Login</Link></p>
        <button className="btn-outline">Registar With Google</button>
        <button className="btn-outline">Registar With Facebook</button>
        <button className="btn-outline">Registar With Github</button>
      </form>
    </div>
  );
};

export default Registar;
