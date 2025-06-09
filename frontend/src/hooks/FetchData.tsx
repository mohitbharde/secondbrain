/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Backend_url } from "../../config";
import { Card } from "../components/ui/Card";
import { useEffect } from "react";

async function fetchdata() {
  const response = await axios.get(`${Backend_url}/content`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return response.data.content;
}

export function FetchData() {
  const { isLoading } = useQuery({
    queryKey: ["mainData"],
    queryFn: fetchdata,
  });

  const queryClient = useQueryClient();

  function updateToAll() {
    const temp = queryClient.getQueryData(["mainData"]);
    queryClient.setQueryData(["fetchdata"], temp);
  }

  const { data }: any = useQuery({
    queryKey: ["fetchdata"],
    queryFn: updateToAll,
  });

  useEffect(() => {
    updateToAll();
  }, [isLoading]);

  if (isLoading) return <div>... loading </div>;

  if (data?.length == 0)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        {" "}
        no content available
      </div>
    );

  //console.log("All cached data:", queryClient.getQueryCache().findAll());
  return (
    <>
      {data?.map(({ type, link, title, tags, _id }) => (
        <Card type={type} link={link} title={title} tags={tags} id={_id} />
      ))}
    </>
  );
}
