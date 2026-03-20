module.exports = {
  run: [
    {
      method: "fs.rm",
      params: {
        path: "app/.venv",
        force: true,
        recursive: true
      }
    },
    {
      method: "fs.rm",
      params: {
        path: "app/venv",
        force: true,
        recursive: true
      }
    },
    {
      method: "fs.rm",
      params: {
        path: "app/CorridorKeyModule/checkpoints",
        force: true,
        recursive: true
      }
    },
    {
      method: "fs.rm",
      params: {
        path: "app/gvm_core/checkpoints",
        force: true,
        recursive: true
      }
    },
    {
      method: "fs.rm",
      params: {
        path: "app/sam2_tracker/checkpoints",
        force: true,
        recursive: true
      }
    },
    {
      method: "fs.rm",
      params: {
        path: "app/VideoMaMaInferenceModule/checkpoints",
        force: true,
        recursive: true
      }
    }
  ]
}