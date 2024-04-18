import { useEffect } from "react";

// This hook detects clicks outside of the specified component and calls the provided handler function.
export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    // Define the listener function to be called on click/touch events
    const listener = (event) => {
      // If the click/touch event originated inside the ref element, do nothing
      // console.log(ref)
      
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      // if (!ref2.current || ref2.current.contains(event.target)) {
      //   return;
      // }
        handler();


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
      
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]); // Only run this effect when the ref or handler function changes
}
