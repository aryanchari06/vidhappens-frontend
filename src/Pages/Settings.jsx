import React from "react";
import { Settings as SettingsComponent } from "../Components/index";
import { useSelector } from "react-redux";
import AuthBtns from "../Utils/AuthBtns";

function Settings() {
  const authStatus = useSelector((state) => state.auth.authStatus);

  return (
    <div>
      {authStatus ? (
        <>
          <SettingsComponent />
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

export default Settings;
