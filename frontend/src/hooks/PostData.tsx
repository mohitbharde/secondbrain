import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Backend_url } from "../../config";
import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Close } from "../icons/Close";
import { useNavigate } from "react-router-dom";

async function postdata({ title, link, type, tags }) {
  try {
    const data = await axios.post(
      `${Backend_url}/content`,
      {
        title,
        link,
        type,
        tags,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    //alert("content created successfully");

    return data;
  } catch (err) {
    //alert(err);
    console.log(err);
  }
}

export function PostData() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [tag, setTag] = useState("");
  const [type, setType] = useState("document");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tags, setTags] = useState<string[]>([]);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  type NewContent = {
    title: string;
    link: string;
    type: string;
    tags: string[];
  };

  async function onSubmit(event) {
    event.preventDefault();

    const tagsArray = tag.split(" ");
    for (let i = 0; i < tagsArray.length; i++) {
      tagsArray[i] = tagsArray[i].trim();
    }

    //alert(tagsArray);
    setTags(tagsArray);

    mutation.mutate({
      title,
      link,
      type,
      tags: tagsArray,
    });
  }

  const mutation = useMutation<unknown, Error, NewContent>({
    mutationFn: (newContent) => postdata(newContent),
    onSuccess: (data) => {
      //console.log("Mutation success", data);
      queryClient.invalidateQueries({ queryKey: ["mainData"] });
      queryClient.refetchQueries({ queryKey: ["mainData"] });
    },
    onSettled: () => {
      setTags([]);
      setLink("");
      setTag("");
      setType("document");
      setTitle("");
      navigate("/dashboard");
    },
  });

  return (
    <div>
      {
        <div className="w-screen h-screen opacity-95 left-0 top-0 bg-black absolute z-10 flex flex-col overflow-h justify-center items-center">
          <div className="bg-white p-4 rounded-2xl z-20 opacity-100 md:w-[50%] md:h-[55%] h-[75%] w-[60%] box-border">
            <div className="w-full flex justify-end">
              <button onClick={() => navigate("/dashboard")}>
                <Close />
              </button>
            </div>
            <form
              onSubmit={onSubmit}
              className="flex flex-col gap-2 h-[90%] justify-between"
            >
              <div className="flex flex-col">
                <label htmlFor="title" className="px-2 font-semibold">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="title"
                  id="title"
                  name="title"
                  required
                  value={title}
                  className="border rounded-md px-3 py-2"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="link" className="px-2 font-semibold">
                  Link
                </label>
                <input
                  type="text"
                  placeholder="link"
                  required
                  id="link"
                  name="link"
                  value={link}
                  className="border rounded-md px-3 py-2"
                  onChange={(e) => {
                    setLink(e.target.value);
                  }}
                />
              </div>

              <select
                name="type"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="document">Document</option>
                <option value="twitter">Twitter</option>
                <option value="youtube">Youtube</option>
              </select>

              <div className="flex flex-col">
                <label htmlFor="tags" className="px-2 font-semibold">
                  Tags
                </label>
                <input
                  type="text"
                  placeholder="tags"
                  id="tags"
                  name="tags"
                  required
                  value={tag}
                  onChange={(e) => {
                    setTag(e.target.value);
                  }}
                  className="border rounded-md px-3 py-2"
                />
              </div>

              <Button variant="primary" size="md" text="create content" />
            </form>
          </div>
        </div>
      }
    </div>
  );
}
