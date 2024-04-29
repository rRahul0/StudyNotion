import { categories } from "../apis"
import { apiConnector } from "../apiConnector"
import { toast } from "react-hot-toast"
import { setLoading } from "../../slices/authSlice"
import { endpoints } from "../apis"


const { CREATE_CATEGORY_API, DELETE_CATEGORY_API, UPDATE_CATEGORY_API } = categories

export async function createCategory({name,  description}, token) {
    try {
        // console.log("CREATE_CATEGORY_API API............", name, description, token)
        const response = await apiConnector("POST", CREATE_CATEGORY_API, { name, description }, {
            Authorization: `Bearer ${token}`,
        })
        console.log(response.data)
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Category Created Successfully")
        return response.data.tagDetails
    } catch (error) {
        console.log("CREATE_CATEGORY_API API ERROR............", error)
        toast.error(error?.response?.data?.message || "Could Not Create Category")
    }
}

export async function deleteCategory(categoryId, token) {
    try {
        const response = await apiConnector("DELETE", DELETE_CATEGORY_API, { categoryId }, {
            Authorization: `Bearer ${token}`,
        })
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        console.log("DELETE_CATEGORY_API API............", response.data)
        return response.data
    } catch (error) {
        console.log("DELETE_CATEGORY_API API ERROR............", error)
        toast.error("Could Not Delete Category")
    }
}

export async function updateCategory(categoryId, categoryName, categoryDesc, token) {
    try {
        const response = await apiConnector("PUT", UPDATE_CATEGORY_API, { categoryId, name:categoryName, description:categoryDesc }, {
            Authorization: `Bearer ${token}`,
        })
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        return response.data
    } catch (error) {
        console.log("UPDATE_CATEGORY_API API ERROR............", error)
        toast.error("Could Not Update Category")
    }
}
