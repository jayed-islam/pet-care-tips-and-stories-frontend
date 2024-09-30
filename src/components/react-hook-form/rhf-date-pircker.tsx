// import React from "react";
// import { useFormContext, Controller } from "react-hook-form";
// import { TextField, TextFieldProps } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers";
// import dayjs, { Dayjs } from "dayjs";

// type Props = TextFieldProps & {
//   name: string;
//   readOnly?: boolean;
// };

// const RHFDatePicker: React.FC<Props> = ({
//   name,
//   label,
//   disabled,
//   ...others
// }) => {
//   const { control } = useFormContext();

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => (
//         <DatePicker
//           {...field}
//           label={label}
//           //   value={field.value ? dayjs(field.value) : null}
//           //   onChange={(date: Dayjs | null) => {
//           //     field.onChange(date ? date.toISOString() : null);
//           //   }}
//           onChange={(date: Dayjs | null) =>
//             field.onChange(date ? date.toDate() : null)
//           }
//           disabled={disabled}
//           sx={{
//             width: "100%",
//           }}
//         />
//       )}
//     />
//   );
// };

// export default RHFDatePicker;
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

type Props = TextFieldProps & {
  name: string;
  readOnly?: boolean;
};

const RHFDatePicker: React.FC<Props> = ({
  name,
  label,
  disabled,
  ...others
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...field}
          label={label}
          value={field.value ? dayjs(field.value) : null} // Ensure value is a Dayjs instance
          onChange={(date: Dayjs | null) => {
            field.onChange(date ? date.toDate() : null); // Convert to JavaScript Date
          }}
          disabled={disabled}
          // renderInput={(params) => (
          //   <TextField
          //     {...params}
          //     error={!!error}
          //     helperText={error ? error.message : null}
          //   />
          // )}
          sx={{
            width: "100%",
          }}
        />
      )}
    />
  );
};

export default RHFDatePicker;
