import supabase from '../dependant/supabaseClient'
import React from 'react'
import { Link } from 'react-router-dom'

const QuoteCard = ({ quote, onDelete }) => {


  const handleDelete = async () => {
    const { data, error } = await supabase
      .from('quotes')
      .delete()
      .eq('id', quote.id)

    if (error) {
      console.log(error)
    }
    if (data) {
      console.log(data)
      onDelete(quote.id)
    }
  }




  return (
    <div className='quote-card'>
      <h3>{quote.title}</h3>
      <p>{quote.method}</p>
      <div className='rating'>{quote.rating}</div>

      <div className='button'>
        <Link to={'/' + quote.id}>
          <i className='material-icons'>edit</i>
        </Link>

        <i className='material-icons' onClick={handleDelete}>delete</i>
      </div>
    </div>
  )
}

export default QuoteCard