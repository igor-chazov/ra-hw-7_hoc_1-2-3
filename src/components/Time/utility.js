function formatTimeAgo(diffName, value) {
  const v = Math.floor(value);
  const n = v % 10;

  let option = 3;

  if (v === 11 || v === 12 || v === 13 || v === 14) option = 3;
  else if (n === 1) option = 1;
  else if ((n > 1) && (n < 5)) option = 2;

  const options = {
    minutes: {
      1: 'минута',
      2: 'минуты',
      3: 'минут',
    },
    hours: {
      1: 'час',
      2: 'часа',
      3: 'часов',
    },
    days: {
      1: 'день',
      2: 'дня',
      3: 'дней',
    }
  }

  return `${v} ${options[diffName][option]} назад`;
}

export default function getTimeAgo(date) {
  const oldDate = +new Date(date);
  const currDate = Date.now();

  const diffMinutes = (currDate - oldDate) / 1000 / 60;
  if (diffMinutes < 60) return formatTimeAgo('minutes', diffMinutes);

  const diffHours = diffMinutes / 60;
  if (diffHours < 24) return formatTimeAgo('hours', diffHours);

  const diffDays = diffHours / 24;
  return formatTimeAgo('days', diffDays);
}
