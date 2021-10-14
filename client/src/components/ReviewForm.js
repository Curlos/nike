import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import UserContext from '../contexts/UserContext';
import axios from 'axios'
import moment from 'moment'

const ReviewForm = () => {
  
  const { loggedInUser } = React.useContext(UserContext)
  const history = useHistory()
  const [currShoe, setCurrShoe] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [rating, setRating] = useState(0)
  const [recommended, setRecommended] = useState(true)
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const { brand, shoeID } = useParams()
  const SERVER_URL = 'https://sneakers-server.herokuapp.com'

  if (!loggedInUser || Object.keys(loggedInUser).length === 0) {
    history.push('/')
  }
  

  useEffect(() => {
    axios.get(`${SERVER_URL}/sneakers/shoe/${brand}/${shoeID}`).then((response, err) => {
      if (err) console.error(err)

      setCurrShoe(...response.data)
      setIsLoading(false)
    })
  }, [])

  const handleRatingChange = (newRating) => {
    setRating(newRating)
  };

  const handleRecommendedChange = (e) => {
    setRecommended(e.target.value === 'yes' ? true : false)
  };

  const handleSummaryChange = (e) => {
    setSummary(e.target.value)
  }; 

  const handleContentChange = (e) => {
    setContent(e.target.value)
  };

  const handleSubmitReview = async () => {
    const reviewBody = {
      rating: rating,
      recommended: recommended,
      summary: summary,
      content: content,
      author: loggedInUser,
      date: moment().format('MMMM Do, YYYY')
    }

    // const response = await axios.get(`http://localhost:3001/reviews/${brand.toUpperCase()}/${currShoe.sneakerID}`, reviewBody)

    const response = await axios.post(`http://localhost:3001/reviews/review/${brand.toUpperCase()}/${currShoe.sneakerID}`, reviewBody)

    console.log(response)



    console.log(reviewBody)
  }

  return (
    <div class="reviewFormContainer">
      {isLoading ? 'Loading...' :
      (
        <span>
          <div className="reviewIntro">WRITE YOUR REVIEW</div>
      
          <div className="currShoeContainer">
            <div className="shoeName">{currShoe.name}</div>
            <img src={currShoe.image.small} alt={currShoe.name} />
          </div>

          <div className="productThoughts">
            <div>
              <div>YOUR OVERALL RATING</div>
              <div>Please select</div>
              <ReactStars
                count={5}
                onChange={handleRatingChange}
                size={24}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
                value={rating}
              />
            </div>

            <div className="right">
              <div>WOULD YOU RECOMMEND THIS PRODUCT?</div>
              
              <div>
                <input type="radio" id="yes" name="yes" value="yes" onClick={handleRecommendedChange} checked={recommended}/>
                <label for="huey">Yes</label>
              </div>

              <div>
                <input type="radio" id="no" name="no" value="no" onClick={handleRecommendedChange} checked={!recommended}/>
                <label for="huey">No</label>
              </div>

            </div>
          </div>

          <div className="">YOUR REVIEW</div>
          <div>
            <div className="inputContainer">
              <input type="text" placeholder="Summary *" className="summaryInput" value={summary} onChange={handleSummaryChange} required/>
              <div>What's your opinion in one sentence? Example: Best purchase ever.</div>
            </div>

            <div>
              <textarea placeholder="Your Review *" className="reviewText" value={content} onChange={handleContentChange} required/>
            </div>
          </div>

          <button className="submitReviewButton" onClick={handleSubmitReview}>SUBMIT REVIEW <i class="fas fa-arrow-right"></i></button>

          

        </span>
      )}


    </div>
  )
}

export default ReviewForm;