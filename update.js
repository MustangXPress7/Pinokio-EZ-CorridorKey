const path = require('path');
const fs = require('fs');

module.exports = async kernel => {
    const appDir = path.resolve(__dirname, 'app');
    const { platform } = kernel;

    // Verificar que la aplicación está instalada
    if (!fs.existsSync(appDir)) {
        return {
            run: [
                {
                    method: 'input',
                    params: {
                        title: 'Error',
                        description: 'No se encontró la instalación. Ejecuta Install primero.'
                    }
                }
            ]
        };
    }

    // Variables para evitar prompts interactivos
    const envVars = {
        CORRIDORKEY_INSTALL_SAM2: 'y',
        CORRIDORKEY_PREDOWNLOAD_SAM2: 'y',
        CORRIDORKEY_INSTALL_GVM: 'n',
        CORRIDORKEY_INSTALL_VIDEOMAMA: 'n',
        CORRIDORKEY_CREATE_SHORTCUT: 'n'
    };

    let updateCmd;
    if (platform === 'win32') {
        const setEnv = Object.entries(envVars)
            .map(([k, v]) => `set "${k}=${v}"`)
            .join(' & ');
        // cd al appDir, luego ejecutar git pull y luego el instalador (con echo. para el pause)
        updateCmd = `cmd /c "cd /d "${appDir}" & ${setEnv} & git pull & echo. | 1-install.bat"`;
    } else {
        const exportEnv = Object.entries(envVars)
            .map(([k, v]) => `export ${k}=${v}`)
            .join('; ');
        updateCmd = `sh -c "cd "${appDir}" && ${exportEnv} && git pull && ./1-install.sh"`;
    }

    return {
        run: [
            {
                method: 'shell.run',
                params: {
                    message: updateCmd,
                    path: __dirname,  // ejecutar desde la raíz, pero los comandos internos cambian al appDir
                    on: [{ event: /error/i, break: false }]
                }
            },
            {
                method: 'input',
                params: {
                    title: 'Actualización completada',
                    description: 'EZ-CorridorKey se ha actualizado. Regresa al dashboard para iniciarlo.'
                }
            },
            {
                method: 'browser.open',
                params: { uri: '/?selected=corridorkey' }
            }
        ]
    };
};
