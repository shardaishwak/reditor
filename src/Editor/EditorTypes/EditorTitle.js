import React from "react";
import { EDITOR_TITLE_CHANGE } from "../store/Constants/EditorBasic";
import { withEditorReducer } from "../store/EditorProvider";

const EditorTitle = (props) => {
  /*This is the title container which is always fixed and unchangable*/

  const handleKeyDown = (e) => {
    if (
      e.ctrlKey &&
      (e.keyCode === 66 || e.keyCode === 85 || e.keyCode === 73)
    ) {
      e.preventDefault();
      return false;
    }
    if (e.keyCode === 13) {
      e.preventDefault();
      const DOMelement = document.getElementById(
        "editor-" + props.state.editors[0].id
      );
      if (DOMelement) {
        DOMelement.focus();
      }
    }
  };
  return (
    <div
      contentEditable
      data-notoolbar
      className="editor--editor-title"
      placeholder="Title your editor"
      onKeyDown={handleKeyDown}
      onInput={(e) => {
        props.dispatch({
          type: EDITOR_TITLE_CHANGE,
          value: e.currentTarget.innerText,
        });
      }}
    />
  );

  /**Render all the Editors */
};

export default withEditorReducer(EditorTitle);
