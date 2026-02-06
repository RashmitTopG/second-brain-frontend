import axios from "axios";
import { BACKEND_URL } from "../config";

export default function useShareBrain() {
  const shareBrain = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("sec-brain-token")}`,
          },
        }
      );

      const url = `${window.location.origin}/share/${res.data.hash}`;
      await navigator.clipboard.writeText(url);
      alert("Url copied to the clipboard");

      return url;
    } catch (error) {
      console.log("Error Occurred:", error);
    }
  };

  const disableShare = async () => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: false },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("sec-brain-token")}`,
          },
        }
      );
      return true;
    } catch (error) {
      console.log("Error Occurred:", error);
      return false;
    }
  };


  return { shareBrain, disableShare };
}
