export const stringToDate = (dateString) => {
  let [day, month, year] = dateString.split("/");
  const dateObj = new Date(+year, +month - 1, +day);
  return dateObj;
};
