# EZ-CorridorKey Pinokio Launcher

One-click launcher for EZ-CorridorKey, an AI-powered green screen keyer and alpha generator.

## Features
- AI-driven background removal
- Support for multiple models (CorridorKey, GVM, VideoMaMa)
- SAM2 tracking support
- Cross-platform support (Windows, Mac, Linux)

## Installation
1. Install [Pinokio](https://pinokio.computer/)
2. Search for `EZ-CorridorKey` in the Pinokio Browser or enter the repository URL.
3. Click "Install" and follow the prompts.

## Usage
- Click "Launch" to start the application.
- Use the "Update" button to pull the latest changes from the repository.
- Use "Reset" to clear dependencies and checkpoints if you encounter issues.

## API Documentation
The underlying app is a Python-based GUI application. Programmatic access is available via the `backend` and `modules` directories in the `app` folder.

### Javascript
```javascript
// Coming soon
```

### Python
```python
from CorridorKeyModule.backend import CorridorKeyBackend
# See app/main.py for implementation details
```

### Curl
The application is a local desktop app and does not expose a web API by default.
