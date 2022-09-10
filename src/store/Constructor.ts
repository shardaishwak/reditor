import { nanoid } from "nanoid";
import { EditorImage, TEditor } from "./types";

class Constructor {
  id: string;
  text: string;
  initialValue: string;

  type: TEditor;
  level?: number | null;
  embed_src?: string | null;

  image: EditorImage;

  constructor(initialValue?: string, type?: TEditor) {
    this.text = initialValue || "";
    this.id = nanoid();
    // initalValue is used as the placeholder of the defailt data from the DB
    this.initialValue = initialValue || "";
    this.type = type || TEditor.paragraph;
    this.level = null;
    this.embed_src = null;

    this.image = {
      thumb: "",
      src: "",
      id: "",
      provider: "",
      info: {
        name: "",
        username: "",
        email: "",
      },
      size: "",
      regular: "",
    };
  }
}

export default Constructor;
