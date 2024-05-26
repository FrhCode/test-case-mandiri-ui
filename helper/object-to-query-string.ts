function objectToQueryString(obj: { [key: string]: any }) {
  return Object.keys(obj)
    .filter(
      (key) => obj[key] !== undefined && obj[key] !== null && obj[key] !== "",
    )
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");
}

export default objectToQueryString;
