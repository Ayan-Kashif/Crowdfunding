'use client';

import { useEffect } from "react";
import { useRouter} from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

const Success = () => {
    const router = useRouter();
    


    return (
        <div className="flex flex-col  bg-white items-center justify-center h-screen">
            <ToastContainer />
            <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
            <p className="text-gray-700">Thank you for your support.</p>
        </div>
    );
};

export default Success;
