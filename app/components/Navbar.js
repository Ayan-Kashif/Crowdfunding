// 'use client'

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { FiMenu, FiX } from "react-icons/fi";
// import { AuthContext } from "../AuthContext";
// import { useContext } from "react";
// import { useRouter } from "next/navigation";
// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const router=useRouter()
//   const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
//   useEffect(() => {
//     const storedCfToken = localStorage.getItem("cfToken")
//     if (storedCfToken)
//     setIsLoggedIn(true)
//   }, [])

//   const handleLogout = () => {
//     setIsLoggedIn(false)
//     localStorage.removeItem('cfToken')
//     localStorage.removeItem('cfUser')
//   }

//   return (
//     <nav className="bg-white text-slate-700 py-4 px-6 fixed w-full top-0 shadow-md z-50">
//       <div className="max-w-6xl mx-auto flex justify-between items-center">
//         <Link href="/">
//           <h1 className="text-2xl font-bold cursor-pointer">Crowdfunding</h1>
//         </Link>

//         {/* Desktop Links */}
//         <div className="hidden md:flex space-x-6 items-center">
//           <Link href="/for-creators" className="border border-slate-700  px-4 py-2 rounded-lg hover:bg-gray-900 hover:text-white  transition-colors">
//             For Creators
//           </Link>
//           <Link href="/login" className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
//             Login
//           </Link>
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden focus:outline-none"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-blue-800 py-4 px-6 absolute w-full left-0 top-full flex flex-col space-y-4">
//           <Link href="/for-creators" className="border border-white px-4 py-2 rounded-lg text-center hover:bg-white hover:text-blue-700 transition-colors" onClick={() => setIsOpen(false)}>
//             For Creators
//           </Link>
//           {console.log('LoggedIN:',isLoggedIn)}
//           {isLoggedIn ? (
//             <Link href="/login" className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold text-center hover:bg-gray-200 transition-colors" onClick={() =>{
//                setIsOpen(false)
//                handleLogout()

//             }
//             }>
//               Logout
//             </Link>
//           ) : (
//             <Link href="/login" className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold text-center hover:bg-gray-200 transition-colors" onClick={() => setIsOpen(false)}>
//               Login
//             </Link>
//           )
//           }

//         </div>
//       )
//       }
//     </nav >
//   );
// }




