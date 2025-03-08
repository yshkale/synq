import { addDays, isSameDay, isWithinInterval } from "date-fns";

export const dueDateColorExtractor = (date: string) => {
  const currentDate = new Date();

  const today = isSameDay(date, currentDate);
  const withinOneWeek = isWithinInterval(date, {
    start: currentDate,
    end: addDays(currentDate, 7),
  });

  if (today) return "text-red-600";
  if (withinOneWeek) return "text-amber-600";
  else return "text-green-800";
};
