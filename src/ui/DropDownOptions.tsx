import { CgProfile, MdOutlineLogout } from "@utils/icons";
import { useAppDispatch } from "@hooks/index";
import { signout } from "@features/auth/api";
import { Button } from "@ui/index";

const DropDownOptions = () => {
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(signout());
  };

  return (
    <ul className="absolute top-[150%] z-10 cursor-pointer divide-y divide-stone-200 overflow-hidden rounded-md bg-white text-gray-400 shadow-xl outline outline-[1px] outline-gray-400">
      <Button to="/profile">
        <li className="flex items-center justify-between gap-2 px-4 py-2 hover:bg-gray-100">
          Profile <CgProfile className="text-lg" />
        </li>
      </Button>
      <li
        onClick={handleSignOut}
        className="flex items-center justify-between gap-2 px-4 py-2 hover:bg-gray-100"
      >
        Log Out <MdOutlineLogout className="text-lg" />
      </li>
    </ul>
  );
};

export default DropDownOptions;
