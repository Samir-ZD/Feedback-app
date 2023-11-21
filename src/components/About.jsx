import React from 'react'
import Card from './shared/Card'
import { Link } from 'react-router-dom'

function About() {
  return (
    <Card>
        <div className="about">
            <h1>About This Project</h1>
            <p>This React App is to share and rate Feedback</p>
            <span>Github: <a href='https://github.com/Samir-ZD' target="_blank">@Samir-zd</a></span>
            <p><Link to='/'>Home</Link></p>
        </div>
    </Card>
  )
}

export default About