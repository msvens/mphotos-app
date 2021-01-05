import PhotosApi, {Guest, User} from "./api";
import {useEffect, useState} from "react";

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

