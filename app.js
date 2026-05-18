// --- Sound effects initialization ---
const tickSFX = new Audio('assets/tick.wav');
const successSFX = new Audio('assets/success.wav');

// Adjust volume if necessary (de 0.0 a 1.0)
tickSFX.volume = 0.4; 
successSFX.volume = 0.4;

// Hero data
const heroes = [
    // --- DUELISTS ---
    { name: "Black Cat", role: "Duelist", img: "assets/blackcat.webp" },
    { name: "Black Panther", role: "Duelist", img: "assets/blackpanther.webp" },
    { name: "Black Widow", role: "Duelist", img: "assets/blackwidow.webp" },
    { name: "Blade", role: "Duelist", img: "assets/blade.webp" },
    { name: "Daredevil", role: "Duelist", img: "assets/daredevil.webp" },
    { name: "Deadpool", role: "Duelist", img: "assets/deadpool.webp" },
    { name: "Elsa Bloodstone", role: "Duelist", img: "assets/elsabloodstone.webp" },
    { name: "Hawkeye", role: "Duelist", img: "assets/hawkeye.webp" },
    { name: "Hela", role: "Duelist", img: "assets/hela.webp" },
    { name: "Human Torch", role: "Duelist", img: "assets/humantorch.webp" },
    { name: "Iron Fist", role: "Duelist", img: "assets/ironfist.webp" },
    { name: "Iron Man", role: "Duelist", img: "assets/ironman.webp" },
    { name: "Magik", role: "Duelist", img: "assets/magik.webp" },
    { name: "Mister Fantastic", role: "Duelist", img: "assets/misterfantastic.webp" },
    { name: "Moon Knight", role: "Duelist", img: "assets/moonknight.webp" },
    { name: "Namor", role: "Duelist", img: "assets/namor.webp" },
    { name: "Phoenix", role: "Duelist", img: "assets/phoenix.webp" },
    { name: "Psylocke", role: "Duelist", img: "assets/psylocke.webp" },
    { name: "Scarlet Witch", role: "Duelist", img: "assets/scarletwitch.webp" },
    { name: "Spider-Man", role: "Duelist", img: "assets/spiderman.webp" },
    { name: "Squirrel Girl", role: "Duelist", img: "assets/squirrelgirl.webp" },
    { name: "Star-Lord", role: "Duelist", img: "assets/starlord.webp" },
    { name: "Storm", role: "Duelist", img: "assets/storm.webp" },
    { name: "The Punisher", role: "Duelist", img: "assets/thepunisher.webp" },
    { name: "Winter Soldier", role: "Duelist", img: "assets/wintersoldier.webp" },
    { name: "Wolverine", role: "Duelist", img: "assets/wolverine.webp" },

    // --- VANGUARDS ---
    { name: "Angela", role: "Vanguard", img: "assets/angela.webp" },
    { name: "Captain America", role: "Vanguard", img: "assets/captainamerica.webp" },
    { name: "Deadpool", role: "Vanguard", img: "assets/deadpool.webp" },
    { name: "Devil Dinosaur", role: "Vanguard", img: "assets/devildinosaur.webp" },
    { name: "Doctor Strange", role: "Vanguard", img: "assets/doctorstrange.webp" },
    { name: "Emma Frost", role: "Vanguard", img: "assets/emmafrost.webp" },
    { name: "Groot", role: "Vanguard", img: "assets/groot.webp" },
    { name: "Hulk", role: "Vanguard", img: "assets/hulk.webp" },
    { name: "Magneto", role: "Vanguard", img: "assets/magneto.webp" },
    { name: "Peni Parker", role: "Vanguard", img: "assets/peniparker.webp" },
    { name: "Rogue", role: "Vanguard", img: "assets/rogue.webp" },
    { name: "The Thing", role: "Vanguard", img: "assets/thething.webp" },
    { name: "Thor", role: "Vanguard", img: "assets/thor.webp" },
    { name: "Venom", role: "Vanguard", img: "assets/venom.webp" },

    // --- STRATEGISTS ---
    { name: "Adam Warlock", role: "Strategist", img: "assets/adamwarlock.webp" },
    { name: "Cloak & Dagger", role: "Strategist", img: "assets/cloakanddagger.webp" },
    { name: "Deadpool", role: "Strategist", img: "assets/deadpool.webp" },
    { name: "Gambit", role: "Strategist", img: "assets/gambit.webp" },
    { name: "Invisible Woman", role: "Strategist", img: "assets/invisiblewoman.webp" },
    { name: "Jeff the Land Shark", role: "Strategist", img: "assets/jeffthelandshark.webp" },
    { name: "Loki", role: "Strategist", img: "assets/loki.webp" },
    { name: "Luna Snow", role: "Strategist", img: "assets/lunasnow.webp" },
    { name: "Mantis", role: "Strategist", img: "assets/mantis.webp" },
    { name: "Rocket Raccoon", role: "Strategist", img: "assets/rocketraccoon.webp" },
    { name: "Ultron", role: "Strategist", img: "assets/ultron.webp" },
    { name: "White Fox", role: "Strategist", img: "assets/whitefox.webp" }
];

