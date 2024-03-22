import { logo } from "@data/index";
import { selectAuthData } from "@features/auth/slices/selector";
import {
  CiSearch,
  IoCartOutline,
  CgProfile,
  MdOutlineLogout,
} from "@utils/icons";
import { Avatar, Button } from ".";
import { useRef, useState } from "react";
import { signout } from "@features/auth/api";
import { useAppDispatch, useClickOutside, useAppSelector } from "@hooks/index";

const Header = () => {
  const { loggedInUser } = useAppSelector(selectAuthData);
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useClickOutside(dropdownRef, () => setShowDropDown(false));

  const handleClick = () => {
    setShowDropDown((hasDropDownShown) => !hasDropDownShown);
  };

  const handleSignOut = () => {
    dispatch(signout());
  };

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
        <Button to="/search">
          <CiSearch className="text-3xl text-gray-400 sm:text-4xl" />
        </Button>
        <IoCartOutline className="text-3xl text-gray-400 sm:text-4xl" />
        <div
          className="relative flex cursor-pointer items-center gap-2"
          onClick={handleClick}
          ref={dropdownRef}
        >
          <Avatar
            className="h-8 rounded-full  md:h-10"
            src={loggedInUser?.photoURL}
          />
          <h3 className="text-sm md:text-lg">
            <span className="text-gray-400">Welcome, </span>
            <span className="font-bold">{loggedInUser?.name}</span>
          </h3>
          {showDropDown && (
            <ul className="absolute top-[150%] z-10 cursor-pointer divide-y divide-stone-200 overflow-hidden rounded-md bg-white text-gray-400 shadow-xl outline outline-[1px] outline-gray-400">
              <li className="flex items-center justify-between gap-2 px-6 py-2 hover:bg-gray-100">
                Profile <CgProfile className="text-lg" />
              </li>
              <li
                onClick={handleSignOut}
                className="flex items-center justify-between gap-2 px-6 py-2 hover:bg-gray-100"
              >
                Logout <MdOutlineLogout className="text-lg" />
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
