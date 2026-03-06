import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";


export function useContent(){

    const[contents , setContents] = useState([]);
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/content`,{
            withCredentials :true
        }).then((response)=>{
            setContents(response.data.content)
        }).catch((error) => {
            console.error("Error fetching content:", error);
        })
    },[])
    
    return contents;
}