import React, { useContext, useState, useEffect } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm() {

    const [text, setText] = useState("")
    const [rating, setRating] = useState(5)
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState("")

    const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext)


    const handleTextChange = (e) => {
        if (text === '') {
            setBtnDisabled(true)
            setMessage(null)
        } else if (text !== '' && text.length <= 10) {
            setBtnDisabled(true)
            setMessage("Text must be atleast 10 Charaters")
        } else {
            setMessage(null)
            setBtnDisabled(false)
        }
        setText(e.target.value)
    }


    const handleOnSubmit = (e) => {
        e.preventDefault()
        if (text.trim().length > 10) {
            const newFeedback = { text: text, rating: rating }
            if (feedbackEdit.edit === true) {
                updateFeedback(feedbackEdit.item.id, newFeedback)
            } else {
                addFeedback(newFeedback)
            }
        }
        setText("")
    }


    useEffect(() => {
        if (feedbackEdit.edit === true) {
            setBtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit])

    return (
        <Card>
            <form onSubmit={handleOnSubmit}>
                <h2>How Would You Rate Your Service With Us</h2>
                <RatingSelect select={(rating) => setRating(rating)} />
                <div className="input-group">
                    <input type='text' value={text} onChange={handleTextChange} placeholder='write your feedback here' />
                    <Button type="submit" isDisabled={btnDisabled}>Send</Button>
                </div>
                {message && <div className='message'>{message}</div>}
            </form>
        </Card>
    )
}

export default FeedbackForm