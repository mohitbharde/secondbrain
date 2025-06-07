import { useState } from "react";
import { Close } from "../../icons/Close";
import { Button } from "./Button";
//import axios from "axios";
//import { Backend_url } from "../../../config";
//import { useContent } from "../../hooks/useContext";
import { PostData } from "../../hooks/PostData";

export const CreateContent = ({ open, setOpen }) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [tag, setTags] = useState("");
  const [type, setType] = useState("document");
  //const { refresh } = useContent();

  async function onSubmit() {
    const tags = tag.split(" ");
    for (let i = 0; i < tags.length; i++) {
      tags[i] = tags[i].trim();
    }

    PostData();

    setTags("");
    setLink("");
    setTags("");
    setType("");
    setOpen((prev) => !prev);

    // try {
    //   const response = await axios.post(
    //     `${Backend_url}/content`,
    //     {
    //       title,
    //       link,
    //       type,
    //       tags,
    //     },
    //     {
    //       headers: {
    //         Authorization: localStorage.getItem("token"),
    //       },
    //     }
    //   );
    //   if (response.status === 200) {
    //     setTags("");
    //     setLink("");
    //     setTags("");
    //     setType("");
    //     setOpen((prev) => !prev);
    //     //alert(response.data.message);
    //     //refresh();
    //   } else {
    //     alert(response.data.message);
    //   }
    // } catch (err) {
    //   console.log("error occur while create content  " + err);
    // }
  }

  return (
    <div>
      {open && (
        <div className="w-screen h-screen opacity-95 left-0 top-0 bg-black absolute z-10 flex flex-col overflow-h justify-center items-center">
          <div className="bg-white p-4 rounded-2xl z-20 opacity-100 md:w-[50%] md:h-[55%] h-[75%] w-[60%] box-border">
            <div className="w-full flex justify-end">
              <button onClick={() => setOpen((prev: boolean) => !prev)}>
                <Close />
              </button>
            </div>

            <PostData />
          </div>
        </div>
      )}
    </div>
  );
};
