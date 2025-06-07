import { CiYoutube } from "react-icons/ci";
import { IconProps, iconSizeVariants } from ".";
export const Youtube = (prop: IconProps) => {
  return <CiYoutube className={iconSizeVariants[prop.size]} />;
};
