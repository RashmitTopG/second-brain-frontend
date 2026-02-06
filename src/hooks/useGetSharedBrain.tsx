import axios from "axios";
import { BACKEND_URL } from "../config";

export default function useGetSharedBrain() {
  const getSharedBrain = async (hash: string) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/brain/${hash}`);
      return res.data;
    } catch (err) {
      console.error("Error fetching shared brain:", err);
      return null;
    }
  };

  return { getSharedBrain };
}
