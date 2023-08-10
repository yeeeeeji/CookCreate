import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchResModal from "./SearchResModal";
import "../../style/searchBar.css";
import { setLessonId } from "../../store/lesson/lessonInfo";
import { useNavigate, useLocation } from "react-router-dom";
import { setCategories, setDeadLine, setOrder, setType } from "../../store/lesson/lessonSearch";
import { BiSearch } from "react-icons/bi";

function SearchBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const lessonId = useSelector((state) => state.lessonSearch.lessonId);
  const [keyword, setKeyword] = useState("");
  const [isexist, setIsExist] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState([]);

  const deadline = true;
  const type = "title";
  const order = "title";
  const category = [];

  useEffect(() => {
    axios
      .get(`/api/v1/lesson`, {
        params: {
          type,
          keyword,
          deadline,
          order,
          category,
        },
      })
      .then((res) => {
        setResult(res.data);
        console.log(result);
        if (result.length > 0 && keyword !== "") {
          setIsExist(true);
          setIsOpen(true);
        } else {
          setIsExist(false);
          setIsOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [keyword]);

  useEffect(() => {
    setIsExist(result.length > 0 && keyword !== '');
    setIsOpen(result.length > 0 && keyword !== '');
  }, [result, keyword]);

  const searchResClick = (lessonId) => {
    dispatch(setLessonId(lessonId));
    setIsOpen(false);
    navigate(`lesson/${lessonId}`);

    dispatch(setCategories([]));
    dispatch(setType("all"));
    dispatch(setKeyword(""));
    dispatch(setOrder("title"));
    dispatch(setDeadLine(true));
  };

  return (
    <div className="mainSearchContainer">
      <div className="mainSearch-wrap">
        <BiSearch className="mainSearchIcon" />
        <input
          type="text"
          className="searchBar"
          placeholder="요리를 검색해보세요!"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
      </div>
      <div>
        {isexist &&
          isOpen &&
          result.map((obj, idx) => (
            <div onClick={() => searchResClick(obj.lessonId)} key={idx}>
              <SearchResModal key={idx} lessonTitle={obj.lessonTitle} lessonId={obj.lessonId} />
            </div>
          ))}
        </div>
    </div>
  );
}

export default SearchBar;