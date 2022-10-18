import { useEffect, useState } from "react"
import axios, {AxiosRequestConfig} from 'axios'
export const useAxios = <T>(config : AxiosRequestConfig<any>,loadOnStart: boolean ) : [T | undefined, string, () => void]=>{
    
    const [data, setData] = useState<T>();
    const [error, setError] = useState('')

    useEffect(() => {
      if(loadOnStart) sendRequest()      
    }, [])
    
    const request = () => {
        sendRequest()
    }

    const sendRequest = () =>{
        axios(config)
            .then((response) =>{
                setData(response.data);
            }).catch((error) => {
            
                setError(error.message)
            })
            .finally()
    }

    return[data, error, request]
}