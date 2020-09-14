import { useEffect, useState, Dispatch, SetStateAction } from "react";

type res<T> = [
    T,
    Dispatch<SetStateAction<T>>,
];

function usePersistentState<T>(key: string, initialState: T): res<T> {
    const [state, setState] = useState(() => {
        const storageValue = localStorage.getItem(key);

        if(storageValue){
            return JSON.parse(storageValue);
        }else{
            return initialState;
        }
    });

    useEffect(() =>{
        localStorage.setItem(key, JSON.stringify(state));
    },[key, state]);

    return [state, setState];
};

export default usePersistentState;