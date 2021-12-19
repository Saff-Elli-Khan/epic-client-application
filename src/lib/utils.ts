import Moment from "moment";

export const getGreetingTimeString = () => {
  var split_afternoon = 12;
  var split_evening = 17;
  var currentHour = parseFloat(Moment().format("HH"));

  if (currentHour >= split_afternoon && currentHour <= split_evening) {
    return "Afternoon";
  } else if (currentHour >= split_evening) {
    return "Evening";
  } else {
    return "Morning";
  }
};
