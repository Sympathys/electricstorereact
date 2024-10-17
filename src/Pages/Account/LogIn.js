import React, { useState } from "react";

const LogIn = () => {
    //Luu bien account va password nguoi dung nhap
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    //Luu loi voi account va password
    const [errAccount, setErrAcc] = useState("");
    const [errPassword, setErrPassword] = useState("");
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className = "w-1/2 hidden lgl:inline-flex h-full text-white">
                <div className = "w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
                    <div className = "flex flex-col gap-1 -mt-1">
                        <h1 className="font-titleFont text-xl font-medium">
                            Log in in here
                        </h1> 
                    </div>
                    <div className="w-[300px] flex items-start gap-3">
                    <p className="text-base text-gray-300">
                        <span className="text-white font-semibold font-titleFont">
                            Get started fast with OREBI
                        </span>
                        <br />
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
                        nisi dolor recusandae consectetur!
                    </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LogIn;