import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import TestScreen from "../../component/Video/TestScreen";
import Timer from "../../component/Video/Timer";
import ResetButton from "./../../component/Gesture/ResetButton";
import GoBackMain from "./../../component/Gesture/GoBackMain";
import { BsMicFill, BsMicMuteFill} from "react-icons/bs";
import { IoIosHand } from "react-icons/io";
import { AiFillCheckCircle } from "react-icons/ai";

function GestureTest() {
    const [ handState, handSetter ] = useState(false);
    const [ checkState, checkSetter ] = useState(false);
    
    const timerRdx = useSelector((state) => state.gestureTest.timer);
    const handRdx = useSelector((state) => state.gestureTest.hand);
    const checkRdx = useSelector((state) => state.gestureTest.check);

    useEffect(() => {
        
    }, [timerRdx, handRdx, checkRdx]);

    return (
        <>
        <div className='cookyer-cookiee-content'>
            <Timer /> {/**Timer와 ResetButton 한 행 */}
            <ResetButton/>
            <TestScreen/> {/**얘만 한 행 */}
            {handRdx ? (<IoIosHand className='cookyer-check-icon-active'/>) : (<IoIosHand className='cookyer-check-icon'/>)}
            {checkRdx ? (<AiFillCheckCircle className='cookyer-check-icon-active'/>) : (<AiFillCheckCircle className='cookyer-check-icon'/>)}
            <GoBackMain/> {/**얘만 한 행 */}
        </div>
        </>
    );
}

export default GestureTest;