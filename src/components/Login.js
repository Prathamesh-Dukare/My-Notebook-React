import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function Login(props) {
    let history = useHistory()
    const [creds, setCreds] = useState({ email: "", password: "" })
    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify({ name: creds.name, email: creds.email, password: creds.password })
        });
        let jason = await response.json()
        //Redirect to Home
        if (jason.status === "success") {
            localStorage.setItem("token", jason.authToken)
            history.push("/")
            props.setAlertType("success")
            props.setAlertMessage("Login Successful")
            props.alertRef.current.click()
        } else {
            props.setAlertType("error")
            props.setAlertMessage("Invalid credentials")
            props.alertRef.current.click()
        }
    }
    return (
        <form className="container" onSubmit={onSubmit} style={{ marginTop: "5rem", width: "50%" }}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" name="email" value={creds.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" required />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" name="password" value={creds.password} onChange={onChange} id="exampleInputPassword1" autoComplete="on" minLength={5} />
            </div>
            <button type="submit" className="btn btn-success">Login</button>
        </form>
    )
}