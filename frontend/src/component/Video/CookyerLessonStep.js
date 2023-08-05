import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCheckCookiee, setCheckCookieeList } from '../../store/video/cookyerVideo';

function CookyerLessonStep() {
  const dispatch = useDispatch()
  const checkCookieeList = useSelector((state) => state.cookyerVideo.checkCookieeList)
  const [ checkCount, setCheckCount ] = useState(0)
  const publisher = useSelector((state) => state.video.publisher)

  const lessonStepList = useSelector((state) => state.videoLessonInfo.lessonStepList)
  const [ curStep, setCurStep ] = useState(undefined)
  const [ curIdx, setCurIdx ] = useState(0)

  useEffect(() => {
    if (lessonStepList) {
      console.log(lessonStepList, "요리 단계 잘 왔니?")
      setCurIdx(1)
    }
  }, [lessonStepList])


  const goPrevStep = () => {
    setCurIdx((prev) => {
      if (lessonStepList && prev - 1 > 0) {
        return prev - 1
      } else {
        return prev
      }
    })
  }

  const goNextStep = () => {
    setCurIdx((prev) => {
      if (lessonStepList && prev + 1 <= lessonStepList.length) {
        return prev + 1
      } else {
        return prev
      }
    })
  }

  useEffect(() => {
    if (lessonStepList) {
      const newStep = lessonStepList.find((step) => step.stepOrder === curIdx)
      setCurStep(newStep.stepContent)
    }
  }, [curIdx])

  useEffect(() => {
    if (curStep && publisher) {
      /** 진행단계 넘길때마다 쿠키에게 시그널 */
      const data = {
        curStep
      }
      publisher.stream.session.signal({
        data: JSON.stringify(data),
        type: 'changeStep'
      })
    }
  }, [curStep, publisher])

  const resetCheckCookiee = (publisher) => {
    dispatch(setCheckCookieeList({checkCookieeList: []}))
    setCheckCount(0)
    dispatch(setCheckCookiee({checkCookiee: ''}))
    // 학생들에게도 리셋 시그널 보내야 함
    publisher.stream.session.signal({
      type: 'resetCheck'
    })
  }

  useEffect(() => {
    if (checkCookieeList !== undefined && checkCookieeList !== []) {
      setCheckCount(checkCookieeList.length)
    }
  }, [checkCookieeList])

  return (
    <div>
      <div>
        <p>현재 진행 단계</p>
        <div>
          <button onClick={goPrevStep}>이전</button>
          <div>
            {curStep ? (
              <p>{curStep}</p>
            ) : (
              <p>현재 요리 단계</p>
            )}
            <button>수정</button>
          </div>
          <button onClick={goNextStep}>이후</button>
        </div>
        <div>
          <h1>체크 {checkCount}명</h1>
          <button onClick={() => resetCheckCookiee(publisher)}>리셋</button>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
}

export default CookyerLessonStep;