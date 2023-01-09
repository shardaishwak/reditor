import React from "react";
import {
  EDITOR_CHANGE,
  HANDLE_KEYUP,
  HANDLE_ON_PASTE,
} from "../store/Constants/EditorBasic";
import { withEditorReducer } from "../store/EditorProvider";
import Optionbar from "../Optionbar";

const CodeEditor = (props) => {
  return (
    <div className="editor--editor-safeview">
      <code
        contentEditable
        dangerouslySetInnerHTML={{ __html: props.editor.initialValue }}
        autoCorrect={"false"}
        autoCapitalize={"false"}
        spellCheck={"false"}
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
        className={"editor--editor editor--type-" + props.editor.type}
        id={"editor-" + props.editor.id}
        onPaste={(e) => {
          props.dispatch({
            type: HANDLE_ON_PASTE,
            e,
            index: props.index,
          });
        }}
        suppressContentEditableWarning
      ></code>

      {props.editor.text.length === 0 && (
        <Optionbar editor={props.editor} index={props.index} />
      )}
    </div>
  );
};

export default withEditorReducer(CodeEditor);
