import { useEffect, useState } from "react"

function useLocalStorage (defaultValue,key){
const [value, setValue] = useState(() => {
    const sessionValue = sessionStorage.getItem(key);

    return sessionValue !== null ? JSON.parse(sessionValue) : defaultValue;
});

    useEffect(() =>{
sessionStorage.setItem(key,JSON.stringify(value))
    },[key,value]);

    return [value,setValue];
}

export default useLocalStorage