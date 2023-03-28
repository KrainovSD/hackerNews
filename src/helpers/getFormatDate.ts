export const getFormatDate = (date: number) => {
  if (!date || typeof date !== "number") return "дата не найдена";
  const formatted = findFullDate(date);

  return formatted;
};

function findFullDate(date: string | number) {
  const dateObj = new Date(date);
  const monthList = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  let day: string | number = dateObj.getDate();
  let hours: string | number = dateObj.getHours();
  let minutes: string | number = dateObj.getMinutes();
  let second: string | number = dateObj.getSeconds();
  let milisecond: string | number = dateObj.getMilliseconds();
  const month = dateObj.getMonth();
  const monthString = monthList[month];
  const year = dateObj.getFullYear();

  if (day < 10) day = `0${day}`;
  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  if (second < 10) second = `0${second}`;
  if (milisecond < 10) milisecond = `0${milisecond}`;

  return `${hours}:${minutes}:${second}.${milisecond} - ${day} ${monthString} ${year}`;
}
