import { nanoid } from "nanoid";

class Constructor {
  id: string;
  text: string;
  initialValue: string;

  type: string;
  level?: number | null;
  embed_src?: string | null;

  image: {
    src: string | null;
    thumb: string | null;
    id: string | null;
    provider: string | null;
    info: string | null;
    size: string | null;
  };

  constructor(initialValue?: string, type?: string) {
    this.text = initialValue || "";
    this.id = nanoid();
    // initalValue is used as the placeholder of the defailt data from the DB
    this.initialValue = initialValue || "";
    this.type = type || "paragraph";
    this.level = null;
    this.embed_src = null;

    this.image = {
      thumb: null,
      src: null,
      id: null,
      provider: null,
      info: null,
      size: null,
    };
  }
}

export default Constructor;
