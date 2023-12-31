import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { saveMovie } from "../../app/movieSlice";
import { deleteMovie } from "../../app/movieSlice";

import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

function ResultButton(props) {
  const dispatch = useDispatch();
  const [saved, setSaved] = useState(props.data["saved"]);
  const handleSaveClick = (event, imdbID) => {
    setSaved(true);
    dispatch(saveMovie(imdbID));
  };
  //console.log(props.data['saved'], props.data['Title'])
  useEffect(() => {
    setSaved(props.data["saved"]);
  }, [props.data]);

  if (saved) {
    return (
      <IconButton
        variant="outlined"
        size="small"
        color="error"
        starticon={<DeleteIcon />}
        onClick={(e) => {
          props.close();
          setSaved(false);
          dispatch(deleteMovie(props.data["imdbID"]));
        }}
      >
        <DeleteIcon />
      </IconButton>
    );
  }
  return (
    <IconButton
      size="small"
      starticon={<SaveIcon />}
      color="success"
      disabled={saved}
      onClick={(e) => {
        handleSaveClick(e, props.data["imdbID"]);
      }}
    >
      <SaveIcon />
    </IconButton>
  );
}

export default ResultButton;
