import React from "react";
import { useDispatch } from "react-redux";

function Result(props){
    const dispatch = useDispatch();

    return(
        <>
            <h2>{props.data['Title']}</h2>
            <h3>{props.data['year']}</h3>
            <button>Save</button>
            
        </>
    );
}
export default Result;