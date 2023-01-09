/**
 *
 * @param {state} state whole editors state
 * @param {index, src} param1 src is optional
 */
export const setImage = (state, { index, src, provider }) => {
  const editors = [...state.editors];
  editors[index].type = "image";
  if (src) editors[index].image_src = src;
  if (provider) editors[index].image_provider = provider;
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
export const removeImage = (state, { index }) => {
  const editors = [...state.editors];
  editors[index].type = "paragraph";
  editors[index].image_src = null;
  editors[index].image_provider = null;
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
export const handleImageCaption = (state, { e, index }) => {
  const editors = state.editors;
  const text = e.target.value;

  editors[index].text = text;

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
export const setEmbed = (state, { index, src }) => {
  const editors = [...state.editors];
  editors[index].type = "embed";
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
export const removeEmbed = (state, { index }) => {
  const editors = [...state.editors];
  editors[index].type = "paragraph";
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
export const setHeader = (state, { editor, index, n_type, level }) => {
  const isActive =
    editor.type === "header" ? (editor.level === level ? true : false) : false;

  console.log(isActive);
  const editors = [...state.editors];
  if (!isActive) {
    editors[index].type = n_type;
    editors[index].level = level;
  } else {
    editors[index].type = "paragraph";
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
export const setCode = (state, { index }) => {
  const editors = [...state.editors];
  if (editors[index].type === "paragraph") editors[index].type = "code";
  else editors[index].type = "paragraph";
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
export const setBlockQuote = (state, { index }) => {
  const editors = [...state.editors];
  if (editors[index].type === "paragraph") editors[index].type = "blockquote";
  else editors[index].type = "paragraph";
  return {
    ...state,
    editors,
  };
};
