import { Editor, TEditor } from "../types";
import { EditorReducerType } from "../provider";

/**
 *
 * @param {state} state whole editors state
 * @param {index, src} param1 src is optional
 */
export const setImage = (
  state: EditorReducerType,
  { index, src, thumb, provider, id, info, regular }
) => {
  const editors = [...state.editors];
  editors[index].type = TEditor.image;

  editors[index].image = {
    src: src || null,
    thumb: thumb || null,
    regular: regular || null,
    id: id || null,
    provider: provider || null,
    info: info || null,
  };
  return {
    ...state,
    editors,
  };
};
/**
 *
 * @param {state} state
 * @param {index} param1
 */
export const removeImage = (
  state: EditorReducerType,
  { index }: { index: number }
) => {
  const editors = [...state.editors];
  editors[index].type = TEditor.paragraph;

  editors[index].image = {
    src: null,
    thumb: null,
    regular: null,
    id: null,
    provider: null,
    info: null,
  };
  return {
    ...state,
    editors,
  };
};
/**
 *
 * @param {state} state
 * @param {e, index} param1
 */
export const handleImageCaption = (
  state: EditorReducerType,
  { text, index }: { text: string; index: number }
) => {
  const editors = [...state.editors];

  editors[index].text = text;

  return {
    ...state,
    editors,
  };
};

/**
 *
 * @param {state} state
 * @param {index} param1
 */
export const toggleImageSize = (
  state: EditorReducerType,
  { index }: { index: number }
) => {
  const editors = [...state.editors];

  if (editors[index].image.size === "stretch")
    editors[index].image.size = "normal";
  else editors[index].image.size = "stretch";

  return {
    ...state,
    editors,
  };
};

/**
 *
 * @param {state} state
 * @param {index, src} param1 src is optional
 */
export const setEmbed = (
  state: EditorReducerType,
  { index, src }: { index: number; src: string }
) => {
  const editors = [...state.editors];
  editors[index].type = TEditor.embed;
  if (src) editors[index].embed_src = src;
  return {
    ...state,
    editors,
  };
};

/**
 *
 * @param {state} state
 * @param {index} param1
 */
export const removeEmbed = (
  state: EditorReducerType,
  { index }: { index: number }
) => {
  const editors = [...state.editors];
  editors[index].type = TEditor.paragraph;
  editors[index].embed_src = null;
  return {
    ...state,
    editors,
  };
};

// HEadings

/**
 *
 * @param {state} state
 * @param {editor, index, n_type, level} param1
 *
 * Handles also check what type of header is it: [1,2,3]
 */
// Need to provide TEditor to n_type
export const setHeader = (
  state: EditorReducerType,
  {
    editor,
    index,
    n_type,
    level,
  }: {
    editor: Editor;
    index: number;
    n_type: TEditor;
    level: 1 | 2 | 3;
  }
) => {
  const isActive =
    editor.type === "header" ? (editor.level === level ? true : false) : false;

  const editors = [...state.editors];
  if (!isActive) {
    editors[index].type = n_type;
    editors[index].level = level;
  } else {
    editors[index].type = TEditor.paragraph;
    editors[index].level = null;
  }
  return {
    ...state,
    editors,
  };
};

// Code

/**
 *
 * @param {state} state
 * @param {index} param1
 */
export const setCode = (
  state: EditorReducerType,
  { index }: { index: number }
) => {
  const editors = [...state.editors];
  if (editors[index].type === "paragraph") editors[index].type = TEditor.code;
  else editors[index].type = TEditor.paragraph;
  return {
    ...state,
    editors,
  };
};

// Quote
/**
 *
 * @param {state} state
 * @param {index} param1
 */
export const setBlockQuote = (
  state: EditorReducerType,
  { index }: { index: number }
) => {
  const editors = [...state.editors];
  if (editors[index].type === "paragraph")
    editors[index].type = TEditor.blockquote;
  else editors[index].type = TEditor.paragraph;
  return {
    ...state,
    editors,
  };
};
