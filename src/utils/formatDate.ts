import moment from "moment";

export function formatDate(
  dateString: string,
  format = "Do MMMM YYYY, h:mm A"
) {
  return moment(dateString).format(format);
}
