import { nanoid } from "nanoid";

function EditorConstructor(initialValue, type) {
  this.text = initialValue || "";
  this.id = nanoid();
  // initalValue is used as the placeholder of the defailt data from the DB
  this.initialValue = initialValue || "";
  this.type = type || "paragraph";
  this.level = null;
  this.image_src = null;
  this.image_provider = null;
  this.embed_src = null;
}

export default EditorConstructor;
