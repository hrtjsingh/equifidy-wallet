import React, { useState } from 'react';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const CreatePassword = ({ passwordHandler }: any) => {
    const [isChecked, setIsChecked] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleSubmit = () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
        } else if (password.length < 8) {
            setError("Password should be at least 8 characters");
        } else {
            setError('');
            passwordHandler(password);
        }
    };

    return (
        <div className='w-full flex flex-col justify-center items-center py-8 mb-6'>
            <div className='w-full mb-8 text-center'>
                <h1 className='text-[40px] font-bold mb-5'>Create a Password</h1>
                <span className='text-lg text-[#969faf] block'>
                    It should be at least 8 characters.
                </span>
                <span className='text-lg text-[#969faf] block'>
                    You'll need this to unlock Equifidy.
                </span>
            </div>

            <div className='w-full space-y-5 mb-6'>
                <div className="relative">
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='h-[52px] pr-10 text-lg px-5 placeholder:text-lg placeholder:text-[#969faf] bg-[#202127]'
                    />
                    <span
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 cursor-pointer right-0 pr-3 flex items-center text-gray-500"
                    >
                        {!showPassword ? (
                            <FaRegEyeSlash className="w-5 h-5" />
                        ) : (
                            <FaRegEye className="w-5 h-5" />
                        )}
                    </span>
                </div>

                <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className='h-[52px] text-lg px-5 placeholder:text-lg placeholder:text-[#969faf] bg-[#202127]'
                />

                {error && (
                    <div className="text-red-500 text-sm mt-2">
                        {error}
                    </div>
                )}
            </div>

            <div className="items-top flex items-start gap-4 space-x-2 mt-9">
                <Checkbox
                    value={isChecked}
                    onCheckedChange={(checked) => setIsChecked(checked ? 1 : 0)}
                    id="terms1"
                    className='h-6 w-6 mt-1'
                />
                <div className="grid gap-1.5 leading-none">
                    <label
                        htmlFor="terms1"
                        className={`${isChecked === 1 ? 'text-gray-500' : 'text-gray-400 '} text-lg font-medium hover:text-gray-500`}
                    >
                        <span>I agree to the </span>
                        <span className='text-blue-500 text-lg font-bold cursor-pointer hover:text-blue-600'>
                            Terms of Service
                        </span>
                    </label>
                </div>
            </div>

            <div className='w-full mt-14 flex items-center justify-center'>
                <Button
                    className='w-64 h-14 font-bold text-lg'
                    onClick={handleSubmit}
                    disabled={isChecked === 0}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default CreatePassword;
