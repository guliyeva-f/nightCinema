import React from "react";
import "./makeBtn.css";

const MakeButton = React.forwardRef((props, ref) => {
    return (
        <button ref={ref} className="btnMake cursor-pointer" {...props}>
            MAKE ADMIN
            <div id="clip">
                <div id="leftTop" className="corner"></div>
                <div id="rightBottom" className="corner"></div>
                <div id="rightTop" className="corner"></div>
                <div id="leftBottom" className="corner"></div>
            </div>
            <span id="rightArrow" className="arrow"></span>
            <span id="leftArrow" className="arrow"></span>
        </button>
    );
});

export default MakeButton;
