import { state, saveGame } from './game.js';

// UI logic and Eventlisteners

// DOM Elements
const pizza = document.getElementById('pizza');
const slicesEl = document.getElementById('slices');
const spsEl = document.getElementById('sps');
const upgradesEl = document.getElementById('upgrades');
const toastEl = document.getElementById('toast');
const toggleSoundBtn = document.getElementById('toggle-sound');
const showStatsBtn = document.getElementById('show-stats');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalSlices = document.getElementById('modalSlices');
const modalSps = document.getElementById('modalSps');
const closeModal = document.getElementById('closeModal');

function updateUI() {
    slicesEl.textContent = format(state.slices);
    spsEl.textContent = (state.sps || 0).toFixed(2);
}

function format(n) {
    if (n >= 1000) return n.toLocaleString();
    return String(Math.floor(n));
}

function showSnapshot() {
    modalSlices.textContent = 'Slices: ' + format(state.slices);
    modalSps.textContent = 'Slices / sec: ' + (Number(state.sps) || 0.01).toFixed(2);
    modalBackdrop.style.display = 'flex';
}

function onUpgradesClick(e) {
    const btn = e.target.closest('.upgrade-btn');
    if (!btn) return;
    const id = btn.dataset.id;
    applyUpgradeById(id);
}

function attach() {
    pizza.addEventListener("click", () => {
        state.slices++;
        updateUI();
    
        const particle = document.createElement("div");
        particle.classList.add("slice-particle");
        particle.innerHTML = `<img src="./images/pizza-slice.png" alt="pizza slice"/>+1`;
    
        document.body.appendChild(particle);
    
        setTimeout(() => {
            particle.remove();
        }, 1000);
    });
    
    upgradesEl.addEventListener('click', onUpgradesClick);

    showStatsBtn.addEventListener('click', showSnapshot);
    closeModal.addEventListener('click', () => modalBackdrop.style.display = 'none');

    toggleSoundBtn.addEventListener('click', () => {
        state.options.sound = !state.options.sound;
        toggleSoundBtn.textContent = state.options.sound ? '🔊 Sound: On' : '🔇 Sound: Off';
        saveGame();
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') modalBackdrop.style.display = 'none';
    });
}

