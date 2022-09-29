import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../dependant/supabaseClient'




const Create = () => {

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !method || !rating) {
      setFormError('please provide a quote')
      return
    }
    const { data, error } = await supabase
      .from('quotes')
      .insert([{ title, method, rating }])

    if (error) {
      setFormError('please insert quotes')
    }
    if (data) {
      setFormError(null)
      navigate('/')
    }
  }

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
        placeholder="Enter a title"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea
        placeholder='Enter a quote'
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
        placeholder='Your ratiing'
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Create quotes</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create