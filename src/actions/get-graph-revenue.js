export const getGraphRevenue = async (enrollmentList) => {
  // Get the sales
  // So if these are the enrollement objects

  // const enrollmentObjects = [
  //   {
  //     user_id: 3,
  //     course_id: 1,
  //     level_progress_percentage: 8.33333,
  //     last_done_module_order: 1,
  //     last_done_lesson_order: 6,
  //     last_done_lesson_id: 54,
  //     price: 200,
  //     createdAt: new Date("2023-09-12T11:44:18.000Z"), // Corrected format
  //   },
  //   {
  //     user_id: 3,
  //     course_id: 1,
  //     level_progress_percentage: 8.33333,
  //     last_done_module_order: 1,
  //     last_done_lesson_order: 6,
  //     last_done_lesson_id: 54,
  //     price: 900,
  //     createdAt: new Date("2023-09-12T11:44:18.000Z"), // Corrected format
  //   },
  //   {
  //     user_id: 3,
  //     course_id: 1,
  //     level_progress_percentage: 8.33333,
  //     last_done_module_order: 1,
  //     last_done_lesson_order: 6,
  //     last_done_lesson_id: 54,
  //     price: 400,
  //     createdAt: new Date("2023-05-12T11:44:18.000Z"), // Corrected format
  //   },
  //   {
  //     user_id: 3,
  //     course_id: 1,
  //     level_progress_percentage: 8.33333,
  //     last_done_module_order: 1,
  //     last_done_lesson_order: 6,
  //     last_done_lesson_id: 54,
  //     price: 400,
  //     createdAt: new Date("2022-05-12T11:44:18.000Z"), // Corrected format
  //   },
  // ];

  // We're going to take the objects and format them to be ready to be shown in the graph

  const monthlyRevenue = {};

  for (const enrollment of enrollmentList) {
    // Convert date string to Date object
    const createdAtDate = new Date(enrollment.createdAt);

    const month = createdAtDate.getMonth(); // 0 for Jan, 1 for Feb, ...

    let revenueForEnroll = 0;
    revenueForEnroll += enrollment.price;

    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForEnroll;
  }

  const graphData = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return graphData;
};
