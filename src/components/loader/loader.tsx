import React from "react";
import { Spinner } from "./loader.style";


const Loader = (color) => {
    return <Spinner {...color} />;
};

export default Loader;
