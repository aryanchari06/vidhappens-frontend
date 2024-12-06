import React from "react";
import { useSelector } from "react-redux";
import { AuthBtns } from "../Utils/indexUtils";
import { LikedVideos as LikedVideosComponent } from "../Components/index";

function LikedVideos() {
  const authStatus = useSelector((state) => state.auth.authStatus);

  return (
    <div>
      {authStatus ? (
        <>
          <LikedVideosComponent />
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

export default LikedVideos;
