const path = require('path');
const fs = require('fs');

module.exports = async kernel => {
    const { platform } = kernel;
    const repoUrl = 'https://github.com/edenaion/EZ-CorridorKey.git';
    const targetDir = path.resolve(__dirname, 'app');
    const steps = [];

    // 1. Clonar el repositorio si no existe
    if (!fs.existsSync(targetDir)) {
        steps.push({
            method: 'shell.run',
            params: {
                message: `git clone ${repoUrl} app`,
                path: __dirname,
                on: [{ event: /error/i, break: false }]
            }
        });
    }

    // 2. Variables de entorno para evitar prompts interactivos
    const envVars = {
        CORRIDORKEY_INSTALL_SAM2: 'y',
        CORRIDORKEY_PREDOWNLOAD_SAM2: 'y',
        CORRIDORKEY_INSTALL_GVM: 'n',
        CORRIDORKEY_INSTALL_VIDEOMAMA: 'n',
        CORRIDORKEY_CREATE_SHORTCUT: 'n'
    };

    // 3. Construir comando según plataforma
    let installCmd;
    if (platform === 'win32') {
        const setEnv = Object.entries(envVars)
            .map(([k, v]) => `set "${k}=${v}"`)
            .join(' & ');
        installCmd = `cmd /c "${setEnv} & echo. | 1-install.bat"`;
    } else {
        const exportEnv = Object.entries(envVars)
            .map(([k, v]) => `export ${k}=${v}`)
            .join('; ');
        installCmd = `sh -c "${exportEnv}; ./1-install.sh"`;
    }

    steps.push({
        method: 'shell.run',
        params: {
            message: installCmd,
            path: targetDir,
            on: [{ event: /error/i, break: false }]
        }
    });

    // 4. Mensaje de finalización
    steps.push({
        method: 'input',
        params: {
            title: 'Instalación completada',
            description: 'EZ-CorridorKey se ha instalado. Regresa al dashboard para iniciarlo.'
        }
    });

    steps.push({
        method: 'browser.open',
        params: { uri: '/?selected=corridorkey' }
    });

    return { run: steps };
};
