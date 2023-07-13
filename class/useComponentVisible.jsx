// import { useState, useEffect, useRef } from "react";

// export default function useComponentVisible(initialIsVisible) {
//   const [isComponentVisible, setIsComponentVisible] =
//     useState(initialIsVisible);
//   const ref = useRef(null);

//   const handleClickOutside = (event) => {
//     if (ref.current && !ref.current.contains(event.target)) {
//       setIsComponentVisible(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("click", handleClickOutside, true);
//     console.log("click");
//     return () => {
//       document.removeEventListener("click", handleClickOutside, true);
//       console.log("clicked outside");
//     };
//   }, []);

//   return { ref, isComponentVisible, setIsComponentVisible };
// }
