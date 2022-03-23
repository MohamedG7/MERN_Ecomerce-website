import { useEffect } from 'react';
import Announcement from '../Components/Announcement';
import React from 'react';
import NavBar from '../Components/NavBar';
import SliderUI from '../Components/Slider';
import Newsletter from "../Components/NewsLetter";
import Products from '../Components/Products';
import Categories from "../Components/Categories";
import Footer from "../Components/Footer";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";


const Home = () => {
    const user = useSelector((state) => state.user.currentUser);
    return (
        <div>
            <Announcement />
            <NavBar />
            <SliderUI />
            <Categories />
            <Products />
            <Newsletter />
            <Footer />
        </div>
    )
}

export default Home
