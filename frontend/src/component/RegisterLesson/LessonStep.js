import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLessonStepList, setStepValid } from '../../store/lesson/lesson';

function LessonStep() {
  const dispatch = useDispatch();
  const reduxStepList = useSelector((state) => state.lesson.lessonStepList);
  const [stepList, setStepList] = useState([{ stepOrder: 1, stepContent: '' }]);
  const [editingIndex, setEditingIndex] = useState(-1); // 수정 시작할 때는 -1로 초기화

  const [errMsg, setErrMsg] = useState('');
  const stepValid = useSelector((state) => state.lesson.stepValid);

  const handleChange = (index, value) => {
    const updatedList = [...stepList];
    updatedList[index] = { ...updatedList[index], stepContent: value };
    setStepList(updatedList);
  };

  const handleAddInput = () => {
    setStepList((prevList) => [
      ...prevList,
      {
        stepOrder: prevList.length + 1,
        stepContent: '',
      },
    ]);
    setEditingIndex(stepList.length); // 추가된 인덱스로 수정 모드 진입
  };

  const handleRemoveInput = (index) => {
    if (stepList.length > 1) {
      const updatedList = stepList
        .filter((_, i) => i !== index)
        .map((step, i) => ({
          ...step,
          stepOrder: i + 1,
        }));
      setStepList(updatedList);
      setEditingIndex(-1); // 삭제 후 수정 모드 종료
    }
  };

  const handleEditInput = (index) => {
    setEditingIndex(index);
  };

  const handleSaveEdit = () => {
    setEditingIndex(-1);
  };

  const checkStepContentFilled = useCallback(() => {
    return stepList.every((step) => step.stepContent.trim() !== '');
  }, [stepList]);

  useEffect(() => {
    dispatch(setLessonStepList(stepList));
  }, [dispatch, stepList, checkStepContentFilled]);
  
  useEffect(() => {
    setStepList(reduxStepList);
    dispatch(setStepValid(checkStepContentFilled()));
  }, [reduxStepList]);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h3>진행 단계</h3>
        <div style={{ marginLeft: '5px' }}>{stepValid ? '✅' : '🔲'}</div>
      </div>
      <div>
        {stepList.map((step, index) => (
          <div key={index}>
            {editingIndex === index ? (
              <input
                type="text"
                value={step.stepContent}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder={`요리 진행 단계를 입력하세요`}
              />
            ) : (
              <div>
                {step.stepContent}
                <button onClick={() => handleEditInput(index)}>수정</button>
                <button onClick={() => handleRemoveInput(index)}>삭제</button>
              </div>
            )}
            {editingIndex === index && (
              <button onClick={handleSaveEdit}>저장</button>
            )}
          </div>
        ))}
        {errMsg && <p>{errMsg}</p>}
        <p>{checkStepContentFilled() ? '모든 단계가 찼습니다.' : '단계를 모두 입력해주세요.'}</p>
        <button onClick={handleAddInput}>+</button>
      </div>
    </div>
  );
}

export default LessonStep;
