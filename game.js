// GAME LOGIC

// Export to app.js
export { state, saveGame, applyUpgradeById, startLoop, fetchUpgrades, init };


const SAVE_KEY = 'ultimatePizza_v2';
const API = 'https://cookie-upgrade-api.vercel.app/api/upgrades';

const state = {
    slices: 0,
    sps: 0.01,
    upgrades: {},
    ownedUpgrades: {},
    options: { sound: true }
};

// Fallback upgrades in case the API fails

const fallback = [
    { id: 'oven', name: 'Hot Oven', cost: 50, sps: 1, icon: '♨️' },
    { id: 'chef', name: 'Skilled Pizza Chef', cost: 200, sps: 5, icon: 'https://cdn-icons-png.flaticon.com/512/1995/1995574.png' },
    { id: 'parlor', name: 'Pizza Parlor', cost: 1000, sps: 20, icon: 'https://cdn-icons-png.flaticon.com/512/3132/3132693.png' }
];

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

// Fetch Upgrades from API

async function fetchUpgrades() {
    try {
        const response = await fetch(API);
        if (!response.ok) throw new Error('Bad status ' + response.status);

        const data = await response.json();
        const pizzaData = JSON.stringify(data).replaceAll("Cookie", "Pizza Slice");
        const pizzaUpgrades = JSON.parse(pizzaData);

        pizzaUpgrades.forEach(u => {
            state.upgrades[u.id] = {
                id: u.id,
                name: u.name,
                cost: u.cost,
                sps: u.cps || 0,
                icon: u.icon || '🍕'
            };
        });

        if (Object.keys(state.upgrades).length === 0) throw new Error('Empty API');
        showToast('✅ Upgrades loaded');
    } catch (e) {
        console.warn('Upgrade fetch failed, using fallback', e);
        fallback.forEach(u => state.upgrades[u.id] = u);
        showToast('⚠️ Using sample upgrades');
    } finally {
        reapplyOwnedUpgrades();
        recalcSps();
    }
}

// Apply Upgrades Logic
function applyUpgradeById(id) {
    const up = state.upgrades[id];
    if (!up) return showToast('Upgrade not found');
    if (state.ownedUpgrades[id]) return showToast('Already owned');
    if (!canAfford(up.cost)) return showToast('Not enough slices');
    try {
        state.slices -= Number(up.cost);
        state.ownedUpgrades[id] = true;
        state.sps += Number(up.sps) || 0;
        saveGame();
        showToast('Purchased: ' + up.name);
    } catch (e) {
        console.error('Apply upgrade error', e);
        showToast('Purchase failed');
    }
}

function canAfford(cost) {
    return Number(state.slices) >= Number(cost);
}

function reapplyOwnedUpgrades() {
    state.sps = 0;
    Object.keys(state.ownedUpgrades || {}).forEach(id => {
        const up = state.upgrades[id];
        if (up) state.sps += Number(up.sps) || 0;
    });
}

function recalcSps() {
    state.sps = Number(state.sps) || 0;
}

function startLoop() {
    setInterval(() => {
        try {
            state.slices += Number(state.sps) || 0;
            saveGame();
        } catch (e) {
            console.error('Tick error', e);
        }
    }, 1000);
}




