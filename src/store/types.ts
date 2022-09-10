export interface Editor {
  text: string;
  id: string;
  initialValue: string;
  type: TEditor;
  level: 1 | 2 | 3;
  embed_src: string;
  image: EditorImage;
}

export interface EditorImage {
  thumb: string;
  src: string;
  regular: string;
  id: string;
  provider: string;
  info?: { name: string; username: string; email: string };
  size?: string;
}

export enum TEditor {
  paragraph = "paragraph",
  image = "image",
  code = "code",
  embed = "embed",
  blockquote = "blockquote",
  header = "header",
}
