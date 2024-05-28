'use client';
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import React from "react";


export default function login() {
  const router=useRouter()
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  })


  const onlogin = async () => {
    try{
      const response=await axios.post("/api/users/login",user)
      console.log(response.data)
      router.push('/profile')
    }
    catch(error){
      console.log("error occured")
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="email"
        type="text"
        value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email" />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="password"
        type="password"
        value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password" />
      <button
        onClick={onlogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Signup</button>
        <Link href="/signup">Visit Signup</Link>
    </div>
  )
}
