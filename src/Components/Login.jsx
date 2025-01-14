import React from 'react'
import Header from './Header'
import { useState } from 'react'

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true)
    const toggleSignInForm =()=>{
        setIsSignInForm(!isSignInForm)
    }
  return (
    <div><Header />
    <div className='absolute'>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/154a9550-ce07-4e28-819c-63185dd849f8/web/IN-en-20250106-TRIFECTA-perspective_27b02e7c-f668-4639-9e82-1a5485084b2a_small.jpg" alt ="Netflix-page" />
    </div>
    <div className="flex items-center justify-center h-screen bg-transparent relative">
  <div className="bg-black bg-opacity-80  p-6 rounded-lg shadow-lg w-80">
    <h2 className="text-2xl font-bold mb-4 text-white ">{isSignInForm?"Sign In" : "Sign Up"}</h2>
    <form>
        {!isSignInForm && (
             <div className="mb-4">
             <label for="text" className="block text-white mb-2">Name</label>
             <input type="text" id="text" class="w-full px-4 py-2 border bg-gray-700 rounded-lg focus:outline-none focus:ring-2 " placeholder=" Full Name" />
           </div>
        )}
      <div className="mb-4">
        <label for="email" className="block text-white mb-2">Email</label>
        <input type="text" id="email" class="w-full px-4 py-2 border bg-gray-700 rounded-lg focus:outline-none focus:ring-2 " placeholder="Email Address" />
      </div>
      <div className="mb-4">
        <label for="password" className="block text-white mb-2">Password</label>
        <input type="password" id="password" className="w-full px-4 py-2 border bg-gray-700 rounded-lg focus:outline-none focus:ring-2 " placeholder="Password" />
      </div>
      <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-blue-600">{isSignInForm?"Sign In" : "Sign Up"}</button>
      <p className='py-4 mt-4 text-white cursor-pointer' onClick={toggleSignInForm}>{isSignInForm?"New to Netflix ? Sign Up Now" : "Already Registered ? Sign In Now "} </p>
    </form>
  </div>
</div>
    </div>
  )
}

export default Login