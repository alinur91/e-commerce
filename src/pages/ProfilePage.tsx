import {
  UpdatePasswordForm,
  UploadRemoveAvatar,
} from "@features/auth/components";

const ProfilePage = () => {
  return (
    <div className="flex  flex-col items-center justify-center pt-16">
      <UploadRemoveAvatar />
      <UpdatePasswordForm />
    </div>
  );
};

export default ProfilePage;
