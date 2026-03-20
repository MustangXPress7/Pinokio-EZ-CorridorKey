const path = require('path');

module.exports = async kernel => {
    const menu = [];
    const appDir = path.resolve(__dirname, 'app');
    const venvPath = path.resolve(appDir, '.venv');

    // Verificar si la app está instalada (existe el entorno virtual)
    const installed = await kernel.exists(venvPath);

    if (!installed) {
        menu.push({
            icon: 'fa-solid fa-download',
            text: 'Install',
            href: 'install.js',
            params: { run: true, fullscreen: true }
        });
        return menu;
    }

    // Verificar si la app ya está corriendo
    const running = await kernel.running(__dirname, 'run.js');

    if (running) {
        menu.push({
            icon: 'fa-solid fa-desktop',
            text: 'Open GUI',
            href: 'run.js',
            params: { run: true, fullscreen: true }
        });
    } else {
        menu.push(
            {
                icon: 'fa-solid fa-play',
                text: 'Launch',
                href: 'run.js',
                params: { run: true, fullscreen: true }
            },
            {
                icon: 'fa-solid fa-rotate',
                text: 'Update',
                href: 'update.js',
                params: { run: true, fullscreen: true }
            },
            {
                icon: 'fa-solid fa-trash-can',
                text: 'Reset',
                href: 'reset.js',
                params: { run: true, fullscreen: true }
            }
        );
    }

    return menu;
};
