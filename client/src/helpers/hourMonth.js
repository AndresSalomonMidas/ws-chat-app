import dayjs from "dayjs";
import "dayjs/locale/es";

export const hourMonth = (date) => {
  return dayjs(date).locale("es").format("HH:mm a | MMMM D YYYY");
};
