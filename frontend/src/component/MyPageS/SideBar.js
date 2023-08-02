import {  Link } from "react-router-dom";
// import { Route, Routes, Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import "../../style/sidebar.css";

// import Account from "./Account";
// import Calendar from "./Calendar";
// import LikeList from "./LikeList";
// import Payment from "./Payment";
// import RecipeBook from "./RecipeBook";
// import Review from "./Review";
// import ClassList from "./ClassList";

function SideBar() {
  return (
    <div>
      <nav className="Side">
        <div className="Side_container">
          <div className="sidebar" id="sidebarNav">
            <ul className="sidebar_items">
              <div className="side-item">
                <Link to="/account">정보수정</Link>
              </div>
              <div className="side-item">
                <Link to="/payment">결제내역</Link>
              </div>
              <div className="side-item">
                <Link to="/classList">과외목록</Link>
              </div>
              <div className="side-item">
                <Link to="/review">리뷰목록</Link>
              </div>
              <div className="side-item">
                <Link to="/likeList">찜목록</Link>
              </div>
              <div className="side-item">
                <Link to="/recipeBook">레시피북</Link>
              </div>
              <div className="side-item">
                <Link to="/calendar">캘린더</Link>
              </div>
            </ul>
          </div>
        </div>
      </nav>
      {/* <Routes>
        <Route path="/calendar" element={<Calendar />}/>
        <Route path="/classList" element={<ClassList />}/>
        <Route path="/likeList" element={<LikeList />}/>
        <Route path="/payment" element={<Payment />}/>
        <Route path="/recipeBook" element={<RecipeBook />}/>
        <Route path="/review" element={<Review />}/>
        <Route path="/account" element={<Account />}/>
      </Routes> */}
    </div>
  );
}

export default SideBar;
