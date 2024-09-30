// import React from "react";
// import { useFormContext, Controller, FieldValues } from "react-hook-form";

// type SekectOption = {
//   label: string;
//   value: string;
// };

// type CustomSelectFieldProps = {
//   name: string;
//   options: SekectOption[];
//   label?: string;
//   helperText?: string;
//   sx?: string;
// };

// const QNXSelectField: React.FC<CustomSelectFieldProps> = ({
//   name,
//   options,
//   label,
//   helperText,
//   sx,
// }) => {
//   const { control, setValue, getValues } = useFormContext();
//   const [value, setValue3] = React.useState("react");

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => {
//         const currValue = getValues();

//         return (
//           <div className={`${sx || ""}`}>
//             <Select
//               label={label}
//               value={field.value}
//               size="lg"
//               animate={{
//                 mount: { y: 0 },
//                 unmount: { y: 25 },
//               }}
//               onChange={(value) => {
//                 setValue(name, value, {
//                   shouldValidate: true,
//                 });
//               }}
//               selected={(element) =>
//                 element &&
//                 React.cloneElement(element, {
//                   disabled: true,
//                   className:
//                     "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
//                 })
//               }
//             >
//               {options.map((option) => (
//                 <Option key={option.label} value={option.value}>
//                   {option.label}
//                 </Option>
//               ))}
//             </Select>

//             {error && (
//               <p className="mt-2 text-sm text-red-500">{error.message}</p>
//             )}
//             {!error && helperText && (
//               <p className="mt-2 text-sm text-gray-500">{helperText}</p>
//             )}
//           </div>
//         );
//       }}
//     />
//   );
// };

// export default QNXSelectField;
