import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome to the home page!</p>
            <NavLink to="/dashboard/home">Go to Home</NavLink>
        </div>
    )
}
export default Home;