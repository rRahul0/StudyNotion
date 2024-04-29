import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { fetchCourseCategories } from '../../../../services/operations/CourseDetailsAPI'
import { FiEdit2 } from "react-icons/fi"

import { RiDeleteBin6Line } from "react-icons/ri"
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import ConfirmationModal from '../../../common/ConfirmationModel'
import { deleteCategory } from '../../../../services/operations/Category'
import { useNavigate } from 'react-router-dom'
import { setCategory } from '../../../../slices/categorySlice'
import { useDispatch } from 'react-redux'
export function Categories() {
    const { token } = useSelector(state => state.auth)

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const fetchCourse = async () => {
        const result = await fetchCourseCategories(token)
        if (result) setCategories(result)
    }
    useEffect(() => { fetchCourse() }, [])

    const handleCategoryDelete = async (categoryId) => {
        setLoading(true)
        try {
            const res = await deleteCategory(categoryId, token)
            if(res.success)setCategories(categories.filter(category => category._id !== categoryId))
        } catch (error) {
            console.log("not deleted")
        }
        setConfirmationModal(null)
        setLoading(false)
    }
    const handleEdit = (categoryId) => {
        const category = categories.find(category => category._id === categoryId)
        dispatch(setCategory(category))
        setCategory(category)
        navigate(`/dashboard/edit-category/${categoryId}`)
    }

    return (
        <div>
            <h2 className='text-richblack-100 text-4xl '>All Categories</h2>
            {
                categories &&
                <Table className="rounded-xl border border-richblack-600  my-10">
                    <Thead>
                        <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-4 bg-richblack-800">
                            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">Courses</Th>
                            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">Duration</Th>
                            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">Price</Th>
                            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">Actions</Th>

                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            categories.length === 0 ?
                                (<Tr>
                                    <Td className="py-10 text-center text-2xl font-medium text-richblack-100">No Courses Found</Td>
                                </Tr>) : (
                                    categories.map((category, index) => (
                                        <Tr key={category._id} className="border-b border-richblack-800 px-6 py-8 grid grid-cols-4 gap-12 bg-richblack-700">
                                            {/* <Td className="flex flex-1 gap-x-4 ">
                                            <img
                                                src={course?.thumbnail}
                                                alt={course?.courseName}
                                                className="h-[148px] w-[220px] rounded-lg object-cover"
                                            />
                                            <div className="flex flex-col justify-between">
                                                <p className="text-lg font-semibold text-richblack-5">{course.courseName}</p>
                                                <p className="text-xs text-richblack-300">
                                                    {course.courseDescription.split(" ").length >
                                                        TRUNCATE_LENGTH
                                                        ? course.courseDescription
                                                            .split(" ")
                                                            .slice(0, TRUNCATE_LENGTH)
                                                            .join(" ") + "..."
                                                        : course.courseDescription}
                                                </p>
                                                <p className="text-[12px] text-white">
                                                    Created: {formatDate(course.createdAt)}
                                                </p>
                                                {
                                                    course.status === COURSE_STATUS.DRAFT ?
                                                        (<p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                                                            <HiClock size={14} />
                                                            Drafted
                                                        </p>) : (
                                                            <div className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                                                                <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                                                                    <FaCheck size={8} />
                                                                </div>
                                                                Published
                                                            </div>
                                                        )
                                                }
                                            </div>
                                        </Td> */}
                                            <Td className="text-sm font-medium text-richblack-100 ">
                                                {category.name}
                                            </Td>
                                            <Td className="text-sm font-medium text-richblack-100">
                                                {category.description.length > 15 ?
                                                    category.description.substring(0, 15) + " ..." :
                                                    category.description}
                                            </Td>
                                            <Td className="text-sm font-medium text-richblack-100">
                                                {category.courses.length}
                                            </Td>
                                            <Td>
                                                <button
                                                    disabled={loading}
                                                    onClick={()=>handleEdit(category._id)}
                                                    title="Edit"
                                                    className="text-richblack-25 px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                                                >
                                                    <FiEdit2 size={20} />
                                                </button>
                                                <button
                                                    disabled={loading}

                                                    onClick={() => setConfirmationModal({
                                                        text1: "Do you want to delete this category?",
                                                        text2: "All the data related to this category will be deleted",
                                                        btn1Text: !loading ? "Delete" : "Loading...  ",
                                                        btn2Text: "Cancel",
                                                        btn1Handler: () => !loading ? handleCategoryDelete(category._id) : () => { },
                                                        btn2Handler: () => !loading ? setConfirmationModal(null) : () => { }
                                                    })}
                                                    title="Delete"
                                                    className="text-richblack-25 px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                                >
                                                    <RiDeleteBin6Line size={20} />
                                                </button>
                                            </Td>
                                        </Tr>
                                    ))
                                )
                        }
                    </Tbody>
                </Table>
            }
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

        </div>
    )
}

export default Categories
