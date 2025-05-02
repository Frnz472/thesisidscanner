import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";
import { MdOutlineDashboard, MdOutlineRecordVoiceOver } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { AiOutlineBook } from "react-icons/ai";

const Sidebar = () => {
  const menus = [
    { name: "Dashboard", link: "/dashboard", icon: MdOutlineDashboard },
    { name: "Attendance Record", link: "/attendancerecord", icon: MdOutlineRecordVoiceOver },
    { name: "Courses", link: "/courses", icon: AiOutlineBook },
    { name: "Settings", link: "/settings", icon: CiSettings },
    { name: "Help/Support", link: "/helps", icon: IoIosHelpCircleOutline },
  ];
  
  const [open, setOpen] = useState(true);

  return (
    <section className="flex gap-6 font-['Poppins']">
      <div
        className={`bg-amber-400 min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-black-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus.map((menu, i) => (
            <Link
              to={menu.link}
              key={i}
              className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-white hover:text-black rounded-md relative"
            >
              <div>{React.createElement(menu.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${(i + 3) * 100}ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open ? "opacity-0 translate-x-28 overflow-hidden" : ""
                }`}
              >
                {menu.name}
              </h2>
              {/* Tooltip when sidebar is closed */}
              <h2
                className={`absolute left-16 bg-white text-gray-900 font-semibold rounded-md drop-shadow-lg px-2 py-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                  open ? "hidden" : ""
                }`}
              >
                {menu.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      <div className="m-3 text-xl text-gray-900 font-semibold"></div>
    </section>
  );
};

export default Sidebar;