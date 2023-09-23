const currentDate = new Date();
const currentMonth = currentDate.toLocaleString("default", { month: "long" });

export default currentMonth;
