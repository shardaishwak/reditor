import React from "react";
import {
  getElementCoordinates,
  isTextSelected,
} from "./store/Actions/DOMFunctions";
import {
  MOVE_EDITOR_DOWN,
  MOVE_EDITOR_UP,
  REMOVE_EDITOR_TOOLBAR,
} from "./store/Constants/EditorBasic";
import { withEditorReducer } from "./store/EditorProvider";

class Toolbar extends React.PureComponent {
  // is_toolbar need to be moved globally for because it is connected to the Editor
  state = {
    is_toolbar: false,
    toolbar_position: [],
    toolpit: false,
    toolpit_coordinates: [],

    link_input: "",
    expand: false,
  };
  /**
   * The @function onselectionchange is fired always, so @function isTextSelected checks for the text selection only for
   * the element that has isContentEditable property true.
   */
  // delete
  componentDidMount() {
    document.onselectionchange = () => {
      // check if element is selected and is editable
      if (isTextSelected()) {
        // ipdate the toolba position
        this.updatePosition();
        // show toolbar if is hidden
        if (!this.state.is_toolbar)
          this.setState({
            is_toolbar: true,
          });
      } else {
        // remove toolbar is nothing is selected
        if (this.state.is_toolbar) this.setState({ is_toolbar: false });
      }
    };
  }
  /**
   * @functionality Get the top, right, and left coordinates of the selected text in the isEditable.
   * This is the only thing that causes re-render mostly in the component.
   *
   * If possible should be implemented.
   */
  // created
  updatePosition = () => {
    const coordinates = getElementCoordinates();

    // re-render the coordinates of the toolbar positioning.
    //this.props.dispatch({ type: UPDATE_POSITION });

    this.setState({
      toolbar_position: [coordinates.y + window.scrollY, coordinates.left],
    });
  };
  /**
   * @functionality Run editor commands such as bold, italic, underline
   */
  execCmd = (cmd) => {
    // execute a specific command such as bold, italic, uderline
    document.execCommand(cmd, false, null);
    // update the toolbar, so doing the position
    this.updatePosition();
  };
  // run editor commands with arguments, such as H1, H2, H3...
  execCmdWithArg = (cmd, css, arg) => {
    document.execCommand(cmd, css, arg);
    this.updatePosition();
  };

  highlightText = () => {
    let selectedElement = window.getSelection().baseNode.parentNode;

    if (selectedElement.nodeName === "SPAN")
      this.execCmdWithArg("removeFormat", null, "backColor");
    else {
      this.execCmdWithArg("backColor", null, "#ffd30020");
    }
  };
  codeBlockText = () => {
    let selectedElement = window.getSelection().baseNode.parentNode;

    if (selectedElement.nodeName === "FONT")
      this.execCmdWithArg("removeFormat", null, "foreColor");
    else {
      this.execCmdWithArg("foreColor", null, "#212121");
    }
  };
  linkText = (e) => {
    let selectedElement = window.getSelection().baseNode.parentNode;

    if (e.ctrlKey && selectedElement.nodeName === "A") {
      selectedElement = window.getSelection().baseNode.parentNode;
      return window.open(selectedElement.href, "_blank");
    }
    if (selectedElement.nodeName === "A") {
      this.execCmd("unlink");
    } else {
      const url = prompt("http:// | https://");

      this.execCmdWithArg("createLink", false, url);
    }
  };
  render() {
    if (this.state.is_toolbar)
      return (
        <div
          style={{
            position: "absolute",
            top: 25 + this.state.toolbar_position[0],
            left: this.state.toolbar_position[1],
          }}
          className="animate__animated animate__fadeInUp animate__faster"
        >
          <div className="editor--toolbar-container">
            <div className="editor--tools">
              <button
                onClick={() => this.execCmd("bold")}
                className={
                  document.queryCommandState("bold")
                    ? "editor--toolbar-button far fa-bold editor--active"
                    : "editor--toolbar-button far fa-bold"
                }
              >
                <Toolpit cmd="bold" keyBind="Ctrl-B" />
              </button>
              <button
                onClick={() => this.execCmd("italic")}
                className={
                  document.queryCommandState("italic")
                    ? "editor--toolbar-button far fa-italic editor--active"
                    : "editor--toolbar-button far fa-italic"
                }
              >
                <Toolpit cmd="Italic" keyBind="Ctrl-I" />
              </button>
              <button
                onClick={() => this.execCmd("underline")}
                className={
                  document.queryCommandState("underline")
                    ? "editor--toolbar-button far fa-underline editor--active"
                    : "editor--toolbar-button far fa-underline"
                }
              >
                <Toolpit cmd="Underline" keyBind="Ctrl-U" />
              </button>

              <button
                onMouseDown={this.linkText}
                className={
                  window.getSelection().baseNode.parentNode.nodeName === "A"
                    ? "editor--toolbar-button far fa-link editor--active"
                    : "editor--toolbar-button far fa-link"
                }
              >
                <Toolpit cmd="Link" keyBind="Ctrl+Click to Open" />
              </button>
            </div>

            {/**text alignment */}
            <div className="editor--tools">
              <button
                onClick={() => this.setState({ expand: !this.state.expand })}
                className={
                  this.state.expand
                    ? "editor--toolbar-button fas fa-chevron-left "
                    : "editor--toolbar-button fas fa-chevron-right "
                }
              >
                <Toolpit cmd="More Tools" />
              </button>
            </div>
            {this.state.expand && (
              <MoreTools
                codeBlockText={this.codeBlockText}
                highlightText={this.highlightText}
                execCmd={this.execCmd}
              />
            )}
            {/** Editor up, down, delete */}
            <div className="editor--tools">
              <button
                onMouseDown={(e) => {
                  this.props.dispatch({ type: MOVE_EDITOR_UP, e });
                }}
                className="editor--toolbar-button fas fa-arrow-up"
              >
                <Toolpit cmd="Move Up" keyBind={"Alt-Up"} />
              </button>

              <button
                onMouseDown={(e) => {
                  this.props.dispatch({ type: MOVE_EDITOR_DOWN, e });
                }}
                className="editor--toolbar-button fas fa-arrow-down"
              >
                <Toolpit cmd="Move Down" keyBind={"Alt-Down"} />
              </button>
              <button
                onMouseDown={(e) => {
                  this.props.dispatch({ type: REMOVE_EDITOR_TOOLBAR, e });
                }}
                className="editor--toolbar-button far fa-times editor--toolbar-button-close"
              >
                <Toolpit cmd="Delete" />
              </button>
            </div>
          </div>
        </div>
      );
    return <></>;
  }
}

