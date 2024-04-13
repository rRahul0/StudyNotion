import { useEffect } from "react";

export default function useOnClickSpecial(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        console.log(event.target)
        handler();
      } else return;

      // Otherwise, call the provided handler function
      // handler(event);
    };

    // Add event listeners for mousedown and touchstart events on the document
    document.addEventListener("mousedown", listener);
    // console.log(1, Date.now())
    document.addEventListener("touchstart", listener);
    // console.log(21)

    // Cleanup function to remove the event listeners when the component unmounts or when the ref/handler dependencies change

    return () => {
      // console.log(2, Date.now())
      // console.log("hello world")
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]); // Only run this effect when the ref or handler function changes
}
