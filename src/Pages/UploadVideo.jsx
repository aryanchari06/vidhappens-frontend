import React from "react";
import AuthBtns from "../Utils/AuthBtns";
import { VideoUpload } from "../Utils/indexUtils";
import { useSelector } from "react-redux";

function UploadVideo() {
  const authStatus = useSelector((state) => state.auth.authStatus);

  return (
    <div>
      {authStatus ? (
        <>
          <VideoUpload />
        </>
      ) : (
        <div>
          <h2>Please log in to browse videos</h2>
          <AuthBtns />
        </div>
      )}
    </div>
  );
}

export default UploadVideo;
