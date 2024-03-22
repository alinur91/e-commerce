import { avatar } from "@data/index";

type AvatarProps = {
  className: string;
  src: string | null | undefined;
};

const Avatar = ({ className, src }: AvatarProps) => {
  return <img className={`${className}`} src={src || avatar} alt="" />;
};

export default Avatar;
