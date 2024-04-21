import toast  from "react-hot-toast";

export const localStorageDelete = () => {
    const userToken = JSON.parse(localStorage.getItem("token"))
    // console.log(userToken.expiry)
    if (userToken?.expiry < Date.now()) {
        if(localStorage.getItem("token")){localStorage.removeItem("token")}
        if(localStorage.getItem("user"))localStorage.removeItem("user")
        toast.error("Session Expired. Please Login Again")
        return true
    }return false
}