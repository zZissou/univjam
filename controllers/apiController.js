function index(req, res) {
  res.json({
    message: "Welcome to univJam",
    documentation_url: "",
    base_url: "",
    endpoints: [
      {
        method: 'GET',
        path: "/api",
        description: "API"
      }
    ]
  });
}

module.exports.index = index;
