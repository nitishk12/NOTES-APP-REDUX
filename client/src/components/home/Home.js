import React from 'react'
import notes from './img/notes.jpg'

function Home(props) {
    return (
        <div style={{
            backgroundImage: `url(${notes})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh'
        }}>
            <h1>Welcome To Notes App</h1>
        </div>
    )
}

export default Home