import React, { useContext } from "react";
import {
  addEditor,
  addEditorWithPosition,
  handleEditorChange,
  removeEditor,
  extractData,
  moveEditorUp,
  moveEditorUpByReactElement,
  moveEditorDown,
  moveEditorDownByReactElement,
  removeEditorByToolbar,
  removeEditorByReactElement,
  openUpdateEditor,
  handleKeyUp,
  handleOnPaste,
  handleTitle,
} from "./Actions/EditorBasic";
import {
  handleImageCaption,
  removeImage,
  setCode,
  setEmbed,
  setHeader,
  setImage,
  removeEmbed,
  setBlockQuote,
} from "./Actions/Options";
import { updatePosition } from "./Actions/Toolbar";
import {
  UPDATE_POSITION,
  EDITOR_CHANGE,
  ADD_EDITOR,
  ADD_EDITOR_WITH_POSITION,
  REMOVE_EDITOR,
  EXTRACT_DATA,
  MOVE_EDITOR_UP,
  MOVE_EDITOR_UP_REACT_ELEMENT,
  MOVE_EDITOR_DOWN,
  MOVE_EDITOR_DOWN_REACT_ELEMENT,
  REMOVE_EDITOR_TOOLBAR,
  REMOVE_EDITOR_REACT_ELEMENT,
  OPEN_UPDATE_EDITOR,
  HANDLE_KEYUP,
  HANDLE_ON_PASTE,
  EDITOR_TITLE_CHANGE,
} from "./Constants/EditorBasic";
import {
  HANDLE_IMAGE_CAPTION,
  REMOVE_IMAGE,
  SET_BLOCKQUOTE,
  SET_CODE,
  SET_EMBED,
  SET_HEADER,
  SET_IMAGE,
  REMOVE_EMBED,
} from "./Constants/Options";
import EditorConstructor from "./EditorConstructor";
import AuthContext from "./EditorContext";

// handle all the global functions realted to the change in state
const reducer = (state, action) => {
  switch (action.type) {
    case OPEN_UPDATE_EDITOR:
      return openUpdateEditor(state, action);

    case HANDLE_ON_PASTE:
      return handleOnPaste(state, action);

    case EDITOR_TITLE_CHANGE:
      return handleTitle(state, action);

    case EDITOR_CHANGE:
      return handleEditorChange(state, action);

    case HANDLE_KEYUP:
      return handleKeyUp(state, action);

    case UPDATE_POSITION:
      return updatePosition(state, action);

    case ADD_EDITOR_WITH_POSITION:
      return addEditorWithPosition(state, action);

    case ADD_EDITOR:
      return addEditor(state, action);

    case REMOVE_EDITOR:
      return removeEditor(state, action);

    case REMOVE_EDITOR_TOOLBAR:
      return removeEditorByToolbar(state, action);

    case REMOVE_EDITOR_REACT_ELEMENT:
      return removeEditorByReactElement(state, action);

    case EXTRACT_DATA:
      return extractData(state, action);

    case MOVE_EDITOR_UP:
      return moveEditorUp(state, action);

    case MOVE_EDITOR_UP_REACT_ELEMENT:
      return moveEditorUpByReactElement(state, action);

    case MOVE_EDITOR_DOWN:
      return moveEditorDown(state, action);

    case MOVE_EDITOR_DOWN_REACT_ELEMENT:
      return moveEditorDownByReactElement(state, action);

    case SET_IMAGE:
      return setImage(state, action);

    case REMOVE_IMAGE:
      return removeImage(state, action);

    case HANDLE_IMAGE_CAPTION:
      return handleImageCaption(state, action);

    case SET_HEADER:
      return setHeader(state, action);

    case SET_CODE:
      return setCode(state, action);

    case SET_EMBED:
      return setEmbed(state, action);
    case REMOVE_EMBED:
      return removeEmbed(state, action);

    case SET_BLOCKQUOTE:
      return setBlockQuote(state, action);

    default:
      return state;
  }
};

export default class EditorProvider extends React.PureComponent {
  state = {
    editors: [new EditorConstructor()],
    editor_title: "",
  };
  componentDidUpdate(oldState, newState) {
    // check if a new editor has been added
    if (
      JSON.stringify(this.state.editors) !== JSON.stringify(newState.editors) &&
      this.state.editors.length > newState.editors.length
    ) {
      // find the new added editor
      const element = this.state.editors.filter(
        (a) => !newState.editors.includes(a)
      )[0];
      // focus the editor with the DOM

      /**
       * @todo just made change here, this is the cause why the next editor is not focus
       * if not use the idea, remove type:"new_editor" from @function addEditor and @function addEditorWithPosition
       */
      //if (element.type === "new_editor") return;
      document.getElementById("editor-" + element.id).focus();
    }
  }
  _reducer = reducer;
  reducer = (action) => this.setState(this._reducer(this.state, action));

  render() {
    return (
      <AuthContext.Provider
        value={{ state: this.state, dispatch: this.reducer }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

// wrap container to use this.props.state, this.props.dispatch for running the functions

export const withEditorReducer = (Component) => {
  return (props) => {
    const { state, dispatch } = useContext(AuthContext);

    return <Component {...props} state={state} dispatch={dispatch} />;
  };
};
