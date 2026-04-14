import { type DefaultValues, type UseFormReset } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import type { FieldValues, Path } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Autocomplete,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import dayjs from "dayjs";

import { capitalize } from "../../utils/string";
import type { WithId } from "../../types/common";
import { formattedDateISO } from "../../utils/date";

type FieldType =
  | "text"
  | "password"
  | "number"
  | "textarea"
  | "autocomplete"
  | "multiselect"
  | "checkbox-group"
  | "date";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IFormOption = { _id: string; [key: string]: any } | string;

export interface FieldConfig<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: IFormOption[];
  labelAccessor?: string;
  nullable?: boolean;
}

interface FormBuilderProps<T extends FieldValues> {
  schema: ZodType<T>;
  fields: FieldConfig<T>[];
  defaultValues?: DefaultValues<T>;
  onSubmit: (values: T, a: { reset: UseFormReset<T> }) => void;
  loading?: boolean;
  submitLabel?: string;
}

export default function FormBuilder<T extends FieldValues>({
  schema,
  fields,
  defaultValues,
  onSubmit,
  loading = false,
  submitLabel = "Submit",
}: FormBuilderProps<T>) {
  const form = useForm<T>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    defaultValues: defaultValues,
    mode: "onBlur",
  });

  const submitHandler = (values: T) => {
    onSubmit(values, {
      reset: form.reset,
    });
  };

  return (
    <Box
      component="form"
      onSubmit={form.handleSubmit(submitHandler)}
      noValidate
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
    >
      {fields.map((formField) => {
        const { labelAccessor } = formField;
        const error = form.formState.errors[formField.name]?.message as
          | string
          | undefined;

        return (
          <Controller
            name={formField.name}
            control={form.control}
            render={({ field }) => {
              switch (formField.type) {
                case "date":
                  return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label={formField.label}
                        format="DD/MM/YYYY"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(newValue) => {
                          const date = formattedDateISO(newValue, "Nil");
                          if (["Invalid Date", "Nil"].includes(date)) {
                            field.onChange(null);
                            return;
                          }
                          field.onChange(date);
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!error,
                            helperText: error,
                          },
                        }}
                      />
                    </LocalizationProvider>
                  );

                case "autocomplete":
                  return (
                    <Autocomplete
                      key={field.name}
                      options={formField.options || []}
                      getOptionLabel={(opt: IFormOption | string) =>
                        typeof opt === "string"
                          ? capitalize(opt)
                          : (opt[labelAccessor || "name"] as string)
                      }
                      value={
                        (field.value as IFormOption | string | null) ?? null
                      }
                      onChange={(_, value) => {
                        if (!formField.nullable && value === null) return;
                        form.setValue(
                          formField.name,
                          value as T[typeof formField.name],
                          {
                            shouldValidate: true,
                          },
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={formField.label}
                          error={!!error}
                          helperText={error}
                          fullWidth
                        />
                      )}
                    />
                  );

                case "multiselect":
                  return (
                    <Autocomplete
                      multiple
                      key={field.name}
                      options={formField.options || []}
                      getOptionDisabled={(opt: IFormOption | string) => {
                        if (typeof opt === "string") {
                          const isDisabled = field.value?.includes(opt);
                          return isDisabled;
                        } else {
                          const isDisabled = field.value?.some(
                            (item: WithId) => item._id === opt._id,
                          );
                          return isDisabled;
                        }
                      }}
                      getOptionLabel={(opt: IFormOption | string) =>
                        typeof opt === "string"
                          ? capitalize(opt)
                          : (opt[labelAccessor || "name"] as string)
                      }
                      value={(field.value as (IFormOption | string)[]) ?? []}
                      onChange={(_, value) => {
                        form.setValue(
                          formField.name,
                          value as T[typeof formField.name],
                          { shouldValidate: true },
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={formField.label}
                          error={!!error}
                          helperText={error}
                          fullWidth
                        />
                      )}
                    />
                  );
                case "checkbox-group":
                  return (
                    <Box key={field.name}>
                      <label style={{ fontWeight: 600 }}>
                        {formField.label}
                      </label>
                      <FormGroup sx={{ mt: 1 }}>
                        {(formField.options || []).map((opt) => {
                          const value = typeof opt === "string" ? opt : opt._id;
                          const label =
                            typeof opt === "string"
                              ? opt
                              : (opt[labelAccessor || "name"] as string);
                          const checked = (
                            field.value as string[] | undefined
                          )?.includes(value);

                          return (
                            <FormControlLabel
                              key={value}
                              control={
                                <Checkbox
                                  checked={checked}
                                  onChange={(e) => {
                                    const current =
                                      (field.value as string[]) || [];
                                    if (e.target.checked) {
                                      form.setValue(
                                        formField.name,
                                        [
                                          ...current,
                                          value,
                                        ] as T[typeof formField.name],
                                        { shouldValidate: true },
                                      );
                                    } else {
                                      form.setValue(
                                        formField.name,
                                        current.filter(
                                          (v) => v !== value,
                                        ) as T[typeof formField.name],
                                        { shouldValidate: true },
                                      );
                                    }
                                  }}
                                />
                              }
                              label={capitalize(label)}
                            />
                          );
                        })}
                      </FormGroup>
                      {error && (
                        <p
                          style={{
                            color: "red",
                            fontSize: "0.8rem",
                            marginTop: 4,
                          }}
                        >
                          {error}
                        </p>
                      )}
                    </Box>
                  );

                case "textarea":
                  return (
                    <TextField
                      key={field.name}
                      label={formField.label}
                      multiline
                      minRows={3}
                      placeholder={formField.placeholder}
                      error={!!error}
                      helperText={error}
                      fullWidth
                      {...form.register(field.name)}
                    />
                  );

                default:
                  return (
                    <TextField
                      key={field.name}
                      label={formField.label}
                      type={formField.type}
                      placeholder={formField.placeholder}
                      error={!!error}
                      helperText={error}
                      fullWidth
                      {...form.register(field.name)}
                    />
                  );
              }
            }}
          />
        );
      })}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        fullWidth
        sx={{ mt: 2, py: 1.2 }}
      >
        {loading ? <CircularProgress size={20} /> : submitLabel}
      </Button>
    </Box>
  );
}
