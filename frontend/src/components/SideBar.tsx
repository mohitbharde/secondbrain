/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQueryClient } from "@tanstack/react-query";
import { BrainIcon } from "../icons/BrainIcon";
import { Document } from "../icons/Document";
import { Twitter } from "../icons/Twitter";
import { Youtube } from "../icons/Youtube";

export function SideBar() {
  const queryClient = useQueryClient();

  return (
    <div className=" hidden md:block w-[15%] px-2 md:flex-col py-2  bg-white border-r-1 border-gray-300">
      <div className="w-full mt-2 flex items-center gap-2">
        <BrainIcon />
        <div className="font-semibold text-xl ">Second Brain</div>
      </div>
      <div className="my-4 mx-1 w-full pl-3 ">
        <div
          className="flex items-center gap-2.5 py-4 hover:text-blue-500 hover:cursor-pointer"
          onClick={() => {
            const temp: any = queryClient.getQueryData(["mainData"]);
            queryClient.setQueryData(["fetchdata"], () => {
              return temp?.filter((data) => data.type == "twitter");
            });
          }}
        >
          <Twitter size="lg" />
          <div>Twitter</div>
        </div>

        <div
          className="flex items-center gap-2.5 py-4 hover:text-blue-500 hover:cursor-pointer"
          onClick={() => {
            const temp: any = queryClient.getQueryData(["mainData"]);
            queryClient.setQueryData(["fetchdata"], () => {
              return temp?.filter((data) => data.type == "youtube");
            });
          }}
        >
          <Youtube size="lg" />
          <div>Youtube</div>
        </div>

        <div
          className="flex items-center gap-2.5 py-4 hover:text-blue-500 hover:cursor-pointer"
          onClick={() => {
            const temp: any = queryClient.getQueryData(["mainData"]);
            queryClient.setQueryData(["fetchdata"], () => {
              return temp?.filter((data) => data.type == "document");
            });
          }}
        >
          <Document size="lg" />
          <div>Document</div>
        </div>
      </div>
    </div>
  );
}