// UI role colors
const roleColors = {
    "Duelist": "border-red-500 text-red-400 bg-red-950/20",
    "Vanguard": "border-blue-500 text-blue-400 bg-blue-950/20",
    "Strategist": "border-emerald-500 text-emerald-400 bg-emerald-950/20",
    "default": "border-slate-700 text-slate-500 bg-slate-900"
};

// DOM elements
const spinBtn = document.getElementById('spin-btn');
const heroImg = document.getElementById('hero-img');
const heroName = document.getElementById('hero-name');
const heroRole = document.getElementById('hero-role');
const cardContainer = document.getElementById('card-container');
const roleButtons = document.querySelectorAll('.role-btn');

// Guardamos los roles activos. Por defecto arrancan los 3 seleccionados
let activeRoles = new Set(['Vanguard', 'Duelist', 'Strategist']);
let isSpinning = false;

// Manejo de clicks con lógica Multiselect
roleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (isSpinning) return;

        const role = btn.getAttribute('data-role');

        if (activeRoles.has(role)) {
            // Si ya está activo, lo removemos (Apagar filtro)
            activeRoles.delete(role);
            // Estilos visuales de botón desactivado/apagado
            btn.className = btn.className.replace(/border-2 border-\w+-500/, 'border border-slate-800');
            btn.classList.remove('bg-slate-900', 'text-blue-400', 'text-red-400', 'text-emerald-400');
            btn.classList.add('bg-slate-950', 'text-slate-500');
        } else {
            // Si está apagado, lo encendemos
            activeRoles.add(role);
            // Restauramos sus colores dinámicos originales según el rol
            btn.classList.remove('bg-slate-950', 'text-slate-500', 'border-slate-800');
            btn.classList.add('bg-slate-900');
            
            if (role === 'Vanguard') btn.classList.add('border-2', 'border-blue-500', 'text-blue-400');
            if (role === 'Duelist') btn.classList.add('border-2', 'border-red-500', 'text-red-400');
            if (role === 'Strategist') btn.classList.add('border-2', 'border-emerald-500', 'text-emerald-400');
        }
    });
});

// Función de la ruleta
function spinRoulette() {
    if (isSpinning) return;
    
    const rolesToFilter = activeRoles.size === 0 
        ? ['Vanguard', 'Duelist', 'Strategist'] 
        : Array.from(activeRoles);

    const poolFiltrada = heroes.filter(h => rolesToFilter.includes(h.role));

    if (poolFiltrada.length === 0) return;

    isSpinning = true;
    spinBtn.disabled = true;
    spinBtn.innerText = "Choosing...";
    
    roleButtons.forEach(b => b.style.opacity = "0.4");

    let duration = 2000; 
    let intervalSpeed = 70; 
    
    heroImg.classList.add('anim-ticking');

    // Intervalo de giro (Efecto ruleta)
    const interval = setInterval(() => {
        const randomHero = poolFiltrada[Math.floor(Math.random() * poolFiltrada.length)];
        updateUI(randomHero);

        // REPRODUCIR TICK: Reiniciamos el audio al inicio para que pueda sonar superpuesto/rápido
        tickSFX.currentTime = 0;
        tickSFX.play().catch(err => console.log("Audio prevent:", err));
    }, intervalSpeed);

    // Detener ruleta y dar resultado
    setTimeout(() => {
        clearInterval(interval);
        
        const finalHero = poolFiltrada[Math.floor(Math.random() * poolFiltrada.length)];
        updateUI(finalHero);

        // REPRODUCIR ÉXITO
        successSFX.currentTime = 0;
        successSFX.play().catch(err => console.log("Audio prevent:", err));

        heroImg.classList.remove('anim-ticking');
        isSpinning = false;
        spinBtn.disabled = false;
        spinBtn.innerText = "Spin Roulette";
        
        roleButtons.forEach(b => b.style.opacity = "1");
        
        cardContainer.classList.add('scale-105');
        setTimeout(() => cardContainer.classList.remove('scale-105'), 300);

    }, duration);
}

// Actualizar la UI
function updateUI(hero) {
    heroImg.src = hero.img;
    heroName.innerText = hero.name;
    heroRole.innerText = hero.role;

    const classes = roleColors[hero.role] || roleColors['default'];
    const [borderColor, textColor, bgColor] = classes.split(' ');

    cardContainer.className = `border-4 rounded-2xl p-6 shadow-2xl transition-all duration-300 transform mb-8 ${borderColor} ${bgColor}`;
    heroRole.className = `text-sm font-semibold tracking-widest uppercase mt-1 ${textColor}`;
}

// Main button Event Listener
spinBtn.addEventListener('click', spinRoulette);

// Cached images preloading
window.addEventListener('DOMContentLoaded', () => {
    heroes.forEach(heroe => {
        const img = new Image();
        img.src = heroe.img;
    });
});