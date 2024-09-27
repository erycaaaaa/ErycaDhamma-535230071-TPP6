const listContainer = document.getElementById("list-container");
const inputBox = document.getElementById("input-box");

// Fungsi buat menambah tugas baru
function addTask() {
  if (inputBox.value === "") {
    alert("Yuk, tulis sesuatu dulu!"); // Mengingatkan pengguna untuk mengisi input
  } else {
    let li = document.createElement("li"); // Membuat elemen <li> baru
    li.innerHTML = inputBox.value; // Mengisi li dengan input yang dimasukkan
    listContainer.appendChild(li); // Menambahkan li ke dalam listContainer
    
    let span = document.createElement("span"); // Membuat elemen <span> untuk tombol hapus
    span.innerHTML = "\u00d7"; // Simbol '×' untuk menghapus tugas
    li.appendChild(span); // Menambahkan span ke dalam li
    
    saveData(); // Menyimpan data ke localStorage
  }
  inputBox.value = ""; // Mengosongkan input setelah menambah tugas
}

// Event listener untuk mengklik di listContainer
listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked"); // Menandai tugas sudah selesai atau belum
    saveData(); // Menyimpan perubahan
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove(); // Menghapus tugas jika tombol hapus diklik
    saveData(); // Menyimpan perubahan
  }
}, false);

// Fungsi untuk menyimpan data ke localStorage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML); // Menyimpan isi listContainer
}

// Fungsi untuk menampilkan tugas yang sudah disimpan
function showTasks() {
  listContainer.innerHTML = localStorage.getItem("data") || ""; // Mengambil data dari localStorage
}
showTasks(); // Memanggil fungsi untuk menampilkan tugas saat halaman dimuat

// Event listener untuk memfilter tugas
document.getElementById("all-tasks").addEventListener("click", function () {
  $("li").show(); // Menampilkan semua tugas
});

document.getElementById("pending-tasks").addEventListener("click", function () {
  $("li").each(function () {
    if ($(this).hasClass("checked")) {
      $(this).hide(); // Menyembunyikan tugas yang sudah selesai
    } else {
      $(this).show(); // Menampilkan tugas yang belum selesai
    }
  });
});

document.getElementById("completed-tasks").addEventListener("click", function () {
  $("li").each(function () {
    if ($(this).hasClass("checked")) {
      $(this).show(); // Menampilkan tugas yang sudah selesai
    } else {
      $(this).hide(); // Menyembunyikan tugas yang belum selesai
    }
  });
});
listContainer.addEventListener("dblclick", function (e) {
  if (e.target.tagName === "LI") {
    let currentTask = e.target;
    let currentText = currentTask.textContent.replace("✕", ""); // Menghapus simbol '×' dari teks
    let input = document.createElement("input");
    input.type = "text";
    input.value = currentText;
    input.classList.add("rename-input");
    currentTask.innerHTML = "";
    currentTask.appendChild(input);

    // Fokuskan input dan pilih teks
    input.focus();
    input.select();

    input.addEventListener("blur", function () {
      if (input.value.trim() !== "") {
        currentTask.innerHTML = input.value;
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        currentTask.appendChild(span);
        saveData(); // Simpan perubahan setelah rename
      } else {
        currentTask.remove(); // Jika input kosong, hapus tugas
        saveData();
      }
    });

    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        input.blur(); // Simpan perubahan saat menekan Enter
      }
    });
  }
});
