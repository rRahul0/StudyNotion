import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useDispatch } from "react";
import { useNavigate } from "react-router-dom";
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI";
import { removeFromCart } from "../../../../slices/cartSlice";
import IconButton from "../../../common/IconButton";

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuyCourse = () => {
    // console.log(cart)
    const courses = cart.map((course) => course._id);
    buyCourse(token, courses, user, navigate, dispatch);
    for (let course of cart) {
      dispatch(removeFromCart(course._id));
    }
    // console.log("bought cart course");
  };
  return (
    <div>
      <p>Total:</p>
      <p>Rs {total}</p>
      <IconButton
        text="Buy Now"
        onClick={handleBuyCourse}
        customClasses={"w-full justify-center"}
      />
    </div>
  );
}
