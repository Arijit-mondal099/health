/**
 * @function dateConverter
 */

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const dateConverter = (d) => {
  const date = d.split("-");
  return `${date[0]} ${months[date[1]]} ${date[2]}`;
};

export default dateConverter;
