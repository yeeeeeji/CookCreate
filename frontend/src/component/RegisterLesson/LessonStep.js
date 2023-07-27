import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLessonStepList } from '../../store/lesson/lesson';

function LessonStep() {
  const dispatch = useDispatch();
  const [stepList, setStepList] = useState([{stepOrder : 1, stepContent:''}]);
  const [errMsg, setErrMsg] = useState('')

  const handleChange = (index, value) => {
    const updatedList = [...stepList];
    updatedList[index] = {...updatedList[index], stepContent : value};
    setStepList(updatedList);
  };

  const handleAddInput = () => {
    if (stepList[stepList.length - 1].stepContent.trim() === '') {
      setErrMsg('마지막 단계를 채워주세요.');
      return;
    }
    setStepList((prevList) => [
      ...prevList,
      {
        stepOrder : prevList.length + 1, stepContent : ''}
      ]);
    setErrMsg('');
  };

  useEffect(() => {
    dispatch(setLessonStepList(stepList));
  }, [dispatch, stepList]);

  return (
    <div>
      <h3>진행 단계</h3>
      <div>
        {stepList.map((step, index) => (
          <div key={index}>
            <input
              type="text"
              value={step.value}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`요리 진행 단계를 입력하세요`}
            />
          </div>
        ))}
        <button onClick={handleAddInput}>+</button>
        {errMsg && <p>{errMsg}</p>}
      </div>
    </div>
  );
}

export default LessonStep;
