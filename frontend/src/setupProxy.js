const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/ws", // 프록시를 적용할 경로 (웹소켓)
    createProxyMiddleware({
      target: "http://localhost:8080", // 실제 백엔드 서버 주소
      ws: true // 웹소켓을 사용하겠다!
    })
  );
};