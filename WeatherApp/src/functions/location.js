export function getLocationFromLS() {
  return localStorage.getItem("location");
}
// export function setLocationInLS(lat, lon) {
//     const location = JSON.stringify({ lat, lon });
//     //stringify makes it into a string
//     localStorage.setItem("location", location);
//  }
export function setLocationInLS(location) {
  localStorage.setItem("location", location);
}


  export function getSelectedDayFromLS() {
    return localStorage.getItem("selectedDay");
  }

  export function setSelectedDayInLS(selectedDay) {
    localStorage.setItem("selectedDay", selectedDay);
  }