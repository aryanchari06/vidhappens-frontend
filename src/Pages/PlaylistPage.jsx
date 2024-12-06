import React from "react";
import {
  AuthBtns,
  PlaylistPage as PlaylistComponent,
} from "../Utils/indexUtils";
import { useSelector } from "react-redux";

function PlaylistPage() {
  const authStatus = useSelector((state) => state.auth.authStatus);

  return (
    <div>
      {authStatus ? (
        <>
          <PlaylistComponent />
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

export default PlaylistPage;
