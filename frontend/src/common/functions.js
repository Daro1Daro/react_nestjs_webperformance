export const formatDateString = (date) => {
  return date.replace('T', ' ').slice(0, 16);
};
