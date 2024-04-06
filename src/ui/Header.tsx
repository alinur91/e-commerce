import { logo } from "@data/index";
import { selectAuthData } from "@features/auth/slices/selector";
import { CiSearch, IoCartOutline } from "@utils/icons";
import { Avatar, Button, DropDownOptions } from ".";
import { useRef, useState } from "react";
import { useClickOutside, useAppSelector } from "@hooks/index";
import { useLocation } from "react-router-dom";
import { selectCartData } from "@features/cart/slices/selector";

type HeaderProps = {
  handleToggleSidebar: () => void;
};

const Header = ({ handleToggleSidebar }: HeaderProps) => {
  const { loggedInUser } = useAppSelector(selectAuthData);
  const { cartProducts } = useAppSelector(selectCartData);
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const location = useLocation();

  useClickOutside({ dropdownRef }, () => setShowDropDown(false));

  const handleClick = () => {
    setShowDropDown((hasDropDownShown) => !hasDropDownShown);
  };

  const path = location.pathname === "/search" ? "/" : "/search";
  return (
    <header className="sticky left-0 right-0 top-0  z-20 flex h-[80px] items-center justify-between border-b-2 border-gray-300 bg-white px-6 shadow-sm  sm:h-[100px] sm:px-24">
      {" "}
      <Button to="/">
        <img className="h-12 w-12 sm:h-20 sm:w-20" src={logo} alt="" />
      </Button>
      <div className=" flex items-center  gap-4 text-gray-600">
        <Button to={path}>
          <CiSearch className="text-3xl text-gray-400 sm:text-4xl" />
        </Button>
        <div className="relative cursor-pointer" onClick={handleToggleSidebar}>
          <IoCartOutline className="text-3xl text-gray-400 sm:text-4xl" />
          <div className="flex-shrink-1 absolute left-[55%] top-[-30%] flex h-5 w-5 items-center justify-center rounded-full bg-red-700 text-xs font-bold text-white sm:h-6 sm:w-6 sm:text-sm">
            {cartProducts.length}
          </div>
        </div>
        <div
          className="relative flex cursor-pointer  items-center gap-2"
          onClick={handleClick}
          ref={dropdownRef}
        >
          <Avatar
            className="h-8 w-8 rounded-full  object-cover sm:h-10 sm:w-10"
            src={loggedInUser?.photoURL}
          />
          <h3 className="text-sm sm:text-lg">
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
