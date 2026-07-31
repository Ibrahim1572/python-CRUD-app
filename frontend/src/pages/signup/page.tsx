import { useState } from "react"
import axios from 'axios'
import toast from 'react-hot-toast'
import React from "react"

export default function Signup(){
    const [email ,setEmail] = useState()
    const [password, setPassword] = useState()
    const [username, setUsername] = useState()
    const [role, setRole] = useState('standard')

    const onSignup= async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const emailVal = form.get('email') as string
        const passwordVal = form.get('password') as string
        const userNameVal = form.get('username') as string
        // setEmail(emailVal)
        // setPassword(passwordVal)
        const response = axios.post('/api/signup', {'email':emailVal, 'password':passwordVal ,'userName': userNameVal, 'role':role  })
        toast.success("signed up")
        console.log('signed up')
        window.location.href = "/login";
    }

    const handleOptionChange = (e:any)=>{
        setRole(e.target.value)
    }

    return (
        <div className="login-container">
            <div className="login-card">
            
            {/* Header Section */}
            <div className="login-header">
                <h2>Welcome Back</h2>
                <p>Please enter your details to sign up</p>
            </div>

            {/* Form Section */}
            <form onSubmit={onSignup} className="login-form">
                
                {/* Username Field */}
                <div className="form-group">
                <label htmlFor="username">username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="JohnDoe"
                    value={username}
                    // onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>

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

                <h3>Choose a Role:</h3>

                {/* Radio Option 1 */}
                <label>
                    <input
                        type="radio"
                        name="Role" // Same name groups them together
                        value="standard"
                        checked={role === 'standard'} // Controlled state logic
                        onChange={handleOptionChange}
                    />
                    Standard
                </label>

                <br />

                {/* Radio Option 2 */}
                <label>
                    <input
                        type="radio"
                        name="role"
                        value="admin"
                        checked={role === 'admin'}
                        onChange={handleOptionChange}
                    />
                    Admin
                </label>
                <br/>

                {/* Action Button */}
                <button type="submit" className="btn-login">
                Sign Up
                </button>

            </form>

            </div>
        </div>
        );

}