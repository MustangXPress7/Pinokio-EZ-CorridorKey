module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: "git pull",
        path: "app"
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: "uv pip install --torch-backend=auto --upgrade -e ."
      }
    }
  ]
}