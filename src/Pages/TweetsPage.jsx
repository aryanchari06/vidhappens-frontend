import React from "react";
import { AuthBtns } from "../Utils/indexUtils";
import { Tweets } from "../Components/index";
import { useSelector } from "react-redux";

function TweetsPage() {
  const authStatus = useSelector((state) => state.auth.authStatus);
  return (
    <div>
      {authStatus ? (
        <>
          <Tweets />
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

export default TweetsPage;
