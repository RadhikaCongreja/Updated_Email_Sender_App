import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmailForm from "./EmailForm";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Routes */}
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<EmailForm />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
