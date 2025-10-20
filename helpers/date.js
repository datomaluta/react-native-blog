export const getHumanReadableDateFromTimeStamp = (timestamp) => {
  return new Date(timestamp).toLocaleString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
