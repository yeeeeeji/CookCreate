import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import SearchResModal from './SearchResModal';
import { setLessonId } from '../../store/lesson/lessonInfo';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lessonId = useSelector((state) => state.lessonSearch.lessonId);
  const [keyword, setKeyword] = useState('');
  const [isexist, setIsExist] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState('');
  const [result, setResult] = useState([]);

  const type = useSelector((state) => state.lessonSearch.type);
  const deadline = useSelector((state) => state.lessonSearch.deadline);
  const order = useSelector((state) => state.lessonSearch.order);
  const category = useSelector((state) => state.lessonSearch.category);

  useEffect(() => {
    axios
      .get(`api/v1/lesson`, {
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

        if (res.data.length > 0 && keyword !== '') {
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

  const search = (e) => {
    const newtyping = e.target.value;
    setKeyword(newtyping);
  };

  const searchResClick = (lessonId) => {
    dispatch(setLessonId(lessonId));
    setIsOpen(false);
    setSelectedLessonId(lessonId);
    navigate(`lesson/${lessonId}`);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="아무거나 검색하세요!"
        value={keyword}
        onChange={(e) => {
          search(e);
        }}
      />
      <div>
        {isexist &&
          isOpen &&
          result.map((obj, idx) => (
            <div onClick={() => searchResClick(obj.lessonId)} key={idx}>
              <SearchResModal
                key={idx}
                lessonTitle={obj.lessonTitle}
                lessonId={obj.lessonId}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchBar;
