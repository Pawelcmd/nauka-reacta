import { useEffect, useState } from "react"

const useDebounce = (value, delay=1000) => {
    const [debouncedValue, setDEbouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDEbouncedValue(value), delay);
        return() => clearTimeout(handler);
    },[value, delay]);

    return debouncedValue;
}

export default useDebounce;