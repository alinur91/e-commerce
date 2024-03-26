import { avatar } from "@data/index";

type AvatarProps = {
  className: string;
  src: string | null | undefined;
};

const Avatar = ({ className, src }: AvatarProps) => {
  const defaultAvatarSrc =
    "https://yyfjumfmwgnvczjziqao.supabase.co/storage/v1/object/public/user/userPlaceHolder.jpg";

  return (
    <img
      className={`${className}`}
      src={src || defaultAvatarSrc || avatar}
      alt=""
    />
  );
};

export default Avatar;
