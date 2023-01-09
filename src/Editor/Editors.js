import React, { useState } from "react";
import "./editor.css";
/**
 * @todo move Optionbar to Toolbar, as useless
 create shift+enter as new editor rahter than opposite
 */

// All the components
import Toolbar from "./Toolbar";

import GlobalEditor from "./EditorTypes/GlobalEditor";
import EmbedEditor from "./EditorTypes/EmbedEditor";
import ImageEditor from "./EditorTypes/ImageEditor";
import CodeEditor from "./EditorTypes/CodeEditor";
import EditorTitle from "./EditorTypes/EditorTitle";

import { withEditorReducer } from "./store/EditorProvider";

import {
  ADD_EDITOR,
  EDITOR_TITLE_CHANGE,
  EXTRACT_DATA,
} from "./store/Constants/EditorBasic";

/**
 * @name Reditor
 * @author Ishwak Sharda
 * @argument RTE
 * @class NewEditor -> Editor
 * @version 1.0
 *
 * /
 
 /*
 * The editor is lightweight, with minimal re-rendering load on the components,
 * neither when updating the editor values
 */

/**
 * The @function document.getSelection() get's the element and all the properites associated with the selected
 * element. It is used more often in the editor, as it gives the position and the element that has been selected
 * and so, doesn't require re-rendering. Without it, we would have to use the state in order to capture the focus
 * and blur, but problems with touch.
 */

/**
 * @whenAddingNewEditor
 *
 * When we add a new editor, we get the options that by default, the new editor added to the state has type of new_editor,
 * so i know that a new editor has been added and so can render the options.
 */

/**
 * @terms
 *
 * Element means Editor or the <div></div> that is targetted
 * Parent = The conatiiner that holds other group of divs. The contentEdibale div is a parent as it holds span, br, b
 * Child = All the elements that are present inside a div, such as span, b, <a> in contentEditable
 * Editable/EditableContainer = Editor
 *
 */

const Editors = (props) => {
  const [showCode, setShowCode] = useState(
    JSON.stringify(props.state, null, 2)
  );

  console.log(props.state);

  if (!props.state && !props.dispatch) return <div>loading...</div>
  return (
    <div className="editor--container">
      <div id="editor--editors">
        {/*This is the title container which is always fixed and unchangable*/}
        <EditorTitle />
        {/**Render all the Editors */}
        {props.state.editors.map((editor, index) => {
          return <EditorRender key={editor.id} editor={editor} index={index} />;
        })}
      </div>
      <Toolbar />
      {/**Bottom options - remove all */}
      <div style={{ marginTop: 20, display: "flex", flexDirection: "column" }}>
        <button
          className="editor--new-editor-button"
          onClick={() => {
            props.dispatch({ type: ADD_EDITOR });
          }}
        ></button>
        <button
          onClick={() => {
            props.dispatch({ type: EXTRACT_DATA });
            setShowCode(JSON.stringify(props.state, null, 2));
          }}
        >
          Extract Data
        </button>
      </div>
      {/**Print the code  */}
      <pre style={{ display: "inline-block" }}>{showCode}</pre>
    </div>
  );
};

const EditorRender = (props) => {
  const { editor } = props;
  if (editor.type === "paragraph" || !editor.type)
    return <GlobalEditor {...props} Tag={`div`} />;
  else if (editor.type === "header" && editor.level)
    return <GlobalEditor {...props} Tag={`h${editor.level}`} />;
  else if (editor.type === "blockquote")
    return <GlobalEditor {...props} Tag={`blockquote`} />;
  else if (editor.type === "code") return <CodeEditor {...props} />;
  else if (editor.type === "image") return <ImageEditor {...props} />;
  else if (editor.type === "embed") return <EmbedEditor {...props} />;

  return <div>Editor not registered</div>;
};

export default React.memo(withEditorReducer(Editors));
