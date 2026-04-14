/**
 * Dzaky Dion Haidar - Portfolio Script
 * Fungsionalitas utama: Terminal Scrolling, Syntax Highlighting, & Looping
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Terminal Scrolling (Autotyper dengan Dukungan HTML) ---
    const codeContainer = document.getElementById('codeScroll');
    
    if (codeContainer) {
        // Teks koding menggunakan <br> untuk baris baru dan &nbsp; untuk spasi
        const codeSnippet = `
<span style="color: #61afef;">$</span> <span style="color: #c678dd;">npm</span> install <span style="color: #e5c07b;">dzaky_fullstack_v3</span>.ts<br><br>
<span style="color: #98c379;">> Installing dependencies... [OK]</span><br><br>
<span style="color: #61afef;">$</span> <span style="color: #c678dd;">node</span> dzaky.<span style="color: #e5c07b;">engineer</span>.<span style="color: #61afef;">profile</span>()<br><br>
<span style="color: #c678dd;">struct</span> DzakyDionHaidar {<br>
&nbsp;&nbsp;role: <span style="color: #98c379;">"Full Stack & AI Engineer"</span>;<br>
&nbsp;&nbsp;stack: [<span style="color: #e5c07b;">"MERN"</span>, <span style="color: #e5c07b;">"PERN"</span>, <span style="color: #e5c07b;">"NestJS"</span>];<br>
&nbsp;&nbsp;passion: <span style="color: #98c379;">"Scalable AI Systems"</span>;<br>
&nbsp;&nbsp;leadership: <span style="color: #56b6c2;">true</span>;<br>
}<br><br>
<span style="color: #98c379;">> Profile Loaded Successfully [OK]</span><br><br>
<span style="color: #61afef;">$</span> <span style="color: #c678dd;">listening</span> on 0.0.0.0:<span style="color: #e5c07b;">2026</span><br>
<span style="color: #61afef;">$</span> <span style="color: #c678dd;">ping</span> 127.0.0.1... <span style="color: #98c379;">12ms</span><br>
<span style="color: #61afef;">$</span> <span style="color: #5c6370; animation: blink 1s infinite;">_</span>
        `;

        const typingSpeed = 25; // Kecepatan ketik (ms)
        const delayBeforeRestart = 5000; // Jeda 5 detik sebelum mengulang (Looping)
        
        let charIndex = 0;
        let finalOutput = '';
        
        // Membersihkan Terminal sebelum mulai
        codeContainer.innerHTML = '';
        
        function type() {
            if (charIndex < codeSnippet.length) {
                let currentChar = codeSnippet.charAt(charIndex);

                // LOGIKA PENTING: Jika bertemu tag HTML '<', deteksi sampai penutup '>'
                if (currentChar === '<') {
                    let tag = '';
                    // Terus gabungkan huruf sampai ketemu '>'
                    while (codeSnippet.charAt(charIndex) !== '>' && charIndex < codeSnippet.length) {
                        tag += codeSnippet.charAt(charIndex);
                        charIndex++;
                    }
                    tag += '>'; // Tambahkan kurung tutup '>'
                    finalOutput += tag; // Masukkan seluruh tag sekaligus
                    charIndex++; // Maju ke karakter berikutnya
                    
                    // Panggil type() lagi secara instan (tanpa setTimeout) agar tag tidak diketik
                    type();
                } 
                // LOGIKA PENTING: Jika bertemu simbol entity HTML seperti '&', deteksi sampai penutup ';'
                else if (currentChar === '&') {
                    let entity = '';
                    while (codeSnippet.charAt(charIndex) !== ';' && charIndex < codeSnippet.length) {
                        entity += codeSnippet.charAt(charIndex);
                        charIndex++;
                    }
                    entity += ';';
                    finalOutput += entity;
                    charIndex++;
                    type();
                }
                else {
                    // Jika teks biasa, ketik dengan delay
                    finalOutput += currentChar;
                    codeContainer.innerHTML = finalOutput;
                    charIndex++;
                    
                    // Otomatis scroll ke bawah jika teks melebihi tinggi kotak
                    codeContainer.scrollTop = codeContainer.scrollHeight;
                    
                    setTimeout(type, typingSpeed);
                }
            } else {
                // LOGIKA LOOPING: Setelah selesai, tunggu beberapa detik lalu ulangi
              setTimeout(() => {
                    codeContainer.innerHTML = ''; // Kosongkan layar
                    finalOutput = ''; // Reset output
                    charIndex = 0; // Kembalikan index 
                    type(); // Mulai ngetik dari awal lagi
                }, delayBeforeRestart);
            }
        }
        
        type(); // Panggilan pertama untuk menjalankan efek ngetik
    }
    
    // ... (Kode Terminal Anda yang sebelumnya ada di sini) ...

// --- 2. Scroll Spy Pro (Navbar Active State) ---
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section');

    function updateActiveNavbar() {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Logika: Jika scroll kita berada di tengah-tengah section tersebut
            // Kita beri toleransi -150px untuk jarak Navbar
            if (pageYOffset >= sectionTop - 150) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(currentSection)) {
                link.classList.add("active");
            }
        });
    }

// PENTING: Jalankan saat scroll dan resize
    window.addEventListener('scroll', updateActiveNavbar);
    window.addEventListener('resize', updateActiveNavbar); // Jika layar di-resize

    // Panggil langsung fungsinya sekali untuk inisialisasi awal saat halaman dimuat
    updateActiveNavbar();
    

    // --- 3. Scroll Reveal (High Performance Mode) ---
    sections.forEach(section => {
        section.classList.add('reveal-section');
    });

    const revealOptions = {
        root: null, 
        threshold: 0.1, // Cukup 10% terlihat langsung mulai, biar gak kerasa delay
        rootMargin: "0px 0px -20px 0px" 
    };

    const sectionObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // PENTING: Hentikan sensor setelah section muncul (Animasi 1x saja)
                // Ini akan menghemat resource CPU secara drastis saat user scroll naik turun
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});