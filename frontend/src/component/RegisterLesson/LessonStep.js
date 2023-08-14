import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLessonStepList, setStepValid } from '../../store/lesson/lesson';

function LessonStep() {
  const dispatch = useDispatch();
  const [stepList, setStepList] = useState([{ stepOrder: 1, stepContent: '' }]);
  const [errMsg, setErrMsg] = useState('');

  const reduxStepList = useSelector((state) => state.lesson.lessonStepList);

  const handleChange = (index, value) => {
    const updatedList = stepList.map((step, i) =>
      i === index ? { ...step, stepContent: value } : step
    );
    setStepList(updatedList);
    dispatch(setLessonStepList(updatedList)); // Redux 스토어 업데이트
  };

  const handleAddInput = () => {
    if (stepList[stepList.length - 1].stepContent.trim() === '') {
      setErrMsg('마지막 단계를 채워주세요.');
      return;
    }
    const updatedList = [
      ...stepList,
      {
        stepOrder: stepList.length + 1, // 새로운 단계의 순서
        stepContent: '',
      },
    ];
    setStepList(updatedList);
    dispatch(setLessonStepList(updatedList)); // Redux 스토어 업데이트
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
      dispatch(setLessonStepList(updatedList)); // Redux 스토어 업데이트
    }
  };

  const checkStepContentFilled = useCallback(() => {
    return stepList.every((step) => step.stepContent.trim() !== '');
  }, [stepList]);

  useEffect(() => {
    setStepList(reduxStepList);
    dispatch(setStepValid(checkStepContentFilled()));
  }, [reduxStepList, checkStepContentFilled, dispatch]);

  return (
    <div>
      <div className="lessonInfoDescContainer">
        <div className="lessonInfoMate">
          진행 단계 <span className="required">*</span>
        </div>
        <div className="stepInputContainer">
          {stepList.map((step, index) => (
            <div key={index} className="stepInputWrapper">
              <input
                className="lessonInfoInput"
                type="text"
                value={step.stepContent}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder={`요리 진행 단계를 입력하세요`}
              />
              {stepList.length > 1 && (
                <button
                  className="stepCancelButton"
                  onClick={() => handleRemoveInput(index)}
                >
                  삭제
                </button>
              )}
            </div>
          ))}
          <button className="stepPlusButton" onClick={handleAddInput}>
            +
          </button>
          {errMsg && <p className="stepMsg">{errMsg}</p>}
          <p className="stepMsg">
            {checkStepContentFilled() ? '' : '단계를 모두 입력해주세요.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LessonStep;
