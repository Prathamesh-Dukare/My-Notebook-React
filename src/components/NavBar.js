import React, { useRef } from 'react'
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
   let location = useLocation()
   const logoutHandler = () => {
      localStorage.removeItem('auth-token')
      window.location.reload()
   }
   const Navref = useRef(null)
   const closeToggle = () => {
      Navref.current.click()
   }
   return (
      <nav className="navbar navbar-light navbar-expand-lg fixed-top" style={{ backgroundColor: "rgb(106 222 146)", height: '3.2em', color: "white" }}>
         <div className="container-fluid">
            <Link className="navbar-brand" to="/">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-journal-bookmark-fill" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8V1z" />
                  <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                  <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
               </svg>
               myNoteBook
            </Link>
            <button className="navbar-toggler" ref={Navref} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                     <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} onClick={closeToggle} aria-current="page" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                     <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} onClick={closeToggle} aria-current="page" to="/about">About</Link>
                  </li>

               </ul>
               {!localStorage.getItem("auth-token") ? <>
                  <ul className="login-signup" style={{margin:0}}>
                  <Link className="btn btn-sm mx-1 btn-success" to="/login" onClick={closeToggle} role="button">Login</Link>
                  <Link className="btn btn-sm mx-1 btn-warning" to="/signup" onClick={closeToggle} role="button">SignUp</Link>
                  </ul>
               </> : <><Link className="btn btn-sm mx-1 btn-warning logout-btn" to="" onClick={logoutHandler} role="button">LogOut</Link></>

               }
            </div>
         </div>
      </nav>
   )
}
