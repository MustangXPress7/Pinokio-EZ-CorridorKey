const path = require('path');

module.exports = async kernel => {
    const appDir = path.resolve(__dirname, 'app');

    return {
        run: [
            {
                method: 'fs.rm',
                params: {
                    path: appDir,
                    recursive: true,
                    force: true
                }
            },
            {
                method: 'input',
                params: {
                    title: 'Reset completado',
                    description: 'Se ha eliminado la instalación de EZ-CorridorKey. Puedes volver a instalar desde el dashboard.'
                }
            },
            {
                method: 'browser.open',
                params: { uri: '/?selected=corridorkey' }
            }
        ]
    };
};