const MoreTools = (props) => {
  return (
    <>
      <div className="editor--tools">
        <button
          onClick={() => props.execCmd("strikeThrough")}
          className={
            document.queryCommandState("strikeThrough")
              ? "editor--toolbar-button far fa-strikethrough editor--active"
              : "editor--toolbar-button far fa-strikethrough"
          }
        >
          <Toolpit cmd="Strike Through" />
        </button>
        <button
          onClick={props.codeBlockText}
          className={
            window.getSelection().baseNode.parentNode.nodeName === "FONT"
              ? "editor--toolbar-button far fa-brackets-curly editor--active"
              : "editor--toolbar-button far fa-brackets-curly"
          }
        >
          <Toolpit cmd="Code" />
        </button>
        <button
          onClick={props.highlightText}
          className={
            window.getSelection().baseNode.parentNode.nodeName === "SPAN"
              ? "editor--toolbar-button far fa-highlighter editor--active"
              : "editor--toolbar-button far fa-highlighter"
          }
        >
          <Toolpit cmd="Highlight" />
        </button>
      </div>
      <div className="editor--tools">
        <button
          onClick={() => props.execCmd("justifyLeft")}
          className={
            document.queryCommandState("justifyLeft")
              ? "editor--toolbar-button far fa-align-left editor--active"
              : "editor--toolbar-button far fa-align-left"
          }
        >
          <Toolpit cmd="Align Left" />
        </button>
        <button
          onClick={() => props.execCmd("justifyCenter")}
          className={
            document.queryCommandState("justifyCenter")
              ? "editor--toolbar-button far fa-align-center editor--active"
              : "editor--toolbar-button far fa-align-center"
          }
        >
          <Toolpit cmd="Align Center" />
        </button>
        <button
          onClick={() => props.execCmd("justifyRight")}
          className={
            document.queryCommandState("justifyRight")
              ? "editor--toolbar-button far fa-align-right editor--active"
              : "editor--toolbar-button far fa-align-right"
          }
        >
          <Toolpit cmd="Align Right" />
        </button>
      </div>
      {/**List */}
      <div className="editor--tools">
        <button
          onClick={() => props.execCmd("insertUnorderedList")}
          className="editor--toolbar-button far fa-list"
        >
          <Toolpit cmd="Unordered List" />
        </button>
        <button
          onClick={() => props.execCmd("insertOrderedList")}
          className="editor--toolbar-button far fa-list-ol"
        >
          <Toolpit cmd="Ordered List" />
        </button>
      </div>
    </>
  );
};

export const Toolpit = (props) => (
  <div className="editor--toolbar-toolpit">
    <div>
      {props.cmd}
      <br style={{ marginBottom: 5 }} />
      <b style={{ marginTop: 10 }}>{props.keyBind}</b>
    </div>
  </div>
);

export default withEditorReducer(Toolbar);
