/**
 * @BasicFunctions with DOM -> without renderin
 *
 * - getElementCoordinates - ok
 * - isTextSelected - ok
 * - getParentElement -ok
 * - handleCaretPosition @params event of the editor -ok
 * - moveCaredToEnd @params event of the editor
 * - getNextEditor @params event of the editor -ok
 * - getprevousEditor @params event of the editor -ok
 */

/**
 * @functionality Get the coordinates of the selected element, it is used mostly for positioning the toolbar or other floating
 * elements. It works only when the text is selected in the isEditable element
 *
 * SHOULD BE USED ONLY WITH @function isTextSelected
 */
export const getElementCoordinates = () => {
  // get the coordinates of the selected
  const coordinates = document
    ?.getSelection()
    .getRangeAt(0)
    .getBoundingClientRect();

  return coordinates;
};

/**
 * Fundamental function.
 *
 * @functionality Check if text is selected and if the element is editable
 *
 * When the text is edites, call @function document.getSelection()
 * inside this function i get the range of the selection: anchorOffset = start, extentOffset = end
 * If these two are different, then the text has been selected and returns true, else false
 *
 * @workings
 * All the key bindings (Ctrl+A, Shift+L/R, Shift+Ctrl+L/R)
 */
export const isTextSelected = () => {
  // get the selected element
  const s = document.getSelection();
  // check if the element is editable
  const element = s.focusNode ? s.focusNode.parentElement : false;
  // check if start (anchorOffset) != end of selection (extentOffset)
  // if they are equal, then no text has been selected

  // also check if class doesn't have "no-toolbar"
  return (
    // @ts-ignore
    s.anchorOffset !== s.extentOffset &&
    element &&
    element.isContentEditable &&
    !element.getAttribute("data-notoolbar")
  );
};
/**
 * @functionality the parent element is the contentEditable element(<div contentEditable>)
 * Sometimes the content editable is nested so can't use normal parentElement as @function isTextSelected
 *
 * Use the linked-list algorithms, while the classList of the element doesn't contain (editor--editor) which
 * is the classname for the contentEditable div
 */
export const getParentElement = () => {
  // check if the text is selected
  if (isTextSelected()) {
    // get the starting node
    let element = document.getSelection().anchorNode.parentElement;
    // loop while not found the element with the editor--editor classname
    while (!element.classList.contains("editor--editor")) {
      element = element.parentElement;
    }
    return element;
  }
};

/**
 * @functionality Get the position of the caret (text cursor).
 * Returns end if it is at end
 *
 * @Warning
 *
 * Not impletemented and optimized
 */
export const handleCaretPosition = (e: React.ChangeEvent<any>) => {
  // get position of caret for a certain contenEditable container.
  const element = e.currentTarget;

  var doc = element.ownerDocument || element.document;
  var win = doc.defaultView || doc.parentWindow;
  var range = win.getSelection().getRangeAt(0);
  var preCaretRange = range.cloneRange();

  preCaretRange.selectNodeContents(element);
  preCaretRange.setEnd(range.endContainer, range.endOffset);

  return [
    preCaretRange.toString().length,
    element.innerText.length ===
    preCaretRange.toString().length +
      element.innerHTML.split("<div>").length -
      1
      ? "end"
      : null,
  ];
};
/**
 * @functionality Move caret at the end.
 * USed a lot for moving from one contentEdiable to another
 *
 * @internetOption StackOverflow
 */
export const moveCaretToEnd = (e: any) => {
  var range, selection;
  if (document.createRange) {
    range = document.createRange();
    range.selectNodeContents(e);
    range.collapse(false);
    selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    e.focus();
    // @ts-ignore
  } else if (document.selection) {
    //IE 8 and lower
    // @ts-ignore
    range = document.body.createTextRange();
    range.moveToElementText(e);
    range.collapse(false);
    range.select();
  }
};

/**
 * @functionality Get the next and prevous contentEditable element in the parent group
 *
 * The nextSibling.childen[index] -> index is used to specify where the editable container is placed in #editors
 *
 * @update
 *
 * Need to be updated if changes the .editor--editor-safeview
 */
export const getNextEditor = (e: any) => {
  return (
    e.currentTarget.parentElement.nextSibling &&
    e.currentTarget.parentElement.nextSibling.children[0]
  );
};
export const getPreviousEditor = (e: any) => {
  return (
    e.currentTarget.parentElement.previousSibling &&
    e.currentTarget.parentElement.previousSibling.children[0]
  );
};

// HIGHLIGHT TEXT - NEED FIX, NOT WORK WITH MULTIPLE LINES
export const higlightText = () => {
  // @ts-ignore -> linked-list
  let selectedElement = window.getSelection().baseNode.parentNode; // html element

  if (selectedElement.nodeName !== "SPAN") {
    document.execCommand("backColor", false, "#ffffff00");

    // @ts-ignore -> linked-list
    selectedElement = window.getSelection().baseNode.parentNode;
    selectedElement.style.backgroundColor = "";
  }
  selectedElement.classList.toggle("editor--highlight-text");
};
export const isTextHighlighted = () => {
  // @ts-ignore -> linked-list
  let selectedElement = window.getSelection().baseNode.parentNode; // html element

  return selectedElement.classList.contains("editor--highlight-text");
};
export const isValidUrl = (url: string) => {
  try {
    new URL(url);
  } catch (_) {
    return false;
  }

  return true;
};
