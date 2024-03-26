import { ButtonEnum } from "@ts-types/enums";
import { Avatar, Button } from "@ui/index";
import { FaCloudUploadAlt } from "@utils/icons";
import { removeAvatar, uploadAvatar } from "@features/auth/api";
import { selectAuthData } from "@features/auth/slices/selector";
import { useAppDispatch, useAppSelector } from "@hooks/index";
import { useState } from "react";
import { ClipLoader } from "@utils/icons";

const UploadRemoveAvatar = () => {
  const {
    loggedInUser,
    avatarActions: { uploadAvatarLoading, removeAvatarLoading },
  } = useAppSelector(selectAuthData);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setSelectedFile(selectedFile);
    }
  };

  const handleUploadAvatar = () => {
    dispatch(uploadAvatar(selectedFile as File));
  };

  const handleRemoveAvatar = async () => {
    await dispatch(removeAvatar());
    setSelectedFile(null);
  };

  return (
    <>
      <div className="relative">
        <Avatar
          src={
            selectedFile
              ? URL.createObjectURL(selectedFile)
              : loggedInUser?.photoURL
          }
          className="h-40 w-40 rounded-full object-cover md:h-52 md:w-52"
        />
        <label
          htmlFor="upload"
          className="absolute bottom-[5%] left-[75%] flex cursor-pointer items-center justify-center rounded-full bg-slate-300 p-2 shadow-md"
        >
          <FaCloudUploadAlt className="text-3xl text-slate-500" />
          <input
            onChange={handleFileChange}
            id="upload"
            type="file"
            className="hidden"
          />
        </label>
      </div>
      <div className="mt-5 flex items-center gap-6">
        <Button
          className="h-10 w-[150px] gap-1 text-xs md:h-12 md:w-48 md:text-sm"
          disabled={uploadAvatarLoading || !selectedFile}
          onClick={handleUploadAvatar}
          type={ButtonEnum.PRIMARY}
        >
          {uploadAvatarLoading ? "Uploading..." : "Upload"}{" "}
          {uploadAvatarLoading && <ClipLoader color="#be7c18" size={24} />}
        </Button>
        <Button
          className="h-10 w-[150px] gap-1 text-xs md:h-12 md:w-48 md:text-sm"
          disabled={removeAvatarLoading || !loggedInUser?.photoURL}
          onClick={handleRemoveAvatar}
          type={ButtonEnum.DANGER}
        >
          {removeAvatarLoading ? "Removing..." : "Remove"}{" "}
          {removeAvatarLoading && <ClipLoader color="#be7c18" size={24} />}
        </Button>
      </div>
    </>
  );
};

export default UploadRemoveAvatar;
