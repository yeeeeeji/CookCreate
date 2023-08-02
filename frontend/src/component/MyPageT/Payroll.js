import React from 'react';
import SideBar from "./SideBar";

function Payroll() {
  return (
    <div>
      <SideBar />
      <h2>정산내역</h2>
        <p>쿠크를 통해 1,100,000원을 벌었어요!</p>
        <p>미완료 정산금:150,000원</p>
      <table>
        <thead>
          <tr>
            <th>날짜</th>
            <th>쿠키 ID</th>
            <th>결제정보</th>
            <th>가격</th>
            <th>결제완료/미완료</th>
          </tr>
        </thead>
        <tbody>
          {/* {settlementData.map((item) => (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.transactionId}</td>
              <td>{item.amount}</td>
              <td>{item.status}</td>
            </tr>
          ))} */}
            <tr >
              <td>date</td>
              <td>transactionId</td>
              <td>amount</td>
              <td>status</td>
            </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Payroll;