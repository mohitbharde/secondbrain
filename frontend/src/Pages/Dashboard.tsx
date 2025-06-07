import { TopBar } from "../components/ui/TopBar";
import { SideBar } from "../components/SideBar";
import { FetchData } from "../hooks/FetchData";

//import { useQueryClient } from "@tanstack/react-query";

export function Dashboard() {
  return (
    <div className="flex  overflow-x-hidden  min-h-screen">
      <SideBar />
      <div className="min-h-screen w-full md:w-[85%]">
        <TopBar />
        <div className="mx-auto box-border h-fit justify-around flex flex-wrap gap-1  max-w-full">
          <FetchData />
        </div>
      </div>
    </div>
  );
}
