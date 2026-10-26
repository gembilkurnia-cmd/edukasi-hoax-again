/* =========================================================
   Detektif Hoax — Logika interaktif
   Membutuhkan data dari js/data.js
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Utilitas ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const acak = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const simpan = {
    get(k, d) { try { const v = localStorage.getItem("hoaxlab:" + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("hoaxlab:" + k, JSON.stringify(v)); } catch (e) { /* abaikan */ } }
  };
  function toast(pesan) {
    const t = $("#toast");
    if (!t) return;
    t.textContent = pesan;
    t.classList.add("tampil");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove("tampil"), 2400);
  }
  function salin(teks) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(teks).then(() => toast("Teks disalin ✔"));
    }
    const ta = document.createElement("textarea");
    ta.value = teks; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); toast("Teks disalin ✔"); } catch (e) { toast("Salin manual ya 🙂"); }
    ta.remove();
    return Promise.resolve();
  }
  function lencana(persen) {
    if (persen === 100) return { ikon: "🏆", nama: "Pemburu Hoax Sejati" };
    if (persen >= 75) return { ikon: "🕵️", nama: "Detektif Andal" };
    if (persen >= 50) return { ikon: "🔎", nama: "Pengecek Pemula" };
    return { ikon: "📚", nama: "Ayo Belajar Lagi" };
  }

  /* ---------- Tema ---------- */
  function initTema() {
    const root = document.documentElement, btn = $("#tema-btn");
    const gelapSistem = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const pasang = (t) => {
      root.setAttribute("data-theme", t);
      btn.textContent = t === "dark" ? "☀️" : "🌙";
      btn.setAttribute("aria-label", t === "dark" ? "Ganti ke tema terang" : "Ganti ke tema gelap");
    };
    pasang(simpan.get("tema", gelapSistem ? "dark" : "light"));
    btn.addEventListener("click", () => {
      const t = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      pasang(t); simpan.set("tema", t);
    });
  }

  /* ---------- Navigasi, progress scroll ---------- */
  function initNav() {
    const nav = $("#nav"), menu = $("#menu"), btn = $("#menu-btn"), bar = $("#progress");
    btn.addEventListener("click", () => {
      const buka = menu.classList.toggle("buka");
      btn.setAttribute("aria-expanded", String(buka));
    });
    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) { menu.classList.remove("buka"); btn.setAttribute("aria-expanded", "false"); }
    });
    const onScroll = () => {
      const h = document.documentElement;
      const maks = h.scrollHeight - h.clientHeight;
      bar.style.width = (maks > 0 ? (h.scrollTop / maks) * 100 : 0) + "%";
      nav.classList.toggle("bayang", h.scrollTop > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const links = $$("a", menu);
    const peta = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((es) => {
        es.forEach((en) => {
          if (en.isIntersecting) {
            links.forEach((l) => l.classList.remove("aktif"));
            const a = peta.get(en.target.id);
            if (a) a.classList.add("aktif");
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      peta.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
    }
  }

  /* ---------- Animasi muncul saat scroll ---------- */
  function initReveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("masuk")); return; }
    const io = new IntersectionObserver((es) => {
      es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("masuk"); io.unobserve(en.target); } });
    }, { threshold: 0.1 });
    els.forEach((e) => io.observe(e));
  }

  /* ---------- Angka statistik di hero ---------- */
  function initStatistik() {
    const peta = { jenis: JENIS_HOAX.length, langkah: LANGKAH_JEDA.length, kasus: KASUS_DETEKTIF.length, soal: SOAL_KUIS.length };
    $$("[data-hitung]").forEach((el) => { const v = peta[el.dataset.hitung]; if (v !== undefined) el.textContent = v; });
    const tot = $("#bedah-total");
    if (tot) tot.textContent = BEDAH.flags.length;
  }

  /* ---------- Demo kaca pembesar di hero ---------- */
  function initHero() {
    const btn = $("#lup-btn"), chat = $("#hero-chat");
    btn.addEventListener("click", () => {
      const aktif = chat.classList.toggle("analisis");
      btn.setAttribute("aria-pressed", String(aktif));
      btn.textContent = aktif ? "🙈 Matikan kaca pembesar" : "🔍 Aktifkan kaca pembesar";
    });
  }

  /* ---------- Kartu balik ---------- */
  function initFlip() {
    $$(".flip").forEach((b) => b.addEventListener("click", () => {
      b.setAttribute("aria-pressed", String(b.getAttribute("aria-pressed") !== "true"));
    }));
  }

  /* ---------- Tiga wajah informasi ---------- */
  function initWajah() {
    const out = $("#wajah-hasil");
    const render = () => {
      const isi = $('input[name="isi"]:checked').value;
      const niat = $('input[name="niat"]:checked').value;
      const w = WAJAH_INFORMASI[isi + "|" + niat];
      out.className = "wajah-hasil " + w.warna;
      out.innerHTML =
        '<span class="ikon-besar" aria-hidden="true">' + w.ikon + "</span><div><h4>" + esc(w.nama) + "</h4><p>" + esc(w.arti) +
        '</p><p class="contoh"><b>Contoh:</b> ' + esc(w.contoh) + "</p></div>";
    };
    $$("#wajah input").forEach((i) => i.addEventListener("change", render));
    render();
  }

  /* ---------- Jenis hoax (tab) ---------- */
  function initJenis() {
    const list = $("#jenis-list"), panel = $("#jenis-panel");
    list.innerHTML = JENIS_HOAX.map((j, i) =>
      '<button type="button" class="jenis-item" role="tab" id="tab-' + j.id + '" data-i="' + i + '" aria-selected="false" aria-controls="jenis-panel" tabindex="-1">' +
      '<span class="jenis-ikon" aria-hidden="true">' + j.ikon + "</span><span>" + esc(j.nama) + "</span></button>"
    ).join("");
    const items = $$(".jenis-item", list);

    function tampil(i, fokus) {
      const j = JENIS_HOAX[i];
      items.forEach((b, k) => {
        const on = k === i;
        b.classList.toggle("aktif", on);
        b.setAttribute("aria-selected", String(on));
        b.tabIndex = on ? 0 : -1;
      });
      if (fokus) items[i].focus();
      panel.setAttribute("aria-labelledby", "tab-" + j.id);
      const titik = [1, 2, 3, 4, 5].map((n) => '<span class="titik' + (n <= j.bahaya ? " isi" : "") + '"></span>').join("");
      panel.innerHTML =
        '<div class="jenis-head"><span class="ikon-besar" aria-hidden="true">' + j.ikon + "</span><h3>" + esc(j.nama) + "</h3></div>" +
        "<p>" + esc(j.ringkas) + "</p>" +
        '<p class="bagian-judul">Contoh pesan</p><blockquote class="contoh-pesan">' + esc(j.contoh) + "</blockquote>" +
        '<p class="bagian-judul">Ciri-ciri</p><ul class="ciri-list">' + j.ciri.map((c) => "<li>" + esc(c) + "</li>").join("") + "</ul>" +
        '<p class="bagian-judul">Cara memeriksa</p><ol class="cek-list">' + j.cek.map((c) => "<li>" + esc(c) + "</li>").join("") + "</ol>" +
        '<p class="bagian-judul">Tingkat bahaya</p><div class="bahaya" role="img" aria-label="Tingkat bahaya ' + j.bahaya + ' dari 5">' + titik + "<span>" + j.bahaya + "/5</span></div>";
      panel.style.animation = "none"; void panel.offsetWidth; panel.style.animation = "";
    }

    list.addEventListener("click", (e) => { const b = e.target.closest(".jenis-item"); if (b) tampil(+b.dataset.i, false); });
    list.addEventListener("keydown", (e) => {
      const cur = items.findIndex((b) => b.classList.contains("aktif"));
      let next = null;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (cur + 1) % items.length;
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (cur - 1 + items.length) % items.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = items.length - 1;
      if (next !== null) { e.preventDefault(); tampil(next, true); }
    });
    tampil(0, false);
  }

  /* ---------- Bedah pesan ---------- */
  function initBedah() {
    const pesan = $("#bedah-pesan"), info = $("#bedah-info"), hitung = $("#bedah-hitung"), bar = $("#bedah-bar");
    const total = BEDAH.flags.length;
    let ditemukan = [];

    pesan.innerHTML = BEDAH.segmen.map((s) =>
      s.f === undefined ? esc(s.t) : '<button type="button" class="tanda" data-f="' + s.f + '">' + esc(s.t) + "</button>"
    ).join("");

    function render() {
      hitung.textContent = ditemukan.length;
      bar.style.width = (ditemukan.length / total) * 100 + "%";
      $$(".tanda", pesan).forEach((b) => b.classList.toggle("ditemukan", ditemukan.includes(+b.dataset.f)));
      if (!ditemukan.length) {
        info.innerHTML = '<div class="info-kosong">👆 Klik bagian teks bergaris putus-putus yang menurutmu mencurigakan. Penjelasannya akan muncul di sini.</div>';
        return;
      }
      let html = ditemukan.slice().reverse().map((i) => {
        const f = BEDAH.flags[i];
        return '<article class="info-kartu"><h4>' + f.ikon + " " + esc(f.judul) + "</h4><p>" + esc(f.penjelasan) + '</p><p class="tips">💡 ' + esc(f.tips) + "</p></article>";
      }).join("");
      if (ditemukan.length === total) {
        html = '<div class="selamat">🎉 Hebat! Semua ' + total + " tanda bahaya sudah ditemukan. Nah, itulah mengapa satu pesan bisa memuat banyak ciri hoax sekaligus.</div>" + html;
      }
      info.innerHTML = html;
    }

    pesan.addEventListener("click", (e) => {
      const b = e.target.closest(".tanda");
      if (!b) return;
      const f = +b.dataset.f;
      if (!ditemukan.includes(f)) ditemukan.push(f);
      render();
    });
    $("#bedah-semua").addEventListener("click", () => { ditemukan = BEDAH.flags.map((_, i) => i); render(); });
    $("#bedah-ulang").addEventListener("click", () => { ditemukan = []; render(); });
    render();
  }

  /* ---------- Pemindai ---------- */
  function initPemindai() {
    const ta = $("#pindai-teks"), hasil = $("#pindai-hasil"), contoh = $("#pindai-contoh");
    const awal = '<p class="kosong">Hasil pemindaian akan tampil di sini.<br>Tempel pesan, lalu klik <b>Pindai</b>.</p>';
    hasil.innerHTML = awal;
    contoh.innerHTML = CONTOH_PINDAI.map((c, i) => '<button type="button" class="chip" data-c="' + i + '">' + esc(c.label) + "</button>").join("");

    function pindai() {
      const t = ta.value.trim();
      if (t.length < 15) {
        hasil.innerHTML = '<p class="kosong">Tempelkan teks pesan yang lebih panjang (minimal 15 karakter), lalu klik <b>Pindai</b>.</p>';
        return;
      }
      const temuan = [];
      let total = 0;
      ATURAN_PINDAI.forEach((a) => {
        const bukti = a.uji(t);
        if (bukti) { temuan.push({ a, bukti }); total += a.bobot; }
      });
      const skor = Math.min(100, total);
      let level, nama, saran;
      if (skor < 20) { level = "aman"; nama = "Tampak wajar"; saran = "Belum terlihat ciri hoax yang mencolok, tetapi tetap periksa sumber dan tanggalnya."; }
      else if (skor < 45) { level = "waspada"; nama = "Perlu waspada"; saran = "Ada beberapa ciri yang patut dicurigai. Verifikasi dulu sebelum membagikan."; }
      else if (skor < 70) { level = "curiga"; nama = "Mencurigakan"; saran = "Banyak ciri hoax terdeteksi. Jangan bagikan; cari konfirmasi dari sumber resmi."; }
      else { level = "bahaya"; nama = "Sangat mencurigakan"; saran = "Hampir pasti pola hoax atau penipuan. Jangan klik tautan, jangan kirim data, dan jangan teruskan."; }

      const daftar = temuan.length
        ? '<ul class="temuan">' + temuan.map((x) =>
          "<li><b>" + esc(x.a.label) + '</b><span class="bukti">' + esc(x.bukti) + "</span><p>" + esc(x.a.saran) + "</p></li>").join("") + "</ul>"
        : '<p class="kosong">Tidak ada ciri hoax umum yang terdeteksi.</p>';

      hasil.innerHTML =
        '<div data-level="' + level + '"><div class="skor-wrap"><div class="skor-angka">' + skor + '</div><div class="meter" role="img" aria-label="Skor kecurigaan ' + skor + ' dari 100"><span></span></div></div>' +
        '<p class="level">' + esc(nama) + "</p><p>" + esc(saran) + "</p>" + daftar + "</div>";
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const m = $(".meter > span", hasil);
        if (m) m.style.width = skor + "%";
      }));
    }

    $("#pindai-btn").addEventListener("click", pindai);
    $("#pindai-hapus").addEventListener("click", () => { ta.value = ""; hasil.innerHTML = awal; ta.focus(); });
    contoh.addEventListener("click", (e) => {
      const b = e.target.closest("[data-c]");
      if (!b) return;
      ta.value = CONTOH_PINDAI[+b.dataset.c].teks;
      pindai();
    });
  }

  /* ---------- Langkah JEDA ---------- */
  function initLangkah() {
    const tabs = $("#jeda-tabs"), panel = $("#jeda-panel");
    let aktif = 0;
    tabs.innerHTML = LANGKAH_JEDA.map((l, i) =>
      '<button type="button" class="jeda-tab" role="tab" id="jeda-tab-' + i + '" data-i="' + i + '" aria-selected="false" aria-controls="jeda-panel">' +
      '<span class="huruf" aria-hidden="true">' + esc(l.huruf) + "</span><span>" + esc(l.judul) + "</span></button>"
    ).join("");

    function tampil(i) {
      aktif = i;
      const l = LANGKAH_JEDA[i];
      $$(".jeda-tab", tabs).forEach((b, k) => {
        b.classList.toggle("aktif", k === i);
        b.setAttribute("aria-selected", String(k === i));
      });
      panel.setAttribute("aria-labelledby", "jeda-tab-" + i);
      panel.innerHTML =
        '<p class="eyebrow">Langkah ' + (i + 1) + " dari " + LANGKAH_JEDA.length + "</p><h3>" + esc(l.huruf) + " — " + esc(l.judul) + "</h3><p>" + esc(l.isi) + "</p>" +
        '<ul class="cek">' + l.tips.map((t) => "<li>" + esc(t) + "</li>").join("") + "</ul>" +
        '<div class="nav-langkah"><button type="button" class="btn ghost" data-nav="-1"' + (i === 0 ? " disabled" : "") + '>← Sebelumnya</button>' +
        '<button type="button" class="btn primary" data-nav="1"' + (i === LANGKAH_JEDA.length - 1 ? " disabled" : "") + ">Berikutnya →</button></div>";
    }
    tabs.addEventListener("click", (e) => { const b = e.target.closest(".jeda-tab"); if (b) tampil(+b.dataset.i); });
    panel.addEventListener("click", (e) => {
      const b = e.target.closest("[data-nav]");
      if (!b) return;
      const n = aktif + +b.dataset.nav;
      if (n >= 0 && n < LANGKAH_JEDA.length) tampil(n);
    });
    tampil(0);
  }

  /* ---------- Alat cek fakta ---------- */
  function initAlat() {
    $("#alat-grid").innerHTML = ALAT_CEK.map((a) =>
      '<a class="alat reveal" href="' + esc(a.url) + '" target="_blank" rel="noopener noreferrer">' +
      '<span class="ikon-besar" aria-hidden="true">' + a.ikon + "</span><strong>" + esc(a.nama) + '</strong><span class="ket">' + esc(a.ket) +
      '</span><span class="buka">Buka situs ↗</span></a>'
    ).join("");
  }

  /* ---------- Permainan detektif ---------- */
  function initDetektif() {
    const root = $("#game");
    let kasus = [], i = 0, skor = 0, benar = 0, terkunci = false;

    function mulai() { kasus = acak(KASUS_DETEKTIF); i = 0; skor = 0; benar = 0; tampil(); }

    function tampil() {
      if (i >= kasus.length) return selesai();
      const k = kasus[i];
      terkunci = false;
      root.innerHTML =
        '<div class="game-head"><span>Kasus ' + (i + 1) + " dari " + kasus.length + '</span><span>Skor: <b>' + skor + "</b></span></div>" +
        '<div class="bar" aria-hidden="true"><span style="width:' + (i / kasus.length) * 100 + '%"></span></div>' +
        '<article class="pesan-kartu"><div class="pesan-meta"><span class="avatar" aria-hidden="true">' + k.avatar + "</span><div><strong>" + esc(k.sumber) +
        "</strong><small>" + esc(k.waktu) + '</small></div></div><div class="bubble"><p>' + esc(k.teks) + "</p></div>" +
        (k.catatan ? '<p class="catatan">🗒️ ' + esc(k.catatan) + "</p>" : "") + "</article>" +
        '<div class="jawab"><button type="button" class="btn danger" data-j="hoax">🚩 Hoax</button><button type="button" class="btn ok" data-j="bukan">✅ Bukan Hoax</button></div>' +
        '<div class="umpan" aria-live="polite"></div>';
    }

    function jawab(j, tombol) {
      terkunci = true;
      const k = kasus[i];
      const betul = j === k.jawaban;
      if (betul) { skor += 10; benar++; }
      $$(".jawab .btn", root).forEach((b) => { b.disabled = true; });
      tombol.classList.add("pilih");
      const terakhir = i === kasus.length - 1;
      $(".game-head b", root).textContent = skor;
      $(".umpan", root).innerHTML =
        '<div class="umpan-kotak ' + (betul ? "benar" : "salah") + '"><h4>' + (betul ? "✅ Tepat!" : "❌ Kurang tepat") + " — jawabannya: " +
        (k.jawaban === "hoax" ? "Hoax" : "Bukan Hoax") + '</h4><div class="chips">' +
        '<span class="chip">🏷️ ' + esc(k.kategori) + "</span>" + k.petunjuk.map((p) => '<span class="chip">🔸 ' + esc(p) + "</span>").join("") + "</div><p>" + esc(k.penjelasan) + "</p>" +
        '<button type="button" class="btn primary" id="lanjut">' + (terakhir ? "Lihat hasil" : "Kasus berikutnya →") + "</button></div>";
      const l = $("#lanjut", root);
      if (l) l.focus();
    }

    function selesai() {
      const persen = Math.round((benar / kasus.length) * 100);
      const lb = lencana(persen);
      const terbaik = Math.max(simpan.get("detektif-terbaik", 0), persen);
      simpan.set("detektif-terbaik", terbaik);
      root.innerHTML =
        '<div class="hasil"><div class="lencana" aria-hidden="true">' + lb.ikon + "</div><h3>" + esc(lb.nama) + "</h3>" +
        '<div class="skor-besar">' + benar + " / " + kasus.length + "</div><p>Akurasi " + persen + "% · Rekor terbaikmu " + terbaik + "%</p>" +
        '<p>' + (persen === 100 ? "Sempurna! Kamu jeli membaca ciri-ciri hoax." : "Ulangi permainan dan perhatikan petunjuk di tiap kasus. Urutan kasus diacak.") + "</p>" +
        '<div class="aksi"><button type="button" class="btn primary" id="ulang">🔄 Main lagi</button><a class="btn ghost" href="#kuis">Lanjut ke kuis →</a></div></div>';
    }

    root.addEventListener("click", (e) => {
      const b = e.target.closest("[data-j]");
      if (b && !terkunci) return jawab(b.dataset.j, b);
      if (e.target.closest("#lanjut")) { i++; tampil(); return; }
      if (e.target.closest("#ulang")) mulai();
    });
    mulai();
  }

  /* ---------- Kuis ---------- */
  function initKuis() {
    const root = $("#kuis-root");
    let soal = [], i = 0, skor = 0, salah = [], terkunci = false;

    function mulai() {
      soal = acak(SOAL_KUIS).map((s) => ({
        tanya: s.tanya, jelas: s.jelas,
        opsi: acak(s.opsi.map((t, idx) => ({ t, benar: idx === s.benar })))
      }));
      i = 0; skor = 0; salah = []; tampil();
    }

    function tampil() {
      if (i >= soal.length) return selesai();
      const s = soal[i];
      terkunci = false;
      root.innerHTML =
        '<div class="game-head"><span>Soal ' + (i + 1) + " dari " + soal.length + "</span><span>Benar: <b>" + skor + "</b></span></div>" +
        '<div class="bar" aria-hidden="true"><span style="width:' + (i / soal.length) * 100 + '%"></span></div>' +
        '<p class="soal">' + esc(s.tanya) + '</p><div class="opsi-list">' +
        s.opsi.map((o, k) => '<button type="button" class="opsi" data-k="' + k + '"><span class="huruf" aria-hidden="true">' + "ABCD"[k] + "</span><span>" + esc(o.t) + "</span></button>").join("") +
        '</div><div class="umpan" aria-live="polite"></div>';
    }

    function pilih(k) {
      terkunci = true;
      const s = soal[i];
      const betul = s.opsi[k].benar;
      if (betul) skor++; else salah.push({ tanya: s.tanya, benar: s.opsi.find((o) => o.benar).t, jelas: s.jelas });
      $$(".opsi", root).forEach((b, idx) => {
        b.disabled = true;
        if (s.opsi[idx].benar) b.classList.add("benar");
        else if (idx === k) b.classList.add("salah");
      });
      $(".game-head b", root).textContent = skor;
      const terakhir = i === soal.length - 1;
      $(".umpan", root).innerHTML =
        '<div class="umpan-kotak ' + (betul ? "benar" : "salah") + '"><h4>' + (betul ? "✅ Benar!" : "❌ Belum tepat") + "</h4><p>" + esc(s.jelas) +
        '</p><button type="button" class="btn primary" id="k-lanjut">' + (terakhir ? "Lihat hasil" : "Soal berikutnya →") + "</button></div>";
      const l = $("#k-lanjut", root);
      if (l) l.focus();
    }

    function selesai() {
      const persen = Math.round((skor / soal.length) * 100);
      const lb = lencana(persen);
      const terbaik = Math.max(simpan.get("kuis-terbaik", 0), persen);
      simpan.set("kuis-terbaik", terbaik);
      const tinjau = salah.length
        ? '<div class="tinjau"><h4>Yang perlu dipelajari lagi</h4>' + salah.map((s) =>
          "<div><b>" + esc(s.tanya) + "</b>Jawaban: " + esc(s.benar) + "<br><small>" + esc(s.jelas) + "</small></div>").join("") + "</div>"
        : "";
      root.innerHTML =
        '<div class="hasil"><div class="lencana" aria-hidden="true">' + lb.ikon + "</div><h3>" + esc(lb.nama) + "</h3>" +
        '<div class="skor-besar">' + skor + " / " + soal.length + "</div><p>Nilai " + persen + " · Rekor terbaikmu " + terbaik + "</p>" +
        '<div class="aksi"><button type="button" class="btn primary" id="k-ulang">🔄 Ulangi kuis</button>' +
        '<button type="button" class="btn ghost" id="k-bagi">📋 Salin ajakan</button></div></div>' + tinjau;
    }

    root.addEventListener("click", (e) => {
      const b = e.target.closest(".opsi");
      if (b && !terkunci) return pilih(+b.dataset.k);
      if (e.target.closest("#k-lanjut")) { i++; tampil(); return; }
      if (e.target.closest("#k-ulang")) { mulai(); return; }
      if (e.target.closest("#k-bagi")) {
        salin("Saya baru belajar mengenali hoax di Detektif Hoax dan meraih skor " + skor + "/" + soal.length +
          ". Ingat langkah JEDA: Jeda sebelum membagikan, Evaluasi sumber, Dobel-cek di sumber lain, Ajak orang lain meluruskan. Jangan asal sebar, cek dulu!");
      }
    });
    mulai();
  }

  /* ---------- Jalankan ---------- */
  function jalankan() {
    [initTema, initNav, initReveal, initStatistik, initHero, initFlip, initWajah, initJenis, initBedah,
      initPemindai, initLangkah, initAlat, initDetektif, initKuis].forEach((fn) => {
      try { fn(); } catch (err) { console.error("Gagal menjalankan " + fn.name, err); }
    });
    // pastikan .reveal yang dibuat dinamis (kartu alat) ikut dianimasikan
    initRevealBaru();
  }
  function initRevealBaru() {
    const els = $$("#alat-grid .reveal");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("masuk")); return; }
    const io = new IntersectionObserver((es) => {
      es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("masuk"); io.unobserve(en.target); } });
    }, { threshold: 0.1 });
    els.forEach((e) => io.observe(e));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", jalankan);
  else jalankan();
})();
