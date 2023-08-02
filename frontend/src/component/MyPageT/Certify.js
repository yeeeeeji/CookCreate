// import React from 'react';

// function Certify() {
//   return (
//     <div>
//       <article>
//         <div className='content_info'>
//           <h3>자격증등록</h3>
//         </div>
//         <article className='content_input'>
//           <table className='board_write'>
//             <colgroup>
//               <col className='width200'></col>
//               <col className='widthauto'></col>
//             </colgroup>
//             <tbody>
//               <tr>
//                 <th scope='row'>자격구분</th>
//                 <th>
//                   <div className='inputRadioWrap'>
//                     <span>
//                       <input id="searchQulCpCd1" name="searchQulCpCd" type="radio" value="0000"></input>
//                       <label for="searchQulCpCd1" title="전체">공인</label>
//                       <input id="searchQulCpCd1" name="searchQulCpCd" type="radio" value="0000"></input>
//                       <label for="searchQulCpCd1" title="전체">민간</label>
//                       <input id="searchQulCpCd1" name="searchQulCpCd" type="radio" value="0000"></input>
//                       <label for="searchQulCpCd1" title="전체">사업자 등록증</label>
//                     </span>
//                   </div>
//                 </th>
//               </tr>
//               <tr>
//                 <th scope="row">등록번호</th>
//                 <td>
//                   <label for="searchQulRegYy" className="hidden">등록연도 선택</label>
//                   <select id="searchQulRegYy" name="searchQulRegYy" className="selectText width150" title="등록연도 선택">
//                     <option value="0000" selected="selected">등록연도</option>
//                     <option value="2023">2023</option>
//                     <option value="2022">2022</option>
//                     <option value="2021">2021</option>
//                     <option value="2020">2020</option>
//                     <option value="2019">2019</option>
//                     <option value="2018">2018</option>
//                     <option value="2017">2017</option>
//                     <option value="2016">2016</option>
//                     <option value="2015">2015</option>
//                     <option value="2014">2014</option>
//                     <option value="2013">2013</option>
//                     <option value="2012">2012</option>
//                     <option value="2011">2011</option>
//                     <option value="2010">2010</option>
//                     <option value="2009">2009</option>
//                     <option value="2008">2008</option>
//                   </select> - 
//                   <label for="searchQulRegNum" className="hidden">등록번호 입력</label> 
//                   <input id="searchQulRegNum" name="searchQulRegNum" className="inputText width150" title="등록번호 입력" onkeypress="only_number();" type="text" value="" maxlength="6"></input>
//                 </td>
//               </tr>
//               <tr>
// 								<th scope="row">
//                   <label for="searchQulNm">자격명</label>
//                 </th>
// 								<td>
//                   <input id="searchQulNm" name="searchQulNm" className="inputText width100p" style="ime-mode:active;" title="자격명 입력" type="text" value=""></input>
//                 </td>
// 							</tr>
//             </tbody>
//           </table>
//         </article>
//       </article>
//     </div>
//   );
// }

// export default Certify;



import React from 'react';
import SideBar from "./SideBar";


function Certify() {

  const onlyNumber = (e) => {
    const inputChar = String.fromCharCode(e.charCode);
    if (!/^\d+$/.test(inputChar)) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <SideBar/>
      <article>
        <div className='content_info'>
          <h3>자격증등록</h3>
        </div>
        <article className='content_input'>
          <table className='board_write'>
            <colgroup>
              <col className='width200'></col>
              <col className='widthauto'></col>
            </colgroup>
            <tbody>
              <tr>
                <th scope='row'>자격구분</th>
                <td>
                  <div className='inputRadioWrap'>
                    <span>
                      <input id="searchQulCpCd1" name="searchQulCpCd" type="radio" value="0000" />
                      <label htmlFor="searchQulCpCd1" title="전체">공인</label>
                      <input id="searchQulCpCd2" name="searchQulCpCd" type="radio" value="0001" />
                      <label htmlFor="searchQulCpCd2" title="전체">민간</label>
                      <input id="searchQulCpCd3" name="searchQulCpCd" type="radio" value="0002" />
                      <label htmlFor="searchQulCpCd3" title="전체">사업자 등록증</label>
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">등록번호</th>
                <td>
                  <label htmlFor="searchQulRegYy" className="hidden"></label>
                  <select id="searchQulRegYy" name="searchQulRegYy" className="selectText width150" title="등록연도 선택">
                    <option value="0000" selected="selected">등록연도</option>
                    <option value="2023">2023</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2009">2009</option>
                    <option value="2008">2008</option>
                  </select>{" "}
                  -
                  <label htmlFor="searchQulRegNum" className="hidden">등록번호 입력</label>
                  <input id="searchQulRegNum" name="searchQulRegNum" className="inputText width150" title="등록번호 입력" onKeyPress={(e) => onlyNumber(e)} type="text" value="" maxLength="6" />
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <label htmlFor="searchQulNm">자격명</label>
                </th>
                <td>
                  <input id="searchQulNm" name="searchQulNm" className="inputText width100p" style={{ imeMode: "active" }} title="자격명 입력" type="text" value="" />
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <label htmlFor="searchQulNm">기관명</label>
                </th>
                <td>
                  <input id="searchQulNm" name="searchQulNm" className="inputText width100p" style={{ imeMode: "active" }} title="기관명 입력" type="text" value="" />
                </td>
              </tr>
            </tbody>
          </table>
        </article>
      </article>
        <button>
          제출
        </button>
    </div>
  );
}

export default Certify;