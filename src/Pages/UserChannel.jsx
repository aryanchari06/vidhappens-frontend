import React from "react";
import { UserChannel as ChannelComponent } from "../Components/index";
import {  useSelector } from "react-redux";

function UserChannel() {
  const userData = useSelector((state) => state.auth.userData);
  const channelStats = useSelector(state => state.stats.channelStats)

  const combinedData = {...userData, ...channelStats}
  // console.log(combinedData)
  
  return (
    <div className="min-h-screen bg-gray-950 p-6">
      {userData ? (
        <ChannelComponent user={combinedData} />
      ) : (
        <p className="text-white text-center text-lg">
          User data is unavailable. Please log in.
        </p>
      )}
    </div>
  );
}

export default UserChannel;