"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { AuthContext } from "../AuthContext"; // Ensure correct import
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { Trash2, PlusCircle, ChevronDown, ChevronUp } from "lucide-react";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState({})
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext) || {}; // Prevent undefined error
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const path = usePathname()
  // Sync state with localStorage on mount
  useEffect(() => {
    const storedCfToken = localStorage.getItem("cfToken");
    setIsLoggedIn(!!storedCfToken); // Convert to boolean
  }, [setIsLoggedIn]); // Ensure it runs when setIsLoggedIn changes


  useEffect(() => {
    const token = localStorage.getItem("cfToken");
    const storedUser = localStorage.getItem("cfUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (!token) {
      toast.error("You must be logged in to create a campaign.");

    }
  }, [router]);



  const handleLogout = () => {
    localStorage.removeItem("cfToken");
    localStorage.removeItem("cfUser");
    setIsPopupVisible(false)
    setIsLoggedIn(false);
    router.push("/login"); // Redirect after logout
  };



  const handlePopupToggle = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  // Close the popup when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsPopupVisible(false);
    }
  };






  // return (
  //   <nav className="bg-white text-slate-700 py-4 px-6 fixed w-full top-0 shadow-md z-50">
  //     <div className="max-w-6xl mx-auto flex justify-between items-center">
  //       <Link href="/" className="flex gap-2">
  //         <img src="/images.png" className='h-8  me-3 rounded-full' alt="" />
  //         <h1 className="text-2xl font-bold cursor-pointer">FundMe</h1>
  //       </Link>

  //       {/* Desktop Links */}
  //       <div className="hidden md:flex space-x-6 items-center">
  //         <Link
  //           href="/for-creators"
  //           className="border border-slate-700 px-4 py-2 rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
  //         >
  //           For Creators
  //         </Link>
  //         {isLoggedIn && path !== "/login" ? ( // ✅ Prevent Logout button on login page
  //           <button
  //             onClick={handleLogout}
  //             className="  text-gray-600 px-4 py-2 rounded-lg font-semibold hover:text-gray-400 transition-colors"
  //           >
  //             Logout
  //           </button>
  //         ) : (
  //           path !== "/login" && ( // ✅ Prevent Login button on login page
  //             <Link
  //               href="/login"
  //               className="bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
  //             >
  //               Login
  //             </Link>
  //           )
  //         )}
  //       </div>

  //       <div onClick={handlePopupToggle} className="w-12  h-12 font-bold flex justify-center items-center bg-black text-white rounded-full">
  //         {user?.name
  //           ? user.name
  //             .split(" ")
  //             .slice(0, 3)
  //             .map(part => part.charAt(0).toUpperCase())
  //             .join("")
  //           : ""}
  //       </div>

  //       {/* Mobile Menu Button */}
  //       <button
  //         className="md:hidden focus:outline-none"
  //         onClick={() => setIsOpen(!isOpen)}
  //       >
  //         {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
  //       </button>
  //     </div>

  //     {/* Mobile Menu */}
  //     {isOpen && (
  //       <div className="md:hidden bg-blue-800 py-4 px-6 absolute w-full left-0 top-full flex flex-col space-y-4">
  //         <Link
  //           href="/for-creators"
  //           className="border border-white text-white px-4 py-2 rounded-lg text-center hover:bg-white hover:text-blue-700 transition-colors"
  //           onClick={() => setIsOpen(false)}
  //         >
  //           For Creators
  //         </Link>
  //         {isLoggedIn ? (
  //           <button
  //             onClick={() => {
  //               setIsOpen(false);
  //               handleLogout();
  //             }}
  //             className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold text-center hover:bg-red-600 transition-colors"
  //           >
  //             Logout
  //           </button>
  //         ) : (
  //           <Link
  //             href="/login"
  //             className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold text-center hover:bg-gray-200 transition-colors"
  //             onClick={() => setIsOpen(false)}
  //           >
  //             Login
  //           </Link>
  //         )}

  //         <div onClick={handlePopupToggle} className="w-12  h-12 font-bold flex justify-center items-center bg-black text-white rounded-full">
  //           {user?.name
  //             ? user.name
  //               .split(" ")
  //               .slice(0, 3)
  //               .map(part => part.charAt(0).toUpperCase())
  //               .join("")
  //             : ""}
  //         </div>
  //       </div>


  //     )}


  //     {
  //       isPopupVisible && (
  //         <div
  //           className="fixed inset-0 flex justify-center items-center text-white bg-white bg-opacity-50 z-[10000]"
  //           onClick={handleOverlayClick} // Close popup on click outside
  //         >
  //           <div
  //             className="bg-[#1c1816] rounded-3xl py-5 h-[440px] w-[470px] text-center relative transition-all transform duration-[8000ms] ease-in-out"
  //             style={{ transform: isPopupVisible ? "translateY(0)" : "translateY(-100%)" }}
  //           >
  //             <div className="style flex justify-center items-center relative bottom-5 gap-[5px]">
  //               <div className="bg-[#ea002a] h-5 w-4"></div>
  //               <div className="bg-[#ea002a] h-5 w-4"></div>
  //               <div className="bg-[#ea002a] h-5 w-4"></div>
  //             </div>
  //             <button
  //               onClick={handlePopupToggle}
  //               className="absolute top-2 right-2 mr-2 mt-2 px-4 py-[3px] rounded-md bg-[#ea002beb] text-black font-bold text-lg"
  //             >
  //               ✕
  //             </button>
  //             <h2 className="text-xl font-bold mb-4">{user?.name}</h2>
  //             <div className="separation mb-4 flex justify-center bg-white h-[1px]"></div>

  //             {/* name and email container */}
  //             <div className="bg-black w-full cursor-pointer flex justify-between px-6 py-2">
  //               <div className="flex gap-6">
  //                 <div className="w-12 h-12 flex justify-center items-center bg-[#ea002a] text-white rounded-full">
  //                   {user?.name
  //                     ? user.name
  //                       .split(" ")
  //                       .slice(0, 3)
  //                       .map(part => part.charAt(0).toUpperCase())
  //                       .join("")
  //                     : ""}
  //                 </div>
  //                 <div className="data flex flex-col">
  //                   <div className="relative right-[12px]">
  //                     <span className="font-bold text-lg">{user?.name}</span>
  //                   </div>
  //                   <span className="text-sm">{user?.email}</span>
  //                 </div>
  //               </div>

  //               <div className="edit-btn flex items-center">
  //                 <button

  //                   className="bg-black border-[1.3px] px-1 py-1 text-white font-medium rounded-md border-[#ea002a]">
  //                   EDIT
  //                 </button>
  //               </div>
  //             </div>

  //             <div className="options flex mt-8 flex-col gap-2">
  //               <Link onClick={() => setIsPopupVisible(false)} href={"/myCampaigns"}>
  //                 <div className="flex   gap-4  items-center font-medium hover:translate-y-1 text-lg hover:bg-[#a3a3a3] px-8 py-2 transition-all">

  //                   <img className="w-6" src="/apps.png" alt="" />
  //                   My Campaigns</div>
  //               </Link>
  //               <Link onClick={() => setIsPopupVisible(false)} href={`/${user._id}`}>
  //                 <div className="flex  gap-5  items-center font-medium hover:translate-y-1 text-lg hover:bg-[#a3a3a3] px-7  py-2 transition-all">
  //                   <img className="w-8" src="/user.png" alt="" />

  //                   <span>Profile</span>
  //                 </div>
  //               </Link>


  //             </div>

  //             <div className="btn flex justify-center items-center">
  //               <button
  //                 className="text-white flex justify-center items-center font-bold text-center bg-[#ea002a] px-3 py-2 text-[14px] rounded my-2"
  //                 onClick={handleLogout}
  //               >
  //                 LOGOUT
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       )
  //     }
  //   </nav>
  // );
  return (
    <nav className="bg-white text-slate-700 py-4 px-6 fixed w-full top-0 shadow-md z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex gap-2">
          <img src="/images.png" className='h-8 me-3 rounded-full' alt="" />
          <h1 className="text-2xl font-bold cursor-pointer">FundMe</h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            href="/for-creators"
            className="border border-slate-700 px-4 py-2 rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
          >
            For Creators
          </Link>
          {isLoggedIn && path !== "/login" ? (
            <button
              onClick={handleLogout}
              className="text-gray-600 px-4 py-2 rounded-lg font-semibold hover:text-gray-400 transition-colors"
            >
              Logout
            </button>
          ) : (
            path !== "/login" && (
              <Link
                href="/login"
                className="bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
              >
                Login
              </Link>
            )
          )}

          {(isLoggedIn &&  path !== "/login"  ) && <div onClick={handlePopupToggle} className="w-12 h-12 font-bold flex justify-center items-center bg-black text-white rounded-full">
            {user?.name
              ? user.name
                .split(" ")
                .slice(0, 3)
                .map(part => part.charAt(0).toUpperCase())
                .join("")
              : ""}
          </div>
          }
        </div>


        {/* Mobile Menu Button */}
        <button className="md:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-800 py-4 px-6 absolute w-full left-0 top-full flex flex-col space-y-4">
          <Link
            href="/for-creators"
            className="border border-white text-white px-4 py-2 rounded-lg text-center hover:bg-white hover:text-blue-700 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            For Creators
          </Link>
          {isLoggedIn ? (
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold text-center hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold text-center hover:bg-gray-200 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}

          <div onClick={handlePopupToggle} className="w-12 h-12 font-bold flex justify-center cursor-pointer items-center bg-black text-white rounded-full">
            {user?.name
              ? user.name
                .split(" ")
                .slice(0, 3)
                .map(part => part.charAt(0).toUpperCase())
                .join("")
              : ""}
          </div>

        </div>

      )}

      {isPopupVisible && (
        <div
          className="fixed inset-0 flex justify-center items-center  text-white bg-[#1c1c1c] bg-opacity-50 z-[10000]"
          onClick={handleOverlayClick}
        >
          <div
            className="bg-white shadow-md border  border-black rounded-3xl py-5 h-[440px] w-[470px] text-center relative transition-all transform duration-[8000ms] ease-in-out"
            style={{ transform: isPopupVisible ? "translateY(0)" : "translateY(-100%)" }}
          >
            <div className="style flex justify-center items-center relative bottom-5 gap-[5px]">
              <div className="bg-blue-500 h-5 w-4"></div>
              <div className="bg-blue-500 h-5 w-4"></div>
              <div className="bg-blue-500 h-5 w-4"></div>
            </div>
            <button
              onClick={handlePopupToggle}
              className="absolute top-2 right-2 mr-2 mt-2 px-4 py-[3px] rounded-md bg-blue-500 outline-none text-white font-bold text-lg"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">{user?.name}</h2>
            <div className="separation mb-4 flex justify-center bg-white h-[1px]"></div>

            {/* Name and Email Container */}
            <div className="bg-blue-700  w-full cursor-pointer flex justify-between px-6 py-2">
              <div className="flex gap-6">
                <div className="w-12 h-12 flex justify-center items-center bg-black text-white rounded-full">
                  {user?.name
                    ? user.name
                      .split(" ")
                      .slice(0, 3)
                      .map(part => part.charAt(0).toUpperCase())
                      .join("")
                    : ""}
                </div>
                <div className="data flex flex-col">
                  <div className="relative right-[12px]">
                    <span className="font-bold text-lg">{user?.name}</span>
                  </div>
                  <span className="text-sm">{user?.email}</span>
                </div>
              </div>

            </div>

            <div className="options text-gray-800 flex mt-8 flex-col gap-2">
              <Link onClick={() => setIsPopupVisible(false)} href="/myCampaigns">
                <div className="flex gap-4 items-center font-medium hover:translate-y-1 text-lg hover:bg-[#a3a3a3] px-8 py-2 transition-all">
                  <img className="w-6" src="/campaign.png" alt="" />
                  My Campaigns
                </div>
              </Link>
              <div className=" flex pl-7">




                <Link onClick={() => setIsPopupVisible(false)} href={'/create-campaign'} className="relative mt-3 overflow-hidden bg-gray-500 text-white px-4 py-2 rounded-sm group">
                  <span className="absolute inset-0 bg-blue-500 transition-all duration-300 transform translate-x-full group-hover:translate-x-0"></span>
                  <span className="relative flex gap-4 group-hover:text-white"> <PlusCircle /> New</span>
                </Link>


              </div>




            </div>

            <div className="btn flex justify-start pl-5 pt-10 items-center">
              <button
                className=" flex justify  text-blue-500 items-center font-bold  px-3 py-2 text-[14px] rounded my-2"
                onClick={handleLogout}
              >
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
