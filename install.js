module.exports = {
  run: [
    // Step 1: Install UV if not available
    {
      method: "shell.run",
      params: {
        message: "if command -v uv &>/dev/null; then echo \\"[OK] uv already installed\\"; else curl -LsSf https://astral.sh/uv/install.sh | sh; fi",
        path: "app"
      }
    },
    // Step 2: Install Python dependencies using uv (or pip as fallback within uv)
    {
      method: "shell.run",
      params: {
        venv: "env", // Use 'env' for Pinokio's managed venv
        path: "app",
        message: [
          "uv pip install --torch-backend=auto -e ."
        ],
      }
    },
    // Step 3: Optional MLX acceleration for Apple Silicon
    {
      when: "{{platform === 'darwin' && arch === 'arm64'}}",
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install -e .[mlx]",
          "python scripts/setup_models.py --corridorkey-mlx"
        ],
        on: [{ "event": /^(.*)/, "done": true }] // Capture all output and continue
      }
    },
    // Step 4: Optional SAM2 tracker support and model download
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install -e .[tracker]",
          "python scripts/setup_models.py --sam2"
        ],
        on: [{ "event": /^(.*)/, "done": true }] // Capture all output and continue
      }
    },
    // Step 5: Download CorridorKey model weights
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "python scripts/setup_models.py --corridorkey"
        ]
      }
    },
    // Step 6: Check for FFmpeg
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: "python scripts/check_ffmpeg.py",
        on: [{
          event: /\[WARN\] Video import\/export requires FFmpeg 7\.0\+ and FFprobe\./,
          done: true,
          notify: "FFmpeg not found. Please install it manually for full functionality. Refer to the project's README for instructions."
        }]
      }
    }
  ]
}