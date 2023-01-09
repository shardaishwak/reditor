import EditorConstructor from "../EditorConstructor";
import {
  getNextEditor,
  getParentElement,
  getPreviousEditor,
  handleCaretPosition,
  isTextSelected,
  moveCaretToEnd,
} from "./DOMFunctions";

// Update whatever you want here in the global Editor state
export const openUpdateEditor = (state, { editors }) => {
  return {
    ...state,
    editors,
  };
};
// Remove default etxt copy styling and give the editor one
export const handleOnPaste = (state, { event: e, index }) => {
  var clipboardData, pastedData;

  // Stop data actually being pasted into div
  e.preventDefault();

  // Get pasted data via clipboard API
  clipboardData = e.clipboardData || window.clipboardData;
  pastedData = clipboardData.getData("Text");

  // Do whatever with pasteddata
  document.execCommand("insertHTML", false, pastedData);
};
export const handleTitle = (state, { value }) => {
  return {
    ...state,
    editor_title: value,
  };
};
export const handleEditorChange = (state, { e, index }) => {
  // getting the editors with this.state.editors gives a copy that this.setState won't think it is changes
  // If i give [...this.state.editors], it will be re-rendered

  // If the editor was empty before filling in, i want to show some options, but don't want to cause
  // re-rendering everytime, so seeing when to re-render or not
  let editors;

  // there is already text in editor, don't re-render everyting
  if (
    state.editors[index].text.length > 0 &&
    e.currentTarget.innerText.length !== 0
  )
    editors = state.editors;
  // need to hide the options in editor, so re-render only once
  else editors = [...state.editors];
  editors[index].text = e.currentTarget.innerHTML;

  // remove or add the new_editor type if use has typed text or not respecitively
  // this is the default action

  /**
   * @todo this will cause the overrighting of special types, such as heading, which will be removed
   * Could be solved with a prevous_type is state, so this will become new_editor and prevous_type will
   * be the heading for exaple
   */

  return {
    ...state,
    editors,
  };
};

// ================= FUNCTIONS FOR ADDING A NEW EDITOR =========================

// A the editor at a ceratin position. The index is requed to make change to the editors state
export const addEditorWithPosition = (state, { index }) => {
  // check if the currentEditor is the last one, if so, just add a one simply
  if (index === state.editors.length - 1) return addEditor(state, null);

  // the new editor is added after the currentOne, and before the nextEditor of the currentOne
  // causes re-render, which is required

  // spread opeation is use to re-render
  console.log(state);
  const editors = [
    ...state.editors.slice(0, index + 1),
    new EditorConstructor(),
    ...state.editors.slice(index + 1),
  ];
  return {
    ...state,
    editors,
  };
};

// Add an editor at the last simply
// cauesed re-render which is requires
export const addEditor = (state, action) => {
  const editors = [...state.editors, new EditorConstructor()];
  return {
    ...state,
    editors,
  };
};

// =============================== REMOVE FUNCTION ==============================

// remove a sepcific editor
export const removeEditor = (state, { index }) => {
  // the spread operator is important. It causes re-rendering
  const arr = [...state.editors];
  arr.splice(index, 1);
  return {
    ...state,
    editors: arr,
    // need to add a new is_toolbar: false,
    // find solution on how to connect it
  };
};
/**
 * @functionality Remove an element @function onClick by the button
 */
export const removeEditorByToolbar = (state, { e }) => {
  // don't de-select text
  e.preventDefault();
  // get the selected element
  const element = getParentElement();
  // get editors by spread, so can be re-rendered
  const editors = [...state.editors];

  // extract the of the editor
  const id = element.id.split("editor-")[1];
  // find the index of editor in state
  const index = editors.findIndex((a) => a.id === id);

  // can't delete if there is only one editor, so just clear the text
  if (editors.length === 1) {
    editors[index].text = "";
    element.innerText = "";
    return {
      ...state,
      editors,
    };
  } else return removeEditor(state, { index });

  // remove the editor
};
export const removeEditorByReactElement = (state, { index }) => {
  const editors = [...state.editors];

  const total_editors = editors.length;
  console.log(total_editors);
  if (total_editors === 1) {
    editors[index].text = "";
    editors[index].image_src = null;
    editors[index].type = "paragraph";
    editors[index].embed_src = null;
    return {
      ...state,
      editors,
    };
  } else return removeEditor(state, { index });

  // remove the editor
};

// =================================== EXTRACT DATA ==================================

//  This is the returning point of all the data of all the editors at once
export const extractData = (state, action) => {
  console.log(state.editors);
};

/** 
   * @todo 
   * use alt+up / alt+down for moving an editor up and down
    ctrl+d or in the
  */
/**
 * @functionality Move an editor of position, up @function moveEditorUp or down @function moveEditorDown
 *
 * @note Delection is used with @function e.preventDefault() which is possible only in @onMouseDown
 *
 */

