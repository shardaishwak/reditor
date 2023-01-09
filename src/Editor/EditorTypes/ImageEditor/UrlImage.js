import React, { useState } from "react";
import { isValidUrl } from "../../store/Actions/DOMFunctions";
import { SET_IMAGE } from "../../store/Constants/Options";

// Url Handling
const UrlImage = (props) => {
  // url
  const [imageSrc, setImageSrc] = useState("");
  return (
    <div className="editor--editor-image-url">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isValidUrl(imageSrc))
            props.dispatch({
              type: SET_IMAGE,
              index: props.index,
              src: imageSrc,
              provider: "web",
            });
        }}
      >
        <input
          type="text"
          className={
            !isValidUrl(imageSrc)
              ? "editor--input-invalid"
              : "editor--input-valid"
          }
          placeholder="Enter a Valid Image URL"
          value={imageSrc}
          onChange={(e) => setImageSrc(e.target.value)}
        />
      </form>
    </div>
  );
};

export default UrlImage;
