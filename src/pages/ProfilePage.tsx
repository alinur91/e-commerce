import {
  UpdatePasswordForm,
  UploadRemoveAvatar,
} from "@features/auth/components";

const ProfilePage = () => {
  return (
    <div className="flex flex-col items-center justify-center overflow-hidden pt-14">
      <UploadRemoveAvatar />
      <UpdatePasswordForm />
    </div>
  );
};

export default ProfilePage;
