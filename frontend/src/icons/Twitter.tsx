import { CiTwitter } from "react-icons/ci";
import { IconProps, iconSizeVariants } from ".";
export const Twitter = (prop: IconProps) => {
  return <CiTwitter className={iconSizeVariants[prop.size]} />;
};
