import { createContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'


// Creating Context
const FeedbackContext = createContext()

// Create Provider
export const FeedbackProvider = ({ children }) => {

    //Global State: 
    const [feedback, setFeedback] = useState([])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })
    const [isLoading, setIsLoading] = useState(true)

    //Delete Feedback: 
    const deleteFeedback = (id) => {
        if (window.confirm("Are You Sure?")) {
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }
    //Create Feedback:
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }
    //Update Feedback:
    const updateFeedback = (id, newItem) => {
        setFeedback(feedback.map((item) => item.id === id ? {
            ...item, ...newItem
        } : item))
    }

    //Set Item to be updated 
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    //Fetch db.json: 
    const fetchData = async () => {
        const req = await fetch('http://localhost:5000/feedback?_sort=id&_order=desc')
        const res = await req.json()
        setFeedback(res)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    // passing States & Functions to Components:
    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext