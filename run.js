module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "python main.py"
        ],
        on: [{
          event: /^(.*)/,
          done: true
        }]
      }
    }
  ]
}
