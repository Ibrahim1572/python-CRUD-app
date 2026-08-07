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
        <div
            style={{
                minHeight: "100vh",
                width: "100%",
                backgroundColor: "#000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 24px",
                fontFamily: "'LamboType', Roboto, 'Helvetica Neue', Arial, sans-serif",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "440px",
                    backgroundColor: "#202020",
                    borderRadius: 0,
                    padding: "56px 40px",
                    borderBottom: "1px solid #202020",
                }}
            >

                {/* Header Section */}
                <div style={{ marginBottom: "40px" }}>
                    <h2
                        style={{
                            margin: 0,
                            color: "#FFFFFF",
                            fontSize: "40px",
                            lineHeight: 1.15,
                            fontWeight: 400,
                            textTransform: "uppercase",
                            letterSpacing: "normal",
                        }}
                    >
                        Welcome Back
                    </h2>
                    <p
                        style={{
                            marginTop: "12px",
                            marginBottom: 0,
                            color: "#7D7D7D",
                            fontSize: "16px",
                            lineHeight: 1.5,
                            fontWeight: 400,
                        }}
                    >
                        Please enter your details to sign up
                    </p>
                </div>

                {/* Form Section */}
                <form
                    onSubmit={onSignup}
                    style={{ display: "flex", flexDirection: "column", gap: "24px" }}
                >

                    {/* Username Field */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <label
                            htmlFor="username"
                            style={{
                                color: "#FFFFFF",
                                fontSize: "12px",
                                fontWeight: 500,
                                textTransform: "uppercase",
                                letterSpacing: "0.96px",
                                lineHeight: 1.83,
                            }}
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="JohnDoe"
                            value={username}
                            // onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                backgroundColor: "#000000",
                                border: "1px solid #494949",
                                borderRadius: 0,
                                color: "#FFFFFF",
                                fontSize: "16px",
                                fontFamily: "inherit",
                                padding: "16px",
                                outline: "none",
                            }}
                        />
                    </div>

                    {/* Email Field */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <label
                            htmlFor="email"
                            style={{
                                color: "#FFFFFF",
                                fontSize: "12px",
                                fontWeight: 500,
                                textTransform: "uppercase",
                                letterSpacing: "0.96px",
                                lineHeight: 1.83,
                            }}
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="name@company.com"
                            value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                backgroundColor: "#000000",
                                border: "1px solid #494949",
                                borderRadius: 0,
                                color: "#FFFFFF",
                                fontSize: "16px",
                                fontFamily: "inherit",
                                padding: "16px",
                                outline: "none",
                            }}
                        />
                    </div>

                    {/* Password Field */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <label
                            htmlFor="password"
                            style={{
                                color: "#FFFFFF",
                                fontSize: "12px",
                                fontWeight: 500,
                                textTransform: "uppercase",
                                letterSpacing: "0.96px",
                                lineHeight: 1.83,
                            }}
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                backgroundColor: "#000000",
                                border: "1px solid #494949",
                                borderRadius: 0,
                                color: "#FFFFFF",
                                fontSize: "16px",
                                fontFamily: "inherit",
                                padding: "16px",
                                outline: "none",
                            }}
                        />
                    </div>

                    {/* Role Selection */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <h3
                            style={{
                                margin: 0,
                                color: "#FFFFFF",
                                fontSize: "12px",
                                fontWeight: 500,
                                textTransform: "uppercase",
                                letterSpacing: "0.96px",
                                lineHeight: 1.83,
                            }}
                        >
                            Choose a Role
                        </h3>

                        <div style={{ display: "flex", flexDirection: "row", gap: "24px" }}>

                            {/* Radio Option 1 */}
                            <label
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    color: "#F5F5F5",
                                    fontSize: "14px",
                                    fontWeight: 400,
                                    cursor: "pointer",
                                }}
                            >
                                <input
                                    type="radio"
                                    name="Role" // Same name groups them together
                                    value="standard"
                                    checked={role === 'standard'} // Controlled state logic
                                    onChange={handleOptionChange}
                                    style={{ accentColor: "#FFC000" }}
                                />
                                Standard
                            </label>

                            {/* Radio Option 2 */}
                            <label
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    color: "#F5F5F5",
                                    fontSize: "14px",
                                    fontWeight: 400,
                                    cursor: "pointer",
                                }}
                            >
                                <input
                                    type="radio"
                                    name="role"
                                    value="admin"
                                    checked={role === 'admin'}
                                    onChange={handleOptionChange}
                                    style={{ accentColor: "#FFC000" }}
                                />
                                Admin
                            </label>

                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        type="submit"
                        style={{
                            marginTop: "8px",
                            backgroundColor: "#FFC000",
                            color: "#000000",
                            border: "none",
                            borderRadius: 0,
                            padding: "24px",
                            fontSize: "16px",
                            fontWeight: 400,
                            textTransform: "uppercase",
                            letterSpacing: "normal",
                            cursor: "pointer",
                            transition: "background-color 0.15s ease",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#917300"
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#FFC000"
                        }}
                    >
                        Sign Up
                    </button>
                    <button 
                        type="submit"
                        onClick={()=>{window.location.href = '/login'}}
                        style={{
                            marginTop: "8px",
                            backgroundColor: "#202020",
                            color: "#FFFFFF",
                            border: "1px solid #494949",
                            borderRadius: 0,
                            padding: "24px",
                            fontSize: "16px",
                            fontWeight: 400,
                            textTransform: "uppercase",
                            letterSpacing: "normal",
                            cursor: "pointer",
                            transition: "background-color 0.15s ease",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1EAEDB" 
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#202020"
                        }}
                    >
                        Sign In
                    </button>

                </form>

            </div>
        </div>
        );

}