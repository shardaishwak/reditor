import React, { useState } from "react";
import { isValidUrl } from "../store/Actions/DOMFunctions";
import {
  MOVE_EDITOR_DOWN_REACT_ELEMENT,
  MOVE_EDITOR_UP_REACT_ELEMENT,
  REMOVE_EDITOR_REACT_ELEMENT,
} from "../store/Constants/EditorBasic";
import { REMOVE_EMBED, SET_EMBED } from "../store/Constants/Options";
import { withEditorReducer } from "../store/EditorProvider";

const EmbedEditor = (props) => {
  const [embedSrc, setEmbedSrc] = useState();
  if (props.editor.embed_src)
    return (
      <div className="editor--editor-safeview">
        <div className="editor--editor editor--type-image">
          <iframe
            src={props.editor.embed_src}
            title={"Embed-" + props.editor.id}
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
  else
    return (
      <div className="editor--editor-safeview">
        <button
          className="far fa-times editor--toolbar-button"
          onClick={() => {
            props.dispatch({ type: REMOVE_EMBED, index: props.index });
          }}
        ></button>
        <div className={"editor--editor editor--type-image-input"}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (isValidUrl(embedSrc))
                props.dispatch({
                  type: SET_EMBED,
                  index: props.index,
                  src: embedSrc,
                });
            }}
          >
            <input
              className={
                !isValidUrl(embedSrc)
                  ? "editor--input-invalid"
                  : "editor--input-valid"
              }
              placeholder="Embed URL"
              onChange={(e) => setEmbedSrc(e.target.value)}
            />
          </form>
        </div>
      </div>
    );
};

export default withEditorReducer(EmbedEditor);
