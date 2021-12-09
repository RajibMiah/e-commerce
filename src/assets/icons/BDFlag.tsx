import React from "react";

export const BDFlag = ({ width = "640px", height = "480px" }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            id="flag-icon-css-bd"
            viewBox="0 0 640 480"
            width={width}
            height={height}
        >
            <path fill="#006a4e" d="M0 0h640v480H0z"/>
            <circle cx="280" cy="240" r="160" fill="#f42a41"/>
        </svg>
    );
};
