import React from "react";
import { useSelector } from "react-redux";
import { AuthBtns } from "../Utils/indexUtils";

function LikedVideos() {
  const authStatus = useSelector((state) => state.auth.authStatus);

  return (
    <div>
      {authStatus ? (
        <></>
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
