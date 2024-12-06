import React from "react";
import { useState } from "react";

function LikedVideos() {
  const url = `${import.meta.inv.VITE_BACKEND_BASE_URL}/api/v1`;
  const [likedVideos, setLikedVideos] = useState([]);

  const getUserLikedVideos = async () => {
    try {
      const response = await fetch(`${url}/likes/videos`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else console.log("Error while fetching liked videos");
      
    } catch (error) {
      console.log("Error during API call", error);
    }
  };

  return <div>LikedVideos</div>;
}

export default LikedVideos;
