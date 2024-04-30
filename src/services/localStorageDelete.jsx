import toast from "react-hot-toast";
import { logout } from "./operations/authAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export const localStorageDelete = () => {
    // console.log("cvjxbn")
if(JSON.parse(localStorage.getItem("token")).expiry < Date.now())console.log("expired")
    // const dispatch = useDispatch()
    // const navigate = useNavigate()
    // console.log("cmbxvmncx,mv")

    return <>
        {
            JSON.parse(localStorage.getItem("token")).expiry < Date.now() ? (
                <>
                    {dispatch(logout(navigate))}
                    {toast.error("Token Expired")}

                </>
            ) : (
                false
            )
        }
    </>
}