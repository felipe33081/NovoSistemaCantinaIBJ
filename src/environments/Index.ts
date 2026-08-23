export const Environment = {
    // App desktop offline: o SPA e servido pela propria API (mesma origem),
    // entao a base e relativa. Em dev (npm start), o "proxy" no package.json
    // encaminha /v1 para http://localhost:5228.
    BASE_URL: '/v1',
    //BASE_URL: 'http://localhost:8080/v1',
    //BASE_URL: 'https://cantinaibjapi-production.up.railway.app/v1',
    MAIN_COLOR: '#d04d27',
    //MAIN_COLOR: '#d62828',
    //MAIN_COLOR: '#0668E1',
    //MAIN_COLOR: '#004ca3',
    //MAIN_COLOR: '#0a8d0a',
    //MAIN_COLOR: '#d8be4a',

    DARK_COLOR_BUTTON_TEXT: '#fff',
    LIGHT_COLOR_BUTTON_TEXT: '#fff',

    SECONDARY_LIGHT_COLOR: '#E4E5F2',
    SECONDARY_DARK_COLOR: '#aaaaaaff',
    LOGO_URL: '/logos/cliente-a-logo.png'
}