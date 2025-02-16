'use client'

import Link from 'next/link';

const CancelPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-3xl font-bold text-red-600">Payment Canceled</h1>
                <p className="mt-2 text-gray-600">It looks like you canceled the payment process. If you change your mind, you can try again.</p>

                <div className="mt-6 flex gap-4">
                    <Link href="/" className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition">
                        Go to Home
                    </Link>
                    <Link href="/projects" className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
                        Back to Projects
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CancelPage;
