import React from "react";
import { REMOVE_IMAGE } from "../../store/Constants/Options";

// Inputs Tabar
const ImageTabbar = (props) => {
  const { inputType, setInputType } = props;
  return (
    <div className="editor--editor-safeview editor--image-inputs">
      <div className="editor--editor-image-input-toggler">
        <button
          className="editor--editor-image-button button-close far fa-times"
          onClick={() =>
            props.dispatch({ type: REMOVE_IMAGE, index: props.index })
          }
        ></button>
        <button
          onClick={() => setInputType("url")}
          className={
            "editor--editor-image-button" +
            (inputType === "url" && " button-active")
          }
        >
          URL
        </button>
        <button
          onClick={() => setInputType("upload")}
          className={
            "editor--editor-image-button" +
            (inputType === "upload" && " button-active")
          }
        >
          UPLOAD
        </button>
        <button
          onClick={() => setInputType("unsplash")}
          className={
            "editor--editor-image-button" +
            (inputType === "unsplash" && " button-active")
          }
        >
          UNSPLASH
        </button>
      </div>
      {props.children}
    </div>
  );
};

export default ImageTabbar;
