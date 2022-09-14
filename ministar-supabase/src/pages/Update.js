import supabase from '../dependant/supabaseClient'
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !method || !rating) {
      setFormError('please provide all field')
      return
    }

    const { data, error } = await supabase
      .from('quotes')
      .update({ title, method, rating })
      .eq('id', id)
      

    if (error) {
      console.log(error)
      setFormError('please provide all field')

    }
    if (data) {
      setFormError(null)
      navigate("/")
    }
  }

  useEffect(() => {
    const fetchQuote = async () => {
      const { data, error } = await supabase
        .from('quotes')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        navigate("/", { replace: true })
      }

      if (data) {

        setTitle(data.title)
        setMethod(data.method)
        setRating(data.rating)
      }
    }

    fetchQuote()
  }, [id, navigate])

  return (
    <div className="page update">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>update quote</button>

        {formError && <p className="error">{formError}</p>}
      </form>

    </div>
  )
}

export default Update