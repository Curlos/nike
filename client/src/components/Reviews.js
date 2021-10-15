import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import axios from 'axios'
import UserContext from '../contexts/UserContext';

const Reviews = () => {

  const { loggedInUser } = React.useContext(UserContext)
  const [currUser, setCurrUser] = useState(loggedInUser)
  const [currShoe, setCurrShoe] = useState({})
  const [reviews, setReviews] = useState({})
  const [authors, setAuthors] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { brand, shoeID } = useParams()

  useEffect(() => {
    const fetchFromAPI = async () => {

      console.log(shoeID)

      const getCurrShoe = async () => {
        await axios.get(`http://localhost:3001/sneakers/shoe/${brand}/${shoeID}`).then((response, err) => {
          if (err) console.error(err)
  
          console.log(response)
          setCurrShoe(...response.data)
        })
      }

      const getAllReviews = async () => {
        const response = await axios.get(`http://localhost:3001/reviews/${brand.toUpperCase()}/${currShoe.sneakerID}`)

        console.log(response.data)
    
        setReviews(response.data)
        await getAllAuthors(response.data)
      }

      const getAllAuthors = async (reviews) => {
        const newAuthors = []
        for (let review of reviews) {
          const response = await axios.get(`http://localhost:3001/users/user/${review.author}`)
          newAuthors.push(response.data)
          console.log(response.data)
        }

        setAuthors(newAuthors)
        setIsLoading(false)
      }
      

      await getCurrShoe()
      await getAllReviews()
    }

    fetchFromAPI()
  }, [])

  const handleFoundHelpful = async (reviewID) => {
    if (!loggedInUser) {
      return
    }

    const body = {
      user: loggedInUser
    }
    const response = await axios.put(`http://localhost:3001/reviews/review/${reviewID}` , body)

    console.log(response)
  }

  console.log(reviews)
  console.log(authors)

  return (
    <div className="shoeReviewsContainer">
      {isLoading ? 'Loading...' : (
        <span>
          <div className="shoeHeader">
            <div>
              <div>{currShoe.name}</div>
              <div>${currShoe.retailPrice}</div>
            </div>
            <div>
              <img src={currShoe.image.original} alt={currShoe.name} />
            </div>
          </div>

          <div className="reviewsNum">
            <ReactStars
              count={5}
              size={24}
              activeColor="#ffd700"
              value={5}
            />
            <div>{currShoe.reviews.length} REVIEWS</div>
          </div>

          {reviews && reviews.map((review, i) => {
            
            
            return (
              <div className="reviewContainer">
                <i class="fas fa-user"></i>
                <span className="author">
                  {!authors[i].firstName && !authors[i].lastName && 'Customer'}
                  {authors[i].firstName ? authors[i].firstName : ''} {authors[i].lastName ? authors[i].lastName : ''}
                </span>
                <ReactStars
                  count={5}
                  size={24}
                  activeColor="#ffd700"
                  value={Number(review.rating)}
                />

                <div className="summary">
                    {review.summary}
                  </div>

                <div className="reviewDate">
                  Reviewed on {review.date}
                </div>
                
                <div className="content">
                  {review.content}
                </div>

                <div className="helpfulNumber">
                  4 people found this helpful
                </div>

                <button onClick={() => handleFoundHelpful(review._id)} className="helpfulButton">Helpful</button>
              </div>
            )
          })}
        </span>
      )}
    </div>
  )
}

export default Reviews;