import PhotosApi, {Guest, User, UXConfig} from "./api";
import {useEffect, useRef, useState} from "react";


export const useUXConfig: () => [UXConfig, () => void] = () => {
    const [uxConfig, setUXConfig] = useState<UXConfig>(PhotosApi.defaultUxConfig)
    const [refresh, setRefresh] = useState<boolean> (false)

    function checkUXConfig() {
        setRefresh(prev => !prev)
    }
    useEffect( () => {
        const fetchData = async () => {
            try {
                const res = await PhotosApi.getUXConfig()
                setUXConfig(res)
            } catch (error) {
                alert("error fetching uxconfig: "+error.toString())
            }
        }
        fetchData()
    }, [refresh])
    return [uxConfig, checkUXConfig]
}

export const useUser: () => [boolean,User,()=>void] = () => {
    const emptyUser: User = {name: "", bio: "", pic: ""}
    const [isUser, setIsUser] = useState<boolean>(false)
    const [user, setUser] = useState<User>(emptyUser)
    const [refresh, setRefresh] = useState<boolean> (false)

    function checkUser() {
        setRefresh(prev => !prev)
    }

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await PhotosApi.isLoggedIn()
                if (res) {
                    const res1 = await PhotosApi.getUser()
                    setUser(res1)
                }
                setIsUser(res)
            } catch(error) {
                alert("error fetching user: "+error.toString())
            }
        }
        fetchData()
    }, [refresh])

    return [isUser, user, checkUser]

}

export const useGuest: () => [boolean,Guest,boolean,() => void] = () => {
    const emptyGuest: Guest = {name: "", email: ""}
    const [isGuest, setIsGuest] = useState<boolean>(false)
    const [guest, setGuest] = useState<Guest>(emptyGuest)
    const [refresh, setRefresh] = useState<boolean> (false)
    const [loading, setLoading] = useState<boolean> (true)

    function checkGuest() {
        setRefresh(prev => !prev)
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await PhotosApi.isGuest()
                if (res) {
                    const res1 = await PhotosApi.getGuest()
                    setGuest(res1)
                }
                setIsGuest(res)
            } catch(error) {
                alert("error fetching guest "+error.toString())
            }
            setLoading(false)
        }
        fetchData()
    }, [refresh])

    return [isGuest,guest,loading,checkGuest]
}

type TimerCallback = () => void
type TimerType = (callback: TimerCallback, delay: number|null) => TimerCallback

export const useInterval: TimerType = (callback: TimerCallback, delay: number|null) => {
    const savedCallback = useRef <TimerCallback> (callback)
    const intervalRef = useRef<NodeJS.Timeout>()

    useEffect(() => {
        savedCallback.current = callback
    },[callback])

    useEffect(() => {
        if(delay !== null) {
            intervalRef.current = setInterval(() => savedCallback.current(), delay)
            return () => clearInterval(intervalRef.current!)
        }
    },[delay])

    function cancelInterval() {
        if(intervalRef.current)
            window.clearInterval(intervalRef.current)
    }
    return cancelInterval
}

export const useTimeout: TimerType = (callback, delay) => {
    const timeoutRef = useRef<number>()
    const callbackRef = useRef<TimerCallback>()

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    useEffect(() => {
        if(delay !== null) {
            timeoutRef.current = window.setTimeout(() => callbackRef.current!, delay)
            return () => window.clearTimeout(timeoutRef.current)
        }
    },[delay])

    function cancelTimer() {
        window.clearTimeout(timeoutRef.current)
    }

    return cancelTimer
}

