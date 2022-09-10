const utils = {
  server_url:
    process.env.NODE_ENV === "production"
      ? "https://stoline-api-testing.herokuapp.com"
      : "http://localhost:5000",
  client_url:
    process.env.NODE_ENV === "production"
      ? "https://stoline-client.vercel.app"
      : "http://localhost:3000",
};

export default utils;
