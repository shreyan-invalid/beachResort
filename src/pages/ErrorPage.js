import React from 'react'
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';

export default function ErrorPage() {
    return (
        <Hero>
            <Banner title="Error 404"
                subtitle="Sorry this page is not available"

            >
                <Link className="btn-primary" to="/">Head to Home</Link>
            </Banner>
        </Hero>
    )
}
