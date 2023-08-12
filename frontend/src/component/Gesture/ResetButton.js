import React from "react";
import { useDispatch } from "react-redux";
import { resetAll } from "./../../store/video/gestureTest";

function ResetButton() {
    const dispatch = useDispatch();

    function resetTestPage() {
        dispatch(resetAll());
    }

    return (
        <>
            <button onClick={resetTestPage}>Reset</button>
        </>
    );
}

export default ResetButton;