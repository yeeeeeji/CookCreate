import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import SideBar from "./SideBar";
import axios from "axios";

function Payment() {

  const accessToken = useSelector((state) => state.auth.access_token);
  const [userPayment, setUserPayments] = useState([]);
  const paymentMessage = userPayment[0]?.lessonId === 0 ? "결제 내역이 없습니다." : "";

  const handleRefund = (lessonId) => {
    axios
      .put(`api/v1/pay/refund/${lessonId}`, {
        headers : {
          Access_Token : accessToken
        },
      })
      .then((res) => {
        console.log(res)
        console.log('환불 성공!')
      })
      .catch((err) => {
        console.log(err)
        console.log('환불 실패')
      })
  }

  useEffect(() => {
    axios
      .get(`api/v1/my/cookiee`, {
        headers: {
          Access_Token: accessToken,
        },
      })
      .then((res) => {
        setUserPayments(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accessToken]);

  return (
    <div className="mypage">
      <SideBar />
      <section className="pay-box">
        <div className="pay-header">
          <div>
            결제내역
          </div>
        </div>
          {paymentMessage ? (
            // 결제 안 한 경우
          <div className="no-payment"> 
            {paymentMessage} 
          </div>
        ) : (
          //결제 한 경우
          userPayment.map((payment) => (
            <div className="pay-item" key={payment.lessonId}>
              <div className="pay-list">
                <div className="pay-label">
                  <div className="pay-state">
                    <div>
                      결제상태
                    </div>
                    <div>
                      {payment.payStatus}
                    </div>
                  </div>
                </div>
                <div className="pay-info">
                  <div className="pay-label">
                    결제정보
                  </div>
                </div>
                <div className="class-info">
                  <div className="info-details">
                    <div>과외명</div>
                    {payment.lessonId}
                    <div>{payment.lessonTitle} 원</div>
                    <div>결제 시간</div>
                    <div>{payment.approvedAt}</div>
                    <div>환불 시간</div>
                    <div>{payment.canceledAt}</div>
                  </div>
                  <div className="info-price">
                    <div>결제 금액</div>
                    <div>
                      {payment.totalAmount} 원
                      <div onClick={() => handleRefund(payment.lessonId)}>
                        강의 취소(환불하기)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default Payment;


