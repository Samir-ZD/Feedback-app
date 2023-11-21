import React from 'react'
import spinnerGif from '../assets/spinnerGif.gif'

function Spinner() {
    return (
        <img src={spinnerGif}
            alt='loading...'
            style={{ width: '100px', margin: 'auto', display: 'block' }}
        />
    )
}

export default Spinner