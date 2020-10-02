export const formatDateBasedOnPrecision = (date, precision) => {
  // This method modifies the visible data based on the date precision of the launch
  let commonOptions = {
    year: "numeric",
    hour12: false,
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  };
  const returnFunction = (options) => {
    return date.toLocaleString(
      "default",
      options
    );
  }

  switch (precision) {
    case "hour":
      return returnFunction({
        ...commonOptions,
        weekday: "short"
      });

    case "day":
      return returnFunction({
        ...commonOptions,
        hour: undefined,
        minute: undefined,
        timeZone: "UTC"
      });

    case "month":
      return returnFunction({
        ...commonOptions,
        hour: undefined,
        minute: undefined,
        day: undefined,
        timeZone: "UTC",
      }).replace(", UTC", "");

    case "year":
      return returnFunction({
        year: "numeric",
        timeZone: "UTC",
      });

    case "quarter":
      let quarter = Math.floor((date.getUTCMonth() + 1) / 3);
      let year = date.getUTCFullYear();
      return `Quarter ${quarter} ${year}`;

    case "half":
      return ((date.getUTCMonth() + 1) / 6 > 1 ? "1st Half " : "2nd Half ") + date.getUTCFullYear();

    default:
      return date.toString();
  }
}