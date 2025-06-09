import { Close } from "../../icons/Close";

import { PostData } from "../../hooks/PostData";

export const CreateContent = ({ open, setOpen }) => {
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
