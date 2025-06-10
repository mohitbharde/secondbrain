import { Button } from "./Button";
import { PlusIcon } from "../../icons/Plusicon";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export function TopBar() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  function updateToAll() {
    const temp = queryClient.getQueryData(["mainData"]);
    queryClient.setQueryData(["fetchdata"], temp);
  }

  return (
    <div className="flex w-full pl-3.5 py-5 items-center justify-between">
      <div
        className="ml-2 font-medium text-2xl cursor-pointer"
        onClick={() => updateToAll()}
      >
        All Notes
      </div>

      <div className="flex justify-end px-3 py-2">
        <span className="flex gap-2">
          <Button
            variant="secondary"
            text={"Logout"}
            size="md"
            onClick={() => {
              localStorage.setItem("token", "");
              navigate("/");
            }}
          />
          <Button
            variant="primary"
            text={"Add content"}
            size="md"
            onClick={() => navigate("/post")}
            startIcon={<PlusIcon size="md" />}
          />
        </span>
      </div>
    </div>
  );
}
