import { logo } from "@data/index";
import { selectAuthData } from "@features/auth/slices/selector";
import { CiSearch, IoCartOutline } from "@utils/icons";
import { Avatar, Button, DropDownOptions } from ".";
import { useRef, useState } from "react";
import { useClickOutside, useAppSelector } from "@hooks/index";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { loggedInUser } = useAppSelector(selectAuthData);
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useClickOutside(dropdownRef, () => setShowDropDown(false));

  const handleClick = () => {
    setShowDropDown((hasDropDownShown) => !hasDropDownShown);
  };

  const path = location.pathname === "/search" ? "/" : "/search";

  return (
    <header className="sticky left-0 right-0 top-0 z-10  flex h-[60px] items-center justify-between border-b-2 border-gray-100 bg-white px-6 sm:h-[80px] sm:px-16 md:h-[100px] md:px-24">
      {" "}
      <Button to="/">
        <img
          className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20"
          src={logo}
          alt=""
        />
      </Button>
      <div className="flex items-center gap-4  text-gray-600 ">
        <Button to={path}>
          <CiSearch className="text-3xl text-gray-400 sm:text-4xl" />
        </Button>
        <IoCartOutline className="text-3xl text-gray-400 sm:text-4xl" />
        <div
          className="relative flex cursor-pointer items-center gap-2"
          onClick={handleClick}
          ref={dropdownRef}
        >
          <Avatar
            className="h-8 w-8 rounded-full  object-cover md:h-10 md:w-10"
            src={loggedInUser?.photoURL}
          />
          <h3 className="text-sm md:text-lg">
            <span className="text-gray-400">Welcome, </span>
            <span className="font-bold uppercase">{loggedInUser?.name}</span>
          </h3>
          {showDropDown && <DropDownOptions />}
        </div>
      </div>
    </header>
  );
};

export default Header;
