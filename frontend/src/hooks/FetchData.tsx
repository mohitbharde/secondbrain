import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Backend_url } from "../../config";
import { Card } from "../components/ui/Card";
import { use, useEffect } from "react";

async function fetchdata() {
  const response = await axios.get(`${Backend_url}/content`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

  console.log("Fetching data...  " + JSON.stringify(response.data.content));
  return response.data.content;
}

export function FetchData() {
  const { isFetched } = useQuery({
    queryKey: ["mainData"],
    queryFn: fetchdata,
  });

  const queryClient = useQueryClient();

  function updateToAll() {
    const temp = queryClient.getQueryData(["mainData"]);
    queryClient.setQueryData(["fetchdata"], temp);
  }

  const { data, isPending } = useQuery({
    queryKey: ["fetchdata"],
    queryFn: updateToAll,
  });

  useEffect(() => {
    updateToAll();
  }, [isFetched]);

  if (isPending) return <div>... loading </div>;
  if (data.length == 0)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        {" "}
        no content available
      </div>
    );

  console.log("All cached data:", queryClient.getQueryCache().findAll());
  return (
    <>
      {data?.map(({ type, link, title, tags, _id }) => (
        <Card type={type} link={link} title={title} tags={tags} id={_id} />
      ))}
    </>
  );
}
