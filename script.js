let allQuest = [];

// Ambil data pas pertama kali buka
const questData = localStorage.getItem('dataQuest');
if (questData) {
    allQuest = JSON.parse(questData);
    showQuest();
}

function saveData() {
    localStorage.setItem('dataQuest', JSON.stringify(allQuest));
}

const clickSound = new Audio('tingsound.mp3');
const deleteSound = new Audio('boomsfc.mp3');

const inputQuest = document.getElementById('quest-input');
const tombolTambah = document.getElementById('add-button');
const daftarQuest = document.getElementById('quest-list');

function showQuest() {
    daftarQuest.innerHTML = '';
    allQuest.forEach((item, index) => {
        const li = document.createElement('li');
        if (item.status === 'selesai') li.classList.add('selesai');

        // Kasih ID atau index supaya kita tau mana yang mau dihapus
        li.innerHTML = `
            <span>${item.teks}</span>
            <button class="btn-hapus" onclick="hapusQuest(${index})">X</button>
        `;
        
        // Klik untuk coret
        li.addEventListener('click', (e) => {
            if(e.target.tagName !== 'BUTTON') {
                toggleSelesai(index);
            }
        });

        daftarQuest.appendChild(li);
    });
}

// Fungsi Tambah
tombolTambah.addEventListener('click', () => {
    if (inputQuest.value === '') return; // Jangan tambah kalau kosong
    
    const newQuest = { teks: inputQuest.value, status: 'aktif' };
    allQuest.push(newQuest);
    saveData();
    showQuest(); // Gambar ulang biar sinkron
    inputQuest.value = '';
});

// Fungsi Coret (Update Array)
function toggleSelesai(index) {
    allQuest[index].status = allQuest[index].status === 'aktif' ? 'selesai' : 'aktif';
    clickSound.currentTime = 0;
    clickSound.play();
    saveData();
    showQuest();
}

// Fungsi Hapus (Beneran hapus dari Array)
function hapusQuest(index) {
    allQuest.splice(index, 1); // Buang 1 data dari array berdasarkan index
    deleteSound.currentTime = 0;
    deleteSound.play();
    saveData();
    showQuest();
}