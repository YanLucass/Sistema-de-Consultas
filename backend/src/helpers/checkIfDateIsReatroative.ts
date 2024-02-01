export function checkIfDateIsRetroactive(date: string, hour: string): boolean {
   // Merge hour and date to get a formatted date
   const combinedDate = `${date}T${hour}:00.000Z`;
   const inputDate = new Date(combinedDate);

   // Get the current date, subtract 3 hours (due to timezone), and reset seconds and milliseconds for comparison
   const currentDate = new Date();
   currentDate.setHours(currentDate.getHours() - 3);
   currentDate.setSeconds(0);
   currentDate.setMilliseconds(0);

   return inputDate < currentDate;
}
