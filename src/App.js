import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

//import components
import Home from "./components/Home";
import Create from "./components/Create";
import Edit from "./components/Edit";

function App() {
    return (
        <div className="App">
            <h1 className="plant">Plant&Food Research</h1>
            <h3 className="plant">CRUD APP</h3>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/edit" element={<Edit />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
