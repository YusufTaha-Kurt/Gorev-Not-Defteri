// --- ELEMAN SEÇİMLERİ ---
const gorevListesi = document.getElementById('gorev-listesi');
const gorevInput = document.getElementById('gorev-input');
const ekleBtn = document.getElementById('gorev-ekle-btn');

// --- VERİ ---
let gorevler = [];

// --- FONKSİYONLAR ---
function saveTasks() {
    localStorage.setItem('myTasks', JSON.stringify(gorevler));
}

function loadTasks() {
    const kayitliGorevler = localStorage.getItem('myTasks');
    if (kayitliGorevler) {
        gorevler = JSON.parse(kayitliGorevler);
    }
}

function renderTasks() {
    gorevListesi.innerHTML = ''; // Listeyi temizle
    gorevler.forEach((gorev, index) => {
        const li = document.createElement('li');
        li.innerText = gorev.metin;
        if (gorev.tamamlandiMi) {
            li.classList.add('gorev-tamamlandi');
        }

        li.addEventListener('click', () => {
            gorev.tamamlandiMi = !gorev.tamamlandiMi;
            saveTasks();
            renderTasks();
        });

        gorevListesi.appendChild(li);
    });
}

// --- OLAY DİNLEYİCİLER ---
ekleBtn.addEventListener('click', () => {
    const yeniGorevMetni = gorevInput.value;
    if (yeniGorevMetni.trim() !== "") {
        gorevler.push({ metin: yeniGorevMetni, tamamlandiMi: false });
        saveTasks();
        renderTasks();
        gorevInput.value = "";
    }
});

// --- KODU BAŞLAT ---
loadTasks();
renderTasks();