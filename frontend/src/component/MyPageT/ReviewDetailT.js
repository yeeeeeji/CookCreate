// import React from 'react'
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';


export default function ReviewDetailT({ reviewId,onClose}) {
  const accessToken = useSelector((state) => state.auth.access_token);
  const [selectedReview, setSelectedReview] = useState("");


  useEffect(() => {
    handleViewDetail();
  },  [reviewId] );

  
  //리뷰상세정보 조회
  const handleViewDetail = () => {
    axios
      .get(`api/v1/review/detail/${reviewId}`, {
        headers: {
          Access_Token: accessToken,
        },
      })
      .then((res) => {
        console.log("리뷰상세정보", res.data);
        setSelectedReview(res.data);
        console.log("selectedReview",selectedReview);
      })
      .catch((err) => {
        console.log("상세 정보 요청 실패", err);
      });
  };

   

  return (
    <div className="modal-content">
      <button type="submit" onClick={onClose}>❌</button>
    <h2 className="modal-title">리뷰 상세 정보</h2>
    <div className="review-details">
      <div className="review-field">
        <label htmlFor="lessonTitle">강좌 이름:{selectedReview.lessonTitle}</label>
      </div>
      <div className="review-field">
        <label htmlFor="lessonTitle">선생님 아이디:{selectedReview.cookyerId}/선생님 성함:{selectedReview.cookyerName}</label>
      </div>
      <div className="review-field">
        <label htmlFor="rating">평점:{selectedReview.rating}</label>
      </div>
      <div className="review-field">
        <label htmlFor="rating">유저아이디:{selectedReview.userId}/유저닉네임:{selectedReview.nickname}</label>
      </div>
      <div className="review-field">
        <label htmlFor="reviewContents">리뷰 내용:{selectedReview.reviewContents}</label>
      </div>
      <div className="review-field">
        <label htmlFor="reviewContents">생성날짜:{selectedReview.createdDate}</label>
      </div>
      <div className="review-field">
        <label htmlFor="reviewContents">수정날짜:{selectedReview.modifiedDate}</label>
      </div>
    </div>
  </div>
);
}

