import React, {useState} from 'react';
import { setKeyword, setType } from '../../store/lesson/lessonSearch';
import { useDispatch } from 'react-redux';
function SearchBar() {
  const dispatch = useDispatch()
  const [inputKeyword, setInputKeyword] = useState('')
  const [selectedType, setSelectedType] = useState('all')

  const handleSearchBar = (e) => {
    const newKeyword = e.target.value;
    setInputKeyword(newKeyword);
    dispatch(setKeyword(newKeyword))
  }

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setSelectedType(newType);
    dispatch(setType(newType))
  }
  return (
    <div>
      <div style={{display : 'flex', alignItems : 'center'}}>
        <div>
          전체 보기
        </div>
        <select
          onChange={handleTypeChange}
          value={selectedType}
          style={{ marginLeft: '10px' }}
        >
          <option value="all">전체</option>
          <option value="title">제목</option>
          <option value="cookyer">Cookyer</option>
          <option value="ingre">재료</option>
        </select>

        <input type="text"
          placeholder='배우고 싶은 요리를 검색해보세요!'
          style={{width : '400px'}}
          onChange={handleSearchBar}
          value={inputKeyword}
        />
      </div>
    </div>
  );
}

export default SearchBar;