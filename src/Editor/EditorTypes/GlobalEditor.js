import React from "react";
import {
  EDITOR_CHANGE,
  HANDLE_KEYUP,
  HANDLE_ON_PASTE,
} from "../store/Constants/EditorBasic";
import { withEditorReducer } from "../store/EditorProvider";
import Optionbar from "../Optionbar";

const GlobalEditor = (props) => {
  const { Tag } = props;
  return (
    <div className="editor--editor-safeview">
      <Tag
        spellCheck={false}
        contentEditable
        dangerouslySetInnerHTML={{ __html: props.editor.initialValue }}
        onInput={(e) => {
          props.dispatch({
            type: EDITOR_CHANGE,
            e,
            index: props.index,
          });
        }}
        onKeyDown={(e) => {
          props.dispatch({
            type: HANDLE_KEYUP,
            e,
            index: props.index,
          });
        }}
        onPaste={(e) => {
          props.dispatch({
            type: HANDLE_ON_PASTE,
            event: e,
            index: props.index,
          });
        }}
        className={"editor--editor editor--type-" + props.editor.type}
        id={"editor-" + props.editor.id}
      ></Tag>

      {props.editor.text.length === 0 && (
        <Optionbar editor={props.editor} index={props.index} />
      )}
    </div>
  );
};

export default withEditorReducer(GlobalEditor);
