import React from "react";
import { ChannelLayout as LayoutComponent } from "../Utils/indexUtils";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

function ChannelLayout() {
  const { channelUsername } = useParams();
  const userData = useSelector((state) => state.auth.userData);

  // console.log("userData:", userData); // Debugging
  // console.log("username from params:", channelUsername); // Debugging

  const isUserChannel = userData && channelUsername === userData.username; // Check if userData exists
  // console.log(isUserChannel)

  return (
    <div>
      <LayoutComponent isUserChannel={isUserChannel} />
    </div>
  );
}


export default ChannelLayout;
