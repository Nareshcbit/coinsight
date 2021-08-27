function formattedDate(timestamp) {
  var dt = new Date(timestamp);
  return dt.toLocaleDateString("en-US")
}