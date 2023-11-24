import { createContext, useState, useEffect } from 'react'
// import { v4 as uuidv4 } from 'uuid'


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
    const deleteFeedback = async (id) => {
        if (window.confirm("Are You Sure ?")) {
        await fetch(`http://localhost:5000/feedback/${id}`,{
          method:'DELETE',
        })    
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }
    //Create Feedback:
    const addFeedback = async (newFeedback) => {

        const res =  await fetch('http://localhost:5000/feedback',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(newFeedback),
        })
        // newFeedback.id = uuidv4()
        const data = await res.json()
        setFeedback([data, ...feedback])
    }
    //Update Feedback:
    const updateFeedback = async(id, updatedItem) => {

         const res = await fetch(`http://localhost:5000/feedback/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(updatedItem),
         })
         const data = await res.json()
        setFeedback(feedback.map((item) => item.id === id ? {
            ...item, ...data
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