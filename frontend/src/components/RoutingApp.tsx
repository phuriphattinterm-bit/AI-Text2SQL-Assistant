import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';

const RoutingApp: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gray-100">
                {/* Nav Bar and Links */}
                <nav className="bg-blue-500 p-4">
                    <ul className="flex space-x-4">
                        {/* 2.3.4) Link */}
                        <li><Link to="/" className="text-white hover:underline">Home</Link></li>
                    </ul>
                </nav>
                {/* Routes and Route Handling */}
                <div className="max-w-4xl mx-auto">
                    {/* 2.2.2) Routes */}
                    <Routes>
                        {/* 2.2.3) Route and path */}
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default RoutingApp;