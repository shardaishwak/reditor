import { IEditorState } from "../EditorProvider";

const getElementCoordinates = () => {
  // get the coordinates of the selected
  const coordinates = document
    .getSelection()
    .getRangeAt(0)
    .getBoundingClientRect();

  return coordinates;
};

export const updatePosition = (state: IEditorState, action) => {
  /**
   * @todo has been just changed 23/10/2020 10:50PM
   */
  const coordinates = getElementCoordinates();

  // re-render the coordinates of the toolbar positioning.
  return {
    ...state,
    toolbar_position: [
      coordinates.y + window.scrollY,
      coordinates.left,
      coordinates.right,
    ],
  };
};
