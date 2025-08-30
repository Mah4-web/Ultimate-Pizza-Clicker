// GAME LOGIC
export { state, saveGame };

const SAVE_KEY = 'ultimatePizza_v2';
const API = 'https://cookie-upgrade-api.vercel.app/api/upgrades';

// Initial Game State
const state = {
    slices: 0,
    sps: 0.01,
    upgrades: {},
    ownedUpgrades: {},
    options: { sound: true }
};

// Save and Load Game Functions
function saveGame() {
    try {
        const payload = {
            slices: state.slices,
            sps: state.sps,
            ownedUpgrades: state.ownedUpgrades,
            options: state.options
        };
        localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
    } catch (e) {
        console.error('Save error', e);
    }
}

function loadGame() {
    try {
        const raw = localStorage.getItem(SAVE_KEY);
        if (!raw) return;
        const data = JSON.parse(raw);
        state.slices = Number(data.slices) || 0;
        state.sps = Number(data.sps) || 0.01;
        state.ownedUpgrades = data.ownedUpgrades || {};
        state.options = Object.assign(state.options, data.options || {});
    } catch (e) {
        console.error('Load error', e);
    }
}


