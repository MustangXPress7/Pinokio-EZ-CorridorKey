const path = require('path');

module.exports = async kernel => {
    const appDir = path.resolve(__dirname, 'app');
    const isWin = kernel.platform === 'win32';
    const venvPython = isWin
        ? path.join(appDir, '.venv', 'Scripts', 'python.exe')
        : path.join(appDir, '.venv', 'bin', 'python');

    // Directorio de PySide6 y Qt6 (donde están las DLLs)
    const pysideDir = path.join(appDir, '.venv', 'Lib', 'site-packages', 'PySide6');
    const qtBinDir = path.join(pysideDir, 'Qt6', 'bin');

    // Limpiar variables de Conda y agregar rutas de PySide6 al PATH
    const env = {
        PATH: `${qtBinDir};${pysideDir};${process.env.PATH}`,
        CONDA_PREFIX: '',
        CONDA_DEFAULT_ENV: '',
    };

    return {
        run: [
            {
                method: 'shell.run',
                params: {
                    message: `"${venvPython}" main.py`,
                    path: appDir,
                    env: env,
                    on: [{ event: /.*/, done: true }]
                }
            }
        ]
    };
};
