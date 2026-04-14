import dayjs, { Dayjs } from "dayjs";

export const formattedDate = (
  date: string | undefined | null | Dayjs | Date,
  format = "DD MMM YYYY",
  fallBack = "Nil"
) => {
  if (!date) return fallBack;
  const newDate = dayjs(date).format(format);
  return newDate;
};

export const formattedDateISO = (
  date: string | null | Dayjs | undefined | Date,
  fallBack = "Nil"
) => {
  if (!date) return fallBack;
  const newDate = dayjs(date).format("YYYY-MM-DD");
  return newDate;
};
