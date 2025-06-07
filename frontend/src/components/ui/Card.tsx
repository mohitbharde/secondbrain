import { Twitter } from "../../icons/Twitter";
import { Youtube } from "../../icons/Youtube";
import { Document } from "../../icons/Document";
import { Delete } from "../../icons/Delete";
import { ShareIcon } from "../../icons/ShareIcon";
import axios from "axios";
import { Backend_url } from "../../../config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CardProps {
  type: "twitter" | "youtube" | "document";
  title: string;
  link: string;
  tags?: [string];
  id?: object;
}

const contentType = {
  twitter: `<iframe
        id="twitter-widget-0"
        title="X Post"
        height=300px
        src=" link "
        class = ""
      ></iframe>`,
  youtube: `<iframe   src=" link "  height=300px title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  document: `<iframe src=" link " height=300px   ></iframe>`,
};

const contentIcon = {
  twitter: <Twitter size={"md"} />,
  youtube: <Youtube size={"md"} />,
  document: <Document size="md" />,
};

export const Card = (props: CardProps) => {
  const queryClient = useQueryClient();

  async function deleteItem(id) {
    const response = await axios.delete(`${Backend_url}/deleteContent`, {
      data: { id: id },
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  }

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteItem(id),
    onSuccess: (data, id) => {
      console.log("mutation : " + JSON.stringify(data) + " " + id);
      queryClient.setQueryData(["fetchdata"], (curElem) => {
        const filterdata = curElem?.filter((post) => post._id !== id);
        return filterdata;
      });
    },
  });

  return (
    <div
      id={`${props.id}`}
      className=" min-h-96 bg-white max-w-[310px] rounded-lg shadow-2xl p-2 flex flex-col justify-around items-start"
    >
      <div className="flex items-center justify-between w-full">
        <span className="flex items-center gap-1">
          <span>{contentIcon[props.type]}</span>
          {props.title}
        </span>

        <span className="flex items-center gap-1 text-gray-500">
          <a href={props.link} target="_blank">
            <ShareIcon size="md" />
          </a>
          <button onClick={() => deleteMutation.mutateAsync(props.id)}>
            <Delete />
          </button>
        </span>
      </div>
      <div
        className=" overflow-hidden h-72 rounded-md"
        dangerouslySetInnerHTML={{
          __html: contentType[props.type]
            .replace("link", props.link)
            .replace(
              /https:\/\/twitter\.com\/[^/]+\/status\//,
              "https://platform.twitter.com/embed/Tweet.html?id="
            )
            .replace("watch?v=", "embed/")
            .replace(
              /https:\/\/youtu\.be\/([^?]+)\?si=([a-zA-Z0-9_-]+)/,
              "https://www.youtube.com/embed/$1?si=$2"
            )
            .replace("www.notion.so/", "reliable-skunk-5ee.notion.site/ebd")
            .replace(
              "petal-estimate-4e9.notion.site",
              "petal-estimate-4e9.notion.site/ebd"
            ),
        }}
      ></div>
      <div className="flex gap-1 flex-wrap">
        {props.tags?.map((tag, id) => (
          <button className="text-blue-500 hover:underline" id={`${id}`}>
            #{tag["title"]}
          </button>
        ))}
      </div>
    </div>
  );
};
