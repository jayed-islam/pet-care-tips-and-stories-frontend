"use client";

import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

type Props = {
  name: string;
  file?: File | string;
  onDelete?: VoidFunction;
  onDrop?: <T extends File>(acceptedFiles: T[], event: DropEvent) => void;
  helperText?: string;
  label: string;
};

type DropEvent =
  | React.DragEvent<HTMLElement>
  | React.ChangeEvent<HTMLInputElement>
  | DragEvent
  | Event;

const QNXUploadFile: React.FC<Props> = ({
  name,
  helperText,
  label,
  onDrop,
  ...others
}: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [preview, setPreview] = useState(null);

  return (
    // <Controller
    //   name={name}
    //   control={control}
    //   render={({ field, fieldState: { error } }) => (
    //     <div className="">
    //       <div className="mb-3">
    //         <label
    //           htmlFor={name}
    //           className="mb-2 inline-block text-neutral-700 "
    //         >
    //           {label}
    //         </label>
    //         <input
    //           onDrop={onDrop}
    //           className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none "
    //           type="file"
    //           id={name}
    //           {...field}
    //         />

    //         {error && (
    //           <p className="mt-2 text-sm text-red-500">{error.message}</p>
    //         )}
    //         {!error && helperText && (
    //           <p className="mt-2 text-sm text-gray-500">{helperText}</p>
    //         )}
    //       </div>
    //     </div>
    //   )}
    // />
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <input
            type="file"
            accept="image/*"
            {...field}
            // onChange={(e) => {
            //   const file = e.target.files[0];
            //   if (file) {
            //     const reader = new FileReader();
            //     reader.onload = () => {
            //       setPreview(reader.result);
            //       onChange(file);
            //     };
            //     reader.readAsDataURL(file);
            //   }
            // }}
            className="hidden"
            id={name}
          />
          <label htmlFor={name}>
            <div className="avatar-preview border-2 border-gray-300 rounded-full h-11  flex items-center justify-center cursor-pointer px-5 gap-3">
              {/* <Icon icon="bi:image" className="text-xl" /> */}
              {/* {preview ? (
                <img
                  src={preview}
                  alt="Avatar Preview"
                  className="rounded-full w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500">Upload Image</span>
              )} */}
              <span className="text-gray-500">Upload Image</span>
            </div>
          </label>
          {error && (
            <p className="mt-2 text-sm text-red-500">{error.message}</p>
          )}
          {!error && helperText && (
            <p className="mt-2 text-sm text-gray-500">{helperText}</p>
          )}
        </>
      )}
    />
  );
};

export default QNXUploadFile;
