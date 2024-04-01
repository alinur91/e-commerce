import { avatar } from "@data/index";

type AvatarProps = {
  className: string;
  src: string | null | undefined;
};

const defaultAvatarSrc =
  "https://yyfjumfmwgnvczjziqao.supabase.co/storage/v1/object/public/user/userPlaceHolder.jpg";

const Avatar = ({ className, src }: AvatarProps) => {
  return (
    <img
      className={`${className}`}
      src={src || defaultAvatarSrc || avatar}
      alt=""
    />
  );
};

export default Avatar;
