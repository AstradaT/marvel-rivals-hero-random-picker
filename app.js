// 1. Data de los héroes (puedes expandirla con toda la pool de Marvel Rivals)
const heroes = [
    // --- DUELISTS (Daño / DPS) ---
    { name: "Black Cat", role: "Duelist", img: "assets/blackcat.webp" },
    { name: "Black Panther", role: "Duelist", img: "assets/blackpanther.webp" },
    { name: "Black Widow", role: "Duelist", img: "assets/blackwidow.webp" },
    { name: "Blade", role: "Duelist", img: "assets/blade.webp" },
    { name: "Daredevil", role: "Duelist", img: "assets/daredevil.webp" },
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

    // --- VANGUARDS (Tanques) ---
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

    // --- STRATEGISTS (Soportes / Healers) ---
    { name: "Adam Warlock", role: "Strategist", img: "assets/adamwarlock.webp" },
    { name: "Cloak & Dagger", role: "Strategist", img: "assets/cloakanddagger.webp" },
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

// Colores correspondientes a cada rol para la UI
const roleColors = {
    "Duelist": "border-red-500 text-red-400 bg-red-950/20",
    "Vanguard": "border-blue-500 text-blue-400 bg-blue-950/20",
    "Strategist": "border-emerald-500 text-emerald-400 bg-emerald-950/20",
    "default": "border-slate-700 text-slate-500 bg-slate-900"
};

// Elementos del DOM
const spinBtn = document.getElementById('spin-btn');
const heroImg = document.getElementById('hero-img');
const heroName = document.getElementById('hero-name');
const heroRole = document.getElementById('hero-role');
const cardContainer = document.getElementById('card-container');
const roleButtons = document.querySelectorAll('.role-btn');

let currentFilter = 'all';
let isSpinning = false;

// Manejo de clicks en los botones de filtro
roleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (isSpinning) return; // Bloquear cambio de filtro durante el giro

        // Cambiar clases visuales de los botones
        roleButtons.forEach(b => {
            b.classList.remove('bg-slate-800', 'text-white', 'border-slate-700');
            b.classList.add('bg-slate-950', 'text-slate-400', 'border-slate-800');
        });
        
        btn.classList.remove('bg-slate-950', 'text-slate-400', 'border-slate-800');
        btn.classList.add('bg-slate-800', 'text-white', 'border-slate-700');

        currentFilter = btn.getAttribute('data-role');
    });
});

// Función principal de la ruleta
function spinRoulette() {
    if (isSpinning) return;
    
    // 1. Filtrar la pool de héroes según el rol seleccionado
    const poolFiltrada = currentFilter === 'all' 
        ? heroes 
        : heroes.filter(h => h.role === currentFilter);

    if (poolFiltrada.length === 0) return;

    isSpinning = true;
    spinBtn.disabled = true;
    spinBtn.innerText = "Eligiendo...";
    
    // Deshabilitar botones de filtro visualmente durante el giro
    roleButtons.forEach(b => b.style.opacity = "0.5");

    let duration = 2000; 
    let intervalSpeed = 70; 
    
    heroImg.classList.add('anim-ticking');

    const interval = setInterval(() => {
        const randomHero = poolFiltrada[Math.floor(Math.random() * poolFiltrada.length)];
        updateUI(randomHero);
    }, intervalSpeed);

    setTimeout(() => {
        clearInterval(interval);
        
        // Selección final dentro de la pool filtrada
        const finalHero = poolFiltrada[Math.floor(Math.random() * poolFiltrada.length)];
        updateUI(finalHero);

        heroImg.classList.remove('anim-ticking');
        isSpinning = false;
        spinBtn.disabled = false;
        spinBtn.innerText = "Girar Ruleta";
        
        // Restaurar botones de filtro
        roleButtons.forEach(b => b.style.opacity = "1");
        
        cardContainer.classList.add('scale-105');
        setTimeout(() => cardContainer.classList.remove('scale-105'), 300);

    }, duration);
}

// Función para actualizar la interfaz
function updateUI(hero) {
    heroImg.src = hero.img;
    heroName.innerText = hero.name;
    heroRole.innerText = hero.role;

    // Clases dinámicas de Tailwind extraídas de nuestro diccionario roleColors
    const classes = roleColors[hero.role] || roleColors['default'];
    const [borderColor, textColor, bgColor] = classes.split(' ');

    // Actualizar contenedor
    cardContainer.className = `border-4 rounded-2xl p-6 shadow-2xl transition-all duration-300 transform mb-8 ${borderColor} ${bgColor}`;
    // Actualizar texto del rol
    heroRole.className = `text-sm font-semibold tracking-widest uppercase mt-1 ${textColor}`;
}

// Event Listener del botón principal
spinBtn.addEventListener('click', spinRoulette);

// Precarga de imágenes en caché
window.addEventListener('DOMContentLoaded', () => {
    heroes.forEach(heroe => {
        const img = new Image();
        img.src = heroe.img;
    });
});