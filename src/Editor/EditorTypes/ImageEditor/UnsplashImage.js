import React, { useState } from "react";

// Unsplash Handling
const UnsplashImage = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [unsplashImages, setUnsplashImages] = useState([]);

  const handleUnsplash = () => {
    // wrap first withEditorReducer()
    /**
     * props.dispatch({
          type: SET_IMAGE,
          index: props.index,
          src: imageSrc,        <-- The url got from the database
          provider: "unsplash"
        });
     */
    console.log(searchInput);
  };
  return (
    <div className="editor--editor-image-unsplash">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // check if text present
          // fetch images
          // show images
          handleUnsplash();
        }}
      >
        <input
          type="text"
          placeholder="Search image from Unsplash"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </form>
      <div className="editor--editor-image-unsplash-results">
        {unsplashImages.length} Results
      </div>
    </div>
  );
};

export default UnsplashImage;
