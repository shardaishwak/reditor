import React from "react";

import Editors from "./Editors";
import EditorProvider from "./store/EditorProvider";

// If want to get the state, use
// const {state, dispatch} = useContaxt(EditorContext)

const eRoot = (props) => (
  <EditorProvider>
    <Editors onExtract={props.onExtract} />
  </EditorProvider>
);
export default eRoot;
