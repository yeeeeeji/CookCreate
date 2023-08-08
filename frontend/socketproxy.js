// const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = (app) => {
//     app.use(
//         "/ws",
//         createProxyMiddleware({ target: "http://localhost:8080", ws: true })
//     );
// };


const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
  // app.use(
  //   "/ws-stomp",
  //   createProxyMiddleware({ target: "http://localhost:8080", ws: true })
  // );
};