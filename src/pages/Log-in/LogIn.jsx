import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpLeft } from 'lucide-react';
import loginPic from '../../assets/Icons/loginPic.png';
import fashyear from '../../assets/Icons/1.png';
import pattern from '../../assets/Icons/pattern.png';
import { useAuth } from '../../context/AuthContext';

const LogIn = () => {
    const navigate = useNavigate();
    const { login, isLoading, error } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');
        
        try {
            const user = await login(email, password);
            // Check if user is admin and redirect accordingly
            if (user.isAdmin) {
                navigate('/admin');
            } else {
                navigate('/profile');
            }
        } catch (err) {
            setLoginError(err.message || 'Failed to login. Please check your credentials.');
        }
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        // Redirect to signup page
        navigate('/signup');
    };

    return (
        <>
            <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-[55%_45%] bg-[#121212] text-white">
                {/* Left Section - Login Form */}
                <div className="flex flex-col justify-center z-10">
                    {/* Header/Logo */}
                    <div className="flex items-center gap-2 absolute top-10 left-30">
                        <Link to="/">
                            <img src={fashyear} draggable="false" className="h-4" />
                        </Link>
                        <span className="text-xs font-light text-neutral-200 uppercase tracking-wide">| LOG IN TO MY ACCOUNT</span>
                    </div>
                    <div className="w-4/5 max-w-md !mx-auto flex flex-col gap-10">

                        {/* Login Header */}
                        <div className='flex flex-col !mt-10 gap-2'>
                            <h1 className="text-3xl tracking-tight font-light">Good to see you again</h1>
                            <p className="text-neutral-400 text-sm">Please log in to your account</p>
                        </div>


                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
                            {/* Error message */}
                            {loginError && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3">
                                    {loginError}
                                </div>
                            )}
                        
                            {/* Email Input */}
                            <div className="relative">
                                <input
                                    type="email"
                                    className="w-full font-light !pl-3 bg-neutral-900 border-0 border-b border-neutral-800 outline-none focus:border-neutral-300 !py-2"
                                    value={email}
                                    placeholder={`Email Address`}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>


                            {/* Password Input */}
                            <div className="relative">
                                {/* Add state for password visibility */}
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full font-light !pl-3 bg-neutral-900 border-0 border-b border-neutral-800 outline-none focus:border-neutral-300 !py-2"
                                    value={password}
                                    placeholder={`Password`}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </button>
                            </div>


                            {/* Buttons */}
                            <div className="flex gap-8 items-center">
                                <button
                                    type="submit"
                                    className="w-full bg-neutral-300 hover:bg-white text-black !py-3 uppercase font-medium"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Logging in...' : 'Log In'}
                                </button>
                            </div>

                            {/* links for password and signups */}
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-row gap-2 text-sm font-light'>
                                    <p className='text-neutral-400 '>Don't have an account ?</p>
                                    <Link to="/signup" className="text-neutral-200 underline underline-offset-2 hover:text-neutral-200">
                                        Create an Account
                                    </Link>
                                </div>

                                {/* Forgot Password Link */}
                                <div className="flex">
                                    <Link to="/forgot-password" className="font-light text-sm text-neutral-200 underline">
                                        Forget Password ?
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Section - Image with models */}
                <div className="md:block h-full w-full relative bg-gray-800 overflow-hidden">
                    {/* Back to home button */}
                    <div className="absolute top-6 left-6 z-20">
                        <Link to="/" className="flex items-center gap-2 bg-neutral-800/60 backdrop-blur-xs !py-2 !px-4 border border-neutral-700">
                            <ArrowUpLeft className='h-5 font-light w-5' />
                            <span className='text-xs font-light uppercase tracking-wide'>Back to Home</span>
                        </Link>
                    </div>

                    {/* Hijab Models Image */}
                    <img
                        src={loginPic}
                        alt="Fashyear Models"
                        className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                </div>
            </div>
        </>
    );
};

export default LogIn;
