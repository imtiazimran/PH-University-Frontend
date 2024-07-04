export const nameOptions = [
    {
      value: "01",
      label: "Autumn",
    },
    {
      value: "02",
      label: "Summer",
    },
    {
      value: "03",
      label: "Fall",
    },
  ];
  
  const currentYear = new Date().getFullYear();
 export  const yearOptions = [0, 1, 2, 3, 4, 5, 6].map((i) => ({
    value: currentYear + i,
    label: currentYear + i,
  }));
   const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
 export const monthOptions = monthNames.map((month) => ({
    value: month,
    label: month,
  }));