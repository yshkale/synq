export const isSameDay = (dateStr1: string, dateStr2: string) => {
  if (!dateStr1 || !dateStr2) return false;

  const date1 = new Date(dateStr1);
  const date2 = new Date(dateStr2);

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
