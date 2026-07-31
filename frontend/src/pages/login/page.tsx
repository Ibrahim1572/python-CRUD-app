import { useState } from "react"
import axios from 'axios'
import toast from 'react-hot-toast'
import React from "react"

export default function Login(){

    const [email ,setEmail] = useState()
    const [password, setPassword] = useState()

    const onlogin= async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const emailVal = form.get('email') as string
        const passwordVal = form.get('password') as string
        // setEmail(emailVal)
        // setPassword(passwordVal)
        const response = axios.post('/api/signin', {'email':emailVal, 'password':passwordVal})
        toast.success("Logged In")
        console.log('logged in')
        window.location.href = "/profile";
    }

    return (
        <div className="login-container">
            <div className="login-card">
            
            {/* Header Section */}
            <div className="login-header">
                <h2>Welcome Back</h2>
                <p>Please enter your details to sign in</p>
            </div>

            {/* Form Section */}
            <form onSubmit={onlogin} className="login-form">
                
                {/* Email Field */}
                <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="name@company.com"
                    value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </div>

                {/* Password Field */}
                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>

                {/* Action Button */}
                <button type="submit" className="btn-login">
                Sign In
                </button>

            </form>

            </div>
        </div>
        );
        
}