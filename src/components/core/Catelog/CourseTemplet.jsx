import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../common/RatingStars";
import GetAvgRating from "../../../utils/AvgRating";

export default function CourseTemplet({ course, Height }) {
  const [avgRatingCount, setAvgRatingCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndreviews);
    setAvgRatingCount(count);
  }, [course]);
  
  return (
    <div className="w-full flex justify-center ">
      <Link to={`/courses/${course._id}`}>
        <div>
          <div className="rounded-lg">
            <img
              src={course?.thumbnail}
              alt="course thumbnail"
              className={`${Height} w-full rounded-xl object-cover `}
            />

            <div className="flex flex-col gap-2 px-1 py-3">
              <p className="text-xl text-richblack-5">{course?.courseName}</p>
              <p className="text-sm text-richblack-50">
                {course?.instructor?.firstName} {course?.instructor?.lastName}
              </p>

              <div className="flex items-center gap-2">
                <span className="text-yellow-5">{avgRatingCount || 0}</span>
                <RatingStars Review_Count={avgRatingCount} />
                <span className="text-richblack-400">{course?.ratingAndreviews?.length} Ratings</span>
              </div>

              <p className="text-xl text-richblack-5">rs. {course?.price}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
