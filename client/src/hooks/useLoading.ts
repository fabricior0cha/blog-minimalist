import { useEffect, useState } from "react"

export const useLoading = () : [boolean] =>{
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
          }, 1500);
    
    }, [])
    return [loading]
}