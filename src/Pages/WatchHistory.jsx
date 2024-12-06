import React from "react";
import { WatchHistory as HistoryComponent } from "../Components/index";
import { useSelector } from "react-redux";
import AuthBtns from "../Utils/AuthBtns";

function WatchHistory() {
  const authStatus = useSelector((state) => state.auth.authStatus);

  return (
    <div>
      {authStatus ? (
        <>
          <HistoryComponent />
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

export default WatchHistory;
