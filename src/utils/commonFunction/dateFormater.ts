import { format } from "date-fns";

export const formatDate = (dateString: string): string => {
  const inputDate = new Date(dateString);
  const now = new Date();

  // Calculate the difference in days
  const differenceInTime = now.setHours(0, 0, 0, 0) - inputDate.setHours(0, 0, 0, 0);
  const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);

  if (differenceInDays === 0) {
    // Today
    return `Today ${format(inputDate, "h:mm a")}`;
  } else if (differenceInDays === 1) {
    // Yesterday
    return "Yesterday";
  } else {
    // More than yesterday, show the date
    return format(inputDate, "MMMM d, yyyy");
  }
};

