import React from "react";
import { useSelector } from "react-redux";

import Result from "./results";
import { selectMovies } from "../../app/moveSearch";

function ResultsList(props){
    const movieResults = useSelector(selectMovies);

    return(
        <ul>
            {movieResults.map((movie, index) => (
                <li>
                <Result index={index} data={movie} />
                </li>
            ))}
        </ul>
    );
    
}

export default ResultsList;
