import React, { useState } from "react";
import {
  SET_BLOCKQUOTE,
  SET_CODE,
  SET_EMBED,
  SET_HEADER,
  SET_IMAGE,
} from "./store/Constants/Options";
import { withEditorReducer } from "./store/EditorProvider";
import { Toolpit } from "./Toolbar";

const HeadingsList = [1, 2, 3];

const Optionbar = (props) => {
  const [is_options, set_options] = useState(false);

  // the right dispacement is given by the sum of the outer container and the padding in the editor container

  const setOptions = (e) => {
    set_options(!is_options);
  };

  // make dispatch functions, if not it is difficult to manage
  return (
    <div className="editor--optionbar-container">
      <div
        onMouseDown={setOptions}
        className={
          is_options
            ? "far fa-times editor--optionbar-icon"
            : "far fa-plus editor--optionbar-icon"
        }
      ></div>
      {is_options && (
        <div style={{ position: "absolute", marginTop: 20 }}>
          <div className="editor--toolbar-container animate__animated animate__fadeInUp animate__faster">
            <Headings
              setHeader={(type, level) => {
                props.dispatch({
                  type: SET_HEADER,
                  editor: props.editor,
                  index: props.index,
                  n_type: type,
                  level,
                });
              }}
              editor={props.editor}
            />
            <div
              className="editor--tools"
              style={{ borderLeft: "1px solid #4b4b4b2c" }}
            >
              <button
                onClick={() => {
                  props.dispatch({ type: SET_IMAGE, index: props.index });
                }}
                className="editor--toolbar-button far fa-image"
              >
                <Toolpit cmd="Image" />
              </button>
              <button
                onClick={() => {
                  props.dispatch({ type: SET_CODE, index: props.index });
                }}
                className={
                  props.editor.type === "code"
                    ? "editor--toolbar-button far fa-code editor--active"
                    : "editor--toolbar-button far fa-code"
                }
              >
                <Toolpit cmd="Code" />
              </button>
              <button
                onClick={() =>
                  props.dispatch({ type: SET_EMBED, index: props.index })
                }
                className={
                  props.editor.type === "embed"
                    ? "editor--toolbar-button far fa-window-maximize editor--active"
                    : "editor--toolbar-button far fa-window-maximize"
                }
              >
                <Toolpit cmd="Embed" />
              </button>
              <button
                onClick={() =>
                  props.dispatch({ type: SET_BLOCKQUOTE, index: props.index })
                }
                className={
                  props.editor.type === "blockquote"
                    ? "editor--toolbar-button far fa-quote-right editor--active"
                    : "editor--toolbar-button far fa-quote-right"
                }
              >
                <Toolpit cmd="Quote" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 *
 * Handle all 3 types of headers
 */

const Headings = ({ editor, setHeader }) => (
  <div className="editor--tools">
    {HeadingsList.map((level) => {
      return (
        <button
          key={level}
          onClick={() => setHeader("header", level)}
          className={
            editor.type === "header" && editor.level === level
              ? "editor--toolbar-button far fa-h" + level + " editor--active"
              : "editor--toolbar-button far fa-h" + level
          }
        >
          <Toolpit cmd={"Heading " + level} />
        </button>
      );
    })}
  </div>
);

export default withEditorReducer(Optionbar);
