import React, { useState } from "react";

// Upload Handling
const UploadImage = (props) => {
  const [imageFile, setImageFile] = useState(null);
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageFile(reader.result);
    };
  };
  const handleDrop = (e) => {
    const file = e.dataTransfer.items[0].getAsFile();
    previewFile(file);
    e.preventDefault();
  };
  const handleSelect = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    e.preventDefault();
  };
  const UploadImage = () => {
    // upload it to database with Cloudinary
    // get the url of the image
    /* props.dispatch({
          type: SET_IMAGE,
          index: props.index,
          src: imageSrc,        <-- The url got from the database
          provider: "upload"
        });
              */
    console.log(imageFile);
  };
  return (
    <div className="editor--editor-image-upload">
      {!imageFile ? (
        <>
          <label
            htmlFor="at-editor--input-file"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            Click the box <br /> or <br /> Drop Image
          </label>
          <input
            type="file"
            id="at-editor--input-file"
            name="file"
            onChange={handleSelect}
          />
        </>
      ) : (
        <>
          <div>
            <button
              className="editor--editor-image-button"
              onClick={() => setImageFile(null)}
            >
              CANCEL
            </button>
            <button
              className="editor--editor-image-button button-upload"
              onClick={UploadImage}
            >
              UPLOAD
            </button>
          </div>
          <img src={imageFile} alt="Boch"></img>
        </>
      )}
    </div>
  );
};

export default UploadImage;
