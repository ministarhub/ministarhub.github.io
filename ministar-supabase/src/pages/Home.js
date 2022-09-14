import supabase from "../dependant/supabaseClient"
import { useEffect, useState } from "react"
//from component//

import QuoteCard from "../components/QuoteCard"


const Home = () => {

  const [fetchError, setFetchError] = useState(null)
  const [quotes, setQuots] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')


  const handleDelete = (id) => {
    setQuots(prevQuotes => {
      return prevQuotes.filter(qt => qt.id !== id)
    })
  }

  useEffect(() => {
    const fetchQuotes = async () => {
      const { data, error } = await supabase
        .from('quotes')
        .select()
        .order(orderBy, { ascending: false })

      if (error) {
        setFetchError('no quotes')
        setQuots(null)
        console.log(error)
      }
      if (data) {
        setQuots(data)
        setFetchError(null)
      }
    }
    fetchQuotes()
  }, [orderBy])

  return (


    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {quotes && (
        <div className="quotes">

          <div className="order-by">

            <p>Order by:</p>
            <button onClick={() => setOrderBy('created_at')}>Time Created</button>
            <button onClick={() => setOrderBy('title')}>Title</button>
            <button onClick={() => setOrderBy('rating')}>Rating</button>
            {orderBy}
          </div>

          <div className="quote-grid">
            {quotes.map(quote => (
              <QuoteCard key={quote.id} quote={quote}
               onDelete={handleDelete} />

            ))}

          </div>
        </div>
      )}
    </div>
  )
}

export default Home