import React from "react";
import SideBar from "./SideBar";

function Payment() {
  return (
    <div className="mypage">
      <SideBar />
      <section className="pay_box">
        <div className="pay_header">
          <div>
            <span>결제내역</span>
          </div>
        </div>
        <div className="pay_item">
          <dl className="pay_list">
            <div className="pay_label">
              <span className="pay_state">결제 완료</span>
              <i className="pay_date">결제일 2020.09.22 | 결제시간 12:44</i>
            </div>
            <strong className="class_title">요리 강좌 이름</strong>
            <strong className="pay_info">결제정보</strong>
            <div className="class_info">
              <dl className="info_details">
                <dt>가격</dt>
                <dd>349,000 원</dd>
                <dt>결제 수단</dt>
                <dd>카드결제</dd>
              </dl>
              <dl className="info_price">
                <dt>결제 금액</dt>
                <dd>
                  55,000 원
                  <button type="button" className="payback">
                    환불 신청
                  </button>
                  <div className="payback">
                    <button className="">환불신청</button>
                  </div>
                </dd>
              </dl>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}

export default Payment;

