import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import SideBar from "./SideBar";
import axios from "axios";


// function Payment() {
//   const accessToken = useSelector((state) => state.auth.access_token);
//   const [userPayment, setUserPayments] = useState([]);

  
//   useEffect(() => {
//     axios
//       .get(`api/v1/my/cookiee`, {
//         headers: {
//           Access_Token: accessToken,
//         },
//       })
//       .then((res) => {
//         setUserPayments(res.data);
//         console.log(res.data);
//       })
//       .catch((err) => {
//         console.log("회원정보조회못함");
//       });
//   }, [accessToken]);


//   return (
//     <div className="mypage">
//       <SideBar />
//       <section className="pay_box">
//         <div className="pay_header">
//           <div>
//             <span>결제내역</span>
//           </div>
//         </div>
//         {userPayment.length === 1 ? ( // 결제내역이 없는 경우
//           <div className="no_payment">결제내역이 없습니다.</div>
//         ) : (
//         {userPayment.map((payment) => (
//           <div className="pay_item" key={payment.id}>
//             <dl className="pay_list">
//               <div className="pay_label">
//                 <span className="pay_state">결제 완료</span>
//                 <i className="pay_date">결제일 {payment.date} | 결제시간 {payment.time}</i>
//               </div>
//               <strong className="class_title">{payment.courseName}</strong>
//               <strong className="pay_info">결제정보</strong>
//               <div className="class_info">
//                 <dl className="info_details">
//                   <dt>가격</dt>
//                   <dd>{payment.price} 원</dd>
//                   <dt>결제 수단</dt>
//                   <dd>{payment.paymentMethod}</dd>
//                 </dl>
//                 <dl className="info_price">
//                   <dt>결제 금액</dt>
//                   <dd>
//                     {payment.amount} 원
//                     <button type="button" className="payback">
//                       환불 신청
//                     </button>
//                   </dd>
//                 </dl>
//               </div>
//             </dl>
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// }

// export default Payment;



function Payment() {
  const accessToken = useSelector((state) => state.auth.access_token);
  const [userPayment, setUserPayments] = useState([]);
  const paymentMessage = userPayment[0]?.lessonId === 0 ? "결제 내역이 없습니다." : "";


  useEffect(() => {
    axios
      .get(`api/v1/my/cookiee`, {}, {
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
      <section className="pay_box">
        <div className="pay_header">
          <div>
            <span>결제내역</span>
          </div>
        </div>
        {/* {userPayment.length === 0 ? ( // 결제내역이 없는 경우
          <div className="no_payment">결제내역이 없습니다.</div>
        ) : ( */}
          {paymentMessage ? (
          <div className="no_payment">{paymentMessage}</div>
        ) : (
          // 결제내역이 있는 경우
          userPayment.map((payment) => (
            <div className="pay_item" key={payment.id}>
          {/* userPayment.map((payment) => ( */}
            {/* <div className="pay_item" key={payment.id}> */}
              <dl className="pay_list">
                <div className="pay_label">
                  <span className="pay_state">결제상태{payment.payStatus}</span>
                  {/* <i className="pay_date">결제일 {payment.date} | 결제시간 {payment.time}</i> */}
                </div>
                {/* <strong className="class_title">{payment.courseName}</strong> */}
                <strong className="pay_info">결제정보</strong>
                <div className="class_info">
                  <dl className="info_details">
                    {/* <dt>가격</dt>
                    <dd>{payment.totalAmount} 원</dd> */}
                    <dt>과외명</dt>
                    <dd>{payment.lessonTitle} 원</dd>
                    <dt>결제 수단</dt>
                    <dd>{payment.cardInfo}</dd>
                    <dt>결제 승인 완료 시간</dt>
                    <dd>{payment.approvedAt}</dd>
                  </dl>
                  <dl className="info_price">
                    <dt>결제 금액</dt>
                    <dd>
                      {payment.totalAmount} 원
                      <button type="button" className="payback">
                        환불 신청
                      </button>
                    </dd>
                  </dl>
                </div>
              </dl>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default Payment;


