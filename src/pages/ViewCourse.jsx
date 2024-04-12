import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFullDetailsOfCourse } from "../services/operations/CourseDetailsAPI";
import {
  setCourseSectionData,
  setCourseEntireData,
  setCompletedLectures,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";

export default function ViewCourse() {
  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { totalNoOfLectures } = useSelector((state) => state.viewCourse);
  const dispatch = useDispatch();
 
  useState(() => {
    const setCourseSpecificDetails = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
    //   console.log("view course", courseData);
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setCourseEntireData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedVideos));
      let lectures = 0;
      courseData?.courseDetails?.courseContent?.forEach((section) => {
        lectures += section.subSections.length;
      });
      //   console.log(lectures, "lectures")
      dispatch(setTotalNoOfLectures(lectures));
    //   console.log(totalNoOfLectures);
    };
    setCourseSpecificDetails();
  }, []);
  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-6">
          <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
}
