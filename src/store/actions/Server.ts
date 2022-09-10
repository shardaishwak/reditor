import axios from "axios";
import { Editor } from "../../../../redux-store";
import utils from "../../../../utils";

export const fetchSaveEditor = async (
  title: string,
  editors: Array<Editor>,
  id: string
) => {
  try {
    const response = (
      await axios(utils.server_url + "/profile/editors/save", {
        method: "POST",
        withCredentials: true,
        data: {
          title,
          editors,
          id,
        },
      })
    ).data;
    if (response.error) throw Error(response.error);
    if (response.status !== "ok")
      throw Error("An error occured: Saving Editor");
    return response.data;
  } catch (err) {
    return err;
  }
};

export const fetchDeleteEditor = async (id: string) => {
  try {
    const response = (
      await axios.delete(utils.server_url + "/profile/editors/" + id)
    ).data;
    if (response.error) throw Error(response.error);
    if (response.status !== "ok")
      throw Error("An error occured: Deleting Editor");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const fetchDeleteImage = async (id: string) => {
  try {
    const response = (
      await axios(utils.server_url + "/profile/editors/upload", {
        method: "DELETE",
        data: {
          ids: id,
        },
      })
    ).data;

    if (response.error || response.data.response.message)
      throw Error(response.error || response.data.response.message);

    if (response.status !== "ok") throw Error("An error occured: Delete Image");
    return response.data;
  } catch (error) {
    console.log(error.message);
    return;
  }
};

export const fetchUploadImage = async (fileStream: any, id: string) => {
  try {
    const response = (
      await axios(utils.server_url + "/profile/editors/upload", {
        method: "POST",
        data: {
          fileStream: fileStream,
          id: id,
        },
      })
    ).data;

    if (response.error || response.data.response.message)
      throw Error(response.error || response.data.response.message);

    if (response.status !== "ok") throw Error("An error occured: Upload Image");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const fetchUnsplashSearch = async (
  query: string,
  perpage: number,
  page: number
) => {
  try {
    const response = (
      await axios(utils.server_url + "/unsplashsearch", {
        params: {
          query: query,
          perpage: perpage,
          page: page,
        },
      })
    ).data;
    if (response.error) throw Error(response.error);
    if (response.status !== "ok")
      throw Error("An error occured: Unsplash Search");
    return response.data;
  } catch (error) {
    return error;
  }
};