// ===============================MOVE EDITOR ==========================================
export const moveEditorUp = (state, { e }) => {
  // only if the text is selected
  if (!isTextSelected()) return;
  // prevent deselection of the text.
  e.preventDefault();
  // Get the current element
  const editor = getParentElement();

  // extract the id of the editor from the element
  const id = editor.id.split("editor-")[1];

  // get the editors with spread operator so after can be re-rendered.
  const editors = [...state.editors];

  // find the editor in state b id
  const index = id && editors.findIndex((a) => a.id === id);
  // I can go to the prevous editor only if there is one, if the current editor is the first
  // in the list, then it won't fire
  if (index > 0) {
    // swap the prevous editor with the current editors.
    const currentEditor = editors[index];
    editors[index] = editors[index - 1];
    editors[index - 1] = currentEditor;

    // update also the toolbar
    //const new_toolbar_coordinates = getElementCoordinates();
    return {
      ...state,
      editors,
    };
  }
};
// Move editor with the button in react component, different approach of finding the editor
export const moveEditorUpByReactElement = (state, { index }) => {
  const editors = [...state.editors];
  if (index > 0) {
    // swap the prevous editor with the current editors.
    const currentEditor = editors[index];
    editors[index] = editors[index - 1];
    editors[index - 1] = currentEditor;

    // update also the toolbar
    //const new_toolbar_coordinates = getElementCoordinates();
    return {
      ...state,
      editors,
    };
  }
};
/**
 * @functionality Move the editor down by one
 *
 * @note Delection is used with @function e.preventDefault() which is possible only in @onMouseDown
 * @warning -> @function e.preventDefault is not working in IE
 */
export const moveEditorDown = (state, { e }) => {
  // only if the text is selected
  if (!isTextSelected()) return;
  // Prevent text deselection
  e.preventDefault();
  // get the current editor
  const editor = getParentElement();

  // extract the editor
  const id = editor.id.split("editor-")[1];

  // spread operator for re-rendering
  const editors = [...state.editors];

  // get the index of editor in state
  const index = id && editors.findIndex((a) => a.id === id);

  // check if the editor is not last in the list and is found
  if (index < editors.length - 1 && index > -1) {
    // swap next editor with the current editor
    const currentEditor = editors[index];
    editors[index] = editors[index + 1];
    editors[index + 1] = currentEditor;

    // update coordinates
    //const new_toolbar_coordinates = getElementCoordinates();
    return {
      ...state,
      editors,
    };
  }
};
// move down with react component button
export const moveEditorDownByReactElement = (state, { index }) => {
  const editors = [...state.editors];
  if (index < editors.length - 1 && index > -1) {
    // swap next editor with the current editor
    const currentEditor = editors[index];
    editors[index] = editors[index + 1];
    editors[index + 1] = currentEditor;

    // update coordinates
    //const new_toolbar_coordinates = getElementCoordinates();
    return {
      ...state,
      editors,
    };
  }
};

export const handleKeyUp = (state, { e, index }) => {
  // get the next and current editor
  let nextEditor = getNextEditor(e);
  let previousEditor = getPreviousEditor(e);
  // Move the current editor up by one
  if (e.altKey && e.keyCode === 38) {
    document.execCommand("selectAll", false, null);
    return moveEditorUp(state, { e });
  }
  // Move the current editor down by one
  else if (e.altKey && e.keyCode === 40) {
    document.execCommand("selectAll", false, null);
    return moveEditorDown(state, { e });
  }
  // keyDown - LeftArrow -> go to beginning of next editor
  else if (
    (e.keyCode === 40 || e.keyCode === 39) &&
    nextEditor &&
    handleCaretPosition(e)[1] === "end"
  ) {
    e.preventDefault();
    // activate next editor
    nextEditor.focus();
  }
  // keyUp - KeyLeft -> go to prevous element and focus with move caret and end
  else if (
    (e.keyCode === 38 || e.keyCode === 37) &&
    previousEditor &&
    handleCaretPosition(e)[0] === 0
  ) {
    e.preventDefault();
    moveCaretToEnd(previousEditor);
  } else if (e.shiftKey && e.keyCode === 13) {
    /**
     * Create a new editor below the current editor
     *
     * The new editor is focused in @function componentDidUpdate after the state update
     */
    e.preventDefault();
    return addEditorWithPosition(state, { index });
  }
  // Remove the element on empty and Backspace
  else if (e.keyCode === 8 && previousEditor) {
    if (e.currentTarget.innerHTML === "" || e.currentTarget.innerText === "") {
      e.preventDefault();
      // move caret fo prevous editor at the end, the prevous editor is focused automatically
      moveCaretToEnd(previousEditor);
      return removeEditor(state, { index });
    }
  } else if (e.keyCode === 9 && state.editors[index].type === "code") {
    e.preventDefault();
  }
};
