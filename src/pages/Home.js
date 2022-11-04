import React from 'react'
import Navbar from '../components/Navbar'

function Home() {
    return (
        <div className="container">
            <Navbar></Navbar>
            <div className="body">
                <div className="body-text">
                    <h1>data center</h1>
                    <p>
                        explore different visualization of <br />
                        data represented of our climate
                    </p>
                </div>
                <div className="visualization-views"></div>
            </div>
        </div>
    )
}

export default Home
