import React, { useState } from "react";
import { isValidUrl } from "../../store/Actions/DOMFunctions";
import {
  MOVE_EDITOR_DOWN_REACT_ELEMENT,
  MOVE_EDITOR_UP_REACT_ELEMENT,
  REMOVE_EDITOR_REACT_ELEMENT,
} from "../../store/Constants/EditorBasic";
import {
  HANDLE_IMAGE_CAPTION,
  REMOVE_IMAGE,
  SET_IMAGE,
} from "../../store/Constants/Options";
import { withEditorReducer } from "../../store/EditorProvider";
import ImageTabbar from "./ImageTabbar";
import UnsplashImage from "./UnsplashImage";
import UploadImage from "./UploadImage";
import UrlImage from "./UrlImage";

// converetd

const ImageEditor = (props) => {
  if (props.editor.image_src)
    return (
      <div className="editor--editor-safeview">
        <div className={"editor--editor editor--type-image"}>
          <img
            className="editor--image editor--image-full-width"
            src={props.editor.image_src}
            alt=" src"
          />
          <input
            type="text"
            defaultValue={props.editor.initialValue}
            placeholder="Caption here"
            className="editor--image-caption"
            onChange={(e) => {
              props.dispatch({
                type: HANDLE_IMAGE_CAPTION,
                e,
                index: props.index,
              });
            }}
          />
          <div className="editor--toolbar-container editor--image-toolbar">
            <div className="editor--tools">
              <button
                onMouseDown={() => {
                  props.dispatch({
                    type: MOVE_EDITOR_UP_REACT_ELEMENT,
                    index: props.index,
                  });
                }}
                className="editor--toolbar-button fas fa-arrow-up"
              ></button>

              <button
                onMouseDown={() => {
                  props.dispatch({
                    type: MOVE_EDITOR_DOWN_REACT_ELEMENT,
                    index: props.index,
                  });
                }}
                className="editor--toolbar-button fas fa-arrow-down"
              ></button>
              <button
                onMouseDown={() => {
                  props.dispatch({
                    type: REMOVE_EDITOR_REACT_ELEMENT,
                    index: props.index,
                  });
                }}
                className="editor--toolbar-button far fa-times editor--toolbar-button-close"
              ></button>
            </div>
          </div>
        </div>
      </div>
    );
  else return <ImageEditorInput {...props} />;
};

const ImageEditorInput = (props) => {
  const [inputType, setInputType] = useState("url");

  let render;
  if (inputType === "url") render = <UrlImage {...props} />;
  else if (inputType === "upload") render = <UploadImage {...props} />;
  else if (inputType === "unsplash") render = <UnsplashImage {...props} />;
  return (
    <ImageTabbar {...props} inputType={inputType} setInputType={setInputType}>
      {render}
    </ImageTabbar>
  );
};

export default withEditorReducer(ImageEditor);
