import React from 'react'
import Hero from '../components/Hero';
import "../App.css";
import Banner from '../components/Banner';
import {Link} from "react-router-dom";
import Services from '../components/Services';
import FeaturedRooms from '../components/FeaturedRooms';

export default function Home() {
    return (
        <div>
            <Hero>
                <Banner
                title="luxurious rooms"
                subtitle="get luxurious rooms starting at Rs2000"

                >
                    <Link to="/rooms" className="btn-primary">Our Rooms</Link>
                </Banner>
            </Hero>
            <Services/>
            <FeaturedRooms/>
        </div>
        
        
    )
}
