import styled from "@emotion/styled";
import React, {useState,useEffect} from "react";
// import React, {useState} from "react";
import StarInput from "./StarInput";
import { useSelector } from "react-redux";
import axios from "axios";

const Base = styled.section`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Name = styled.span`
  font-size: 1.4rem;
  line-height: 100%;
`;

const RatingValue = styled.span`
  font-size: 1.2rem;
  line-height: 100%;
`;

const RatingField = styled.fieldset`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  border: none;
  transform: translateY(2px);

  input:checked ~ label,
  labeL:hover,
  labeL:hover ~ label {
    transition: 0.2s;
    color: orange;
  }
`;


function ReviewForm({onClose, onClickRating }) {

  const accessToken = useSelector((state) => state.auth.access_token);
  console.log(accessToken)
  const [reviewContents, setreviewContents] = useState("");
  const  [rating, setRating] = useState("0");
  const lessonId = 4

  const data = {
    lessonId:parseInt(lessonId),
    rating: parseFloat(rating),
    reviewContents:reviewContents
  }

  const handleClickRating = (value) => {
    console.log("별점",value)
    setRating(value);
    console.log(rating)
  };

  useEffect(() => {
    console.log("별점 변경됨", rating);
  }, [rating]);


  const handleSubmit = (e) => {
    e.preventDefault();

    // onsubmit(reviewContents, rating)
    //api
    axios
    .post(`api/v1/review`, data, {
      headers: {
        Access_Token: accessToken,
      },
    })
    .then((res) => {
      console.log(res.data);
      alert('리뷰가 등록되었습니다.');
    })
    .catch((err) => {
      console.log("리뷰등록못함", err);
    });

  };



  return (
    <div>
      <button type="submit" onClick={onClose}>X</button>
      <h2>리뷰 등록</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="lectureName">강의명:</label>
        </div>
        <div>
        <Base>
            <Name>별점</Name>
            <RatingField>
              <StarInput required
                onClickRating={handleClickRating}
                value={5.0}
                isHalf={false}
              />
              <StarInput
                onClickRating={handleClickRating}
                value={4.5}
                isHalf={true}
              />
              <StarInput
                onClickRating={handleClickRating}
                value={4.0}
                isHalf={false}
              />
              <StarInput
                onClickRating={handleClickRating}
                value={3.5}
                isHalf={true}
              />
              <StarInput
                onClickRating={handleClickRating}
                value={3.0}
                isHalf={false}
              />
              <StarInput
                onClickRating={handleClickRating}
                value={2.5}
                isHalf={true}
              />
              <StarInput
                onClickRating={handleClickRating}
                value={2}
                isHalf={false}
              />
              <StarInput
                onClickRating={handleClickRating}
                value={1.5}
                isHalf={true}
              />
              <StarInput
                onClickRating={handleClickRating}
                value={1}
                isHalf={false}
              />
              <StarInput
                onClickRating={handleClickRating}
                value={0.5}
                isHalf={true}
              />
              </RatingField>
            <RatingValue>{rating}</RatingValue>
          </Base>
        </div>
        <div>
          <label htmlFor="reviewContents"></label>
          <textarea
            id="reviewContents"
            value={reviewContents}
            onChange={(e) => setreviewContents(e.target.value)}
          />
        </div>
        <button type="submit">등록</button>
      </form>
    </div>
  );
}
export default ReviewForm;