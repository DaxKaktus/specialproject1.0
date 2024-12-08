// trigger to play music in the background with sweetalert
window.addEventListener('load', () => {
    Swal.fire({
        title: 'biar tambah asik gimana kalau ditambah pake lagu?',
        // text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            document.querySelector('.song').play();
            animationTimeline();
        } else {
            animationTimeline();
        }
    });
});

function generateBackgroundDecor() {
    const decorContainer = document.querySelector('.background-decor');

    // Pastikan elemen kontainer ada
    if (!decorContainer) {
        console.error('Container dengan class .background-decor tidak ditemukan!');
        return;
    }

    // Membuat 20 elemen bunga secara dinamis
    for (let i = 0; i < 20; i++) {
        const flower = document.createElement('img');

        // Menetapkan atribut src untuk gambar bunga secara acak
        flower.src = './img/bintang' + (Math.ceil(Math.random() * 10)) + '.png'; // Asumsi ada 4 jenis gambar bunga
        flower.className = 'flower';
        
        flower.onerror = function () {
            decorContainer.removeChild(flower);
        };
        // Menetapkan properti gaya (inline style)
        flower.style.left = Math.random() * 100 + 'vw'; // Posisi horizontal acak
        flower.style.animationDelay = Math.random() * 5 + 's'; // Delay animasi acak
        flower.style.width = Math.random() * 50 + 30 + 'px'; // Lebar elemen acak (30px - 80px)

        // Menambahkan elemen bunga ke dalam kontainer
        decorContainer.appendChild(flower);
    }
}

// Menjalankan fungsi setelah DOM selesai dimuat
document.addEventListener('DOMContentLoaded', generateBackgroundDecor);

const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

// Sesuaikan ukuran canvas dengan ukuran layar
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array untuk menyimpan partikel
let particles = [];

// Fungsi untuk membuat petasan
function createFirework(x, y, colors) {
    for (let i = 0; i < 100; i++) {
        const angle = Math.random() * Math.PI * 2; // Sudut acak
        const speed = Math.random() * 4 + 2; // Kecepatan acak
        const color = colors[Math.floor(Math.random() * colors.length)]; // Warna acak
        particles.push({
            x: x,
            y: y,
            dx: Math.cos(angle) * speed,
            dy: Math.sin(angle) * speed,
            radius: Math.random() * 3 + 1,
            life: Math.random() * 80 + 60,
            color: color
        });
    }
}

// Fungsi untuk menggambar partikel
function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Jika partikel habis, hapus dari array
        if (p.life <= 0) {
            particles.splice(i, 1);
            i--;
            continue;
        }

        // Gambar partikel
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Update posisi partikel
        p.x += p.dx;
        p.y += p.dy;

        // Mengurangi radius dan masa hidup
        p.radius *= 0.96;
        p.life--;
    }
}

// Fungsi utama untuk animasi
function animateFireworks() {
    drawParticles();
    requestAnimationFrame(animateFireworks);
}

// Menambahkan efek petasan secara berkala
setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2; // Petasan muncul di bagian atas layar
    createFirework(x, y, ['#FF5733', '#FFBD33', '#33FF57', '#3388FF', '#FF33B8']);
}, 1000); // Petasan baru setiap detik

// Mulai animasi
animateFireworks();

// Sesuaikan ukuran canvas saat layar diubah ukurannya
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


// animation timeline
const animationTimeline = () => {
    // split chars that needs to be animated individually
    const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
    const hbd = document.getElementsByClassName("wish-hbd")[0];

    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
        .split("")
        .join("</span><span>")}</span`;

    hbd.innerHTML = `<span>${hbd.innerHTML
        .split("")
        .join("</span><span>")}</span`;

    const ideaTextTrans = {
        opacity: 0,
        y: -20,
        rotationX: 5,
        skewX: "15deg"
    }

    const ideaTextTransLeave = {
        opacity: 0,
        y: 20,
        rotationY: 5,
        skewX: "-15deg"
    }

    // timeline
    const tl = new TimelineMax();

    tl.to(".container", 0.6, {
        visibility: "visible"
    })
    .from(".one", 0.7, {
        opacity: 0,
        y: 10
    })
    .from(".two", 0.4, {
        opacity: 0,
        y: 10
    })
    .to(".one",
        0.7,
        {
            opacity: 0,
            y: 10
        },
    "+=3.5")
    .to(".two",
        0.7,
        {
            opacity: 0,
            y: 10
        },
    "-=1")
    .from(".three", 0.7, {
        opacity: 0,
        y: 10
    })
    .to(".three",
        0.7,
        {
            opacity: 0,
            y: 10
        },
    "+=3")
    .from(".four", 0.7, {
        scale: 0.2,
        opacity: 0,
    })
    .from(".fake-btn", 0.3, {
        scale: 0.2,
        opacity: 0,
    })
    .staggerTo(
        ".hbd-chatbox span",
        1.5, {
            visibility: "visible",
        },
        0.05
    )
    .to(".fake-btn", 0.1, {
        backgroundColor: "rgb(127, 206, 248)",
    },
    "+=4")
    .to(
        ".four",
        0.5, {
            scale: 0.2,
            opacity: 0,
            y: -150
        },
    "+=1")
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4 strong", 0.5, {
        scale: 1.2,
        x: 10,
        backgroundColor: "rgb(21, 161, 237)",
        color: "#fff",
    })
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-5", 0.7, ideaTextTrans)
    .to(".idea-5", 0.7, ideaTextTransLeave, "+=2.5")
    .from(
        ".idea-6",
        0.7, {
            rotationX: 15,
            rotationZ: -10,
            skewY: "-5deg",
            y: 50,
            z: 10,
            opacity: 0,
        },
        "+=1.5"
    )
    .to(
        ".idea-6 span",
        0.7, {
            rotation: 90,
            x: 8,
        },
        "+=1.4"
    )
    .to(
        ".idea-6",
        0.7, {
            scale: 0.2,
            opacity: 0,
        },
        "+=2"
    )
    .from(".idea-7", 0.7, ideaTextTrans)
    .to(".idea-7", 0.7, ideaTextTransLeave, "+=2.5")
    .staggerFrom(
        ".idea-8 span",
        0.8, {
            scale: 3,
            opacity: 0,
            rotation: 15,
            ease: Expo.easeOut,
        },
        0.2
    )
    .staggerTo(
        ".idea-8 span",
        0.8, {
            scale: 3,
            opacity: 0,
            rotation: -15,
            ease: Expo.easeOut,
        },
        0.2,
        "+=1.5"
    )
    .staggerFromTo(
        ".baloons img",
        2.5, {
            opacity: 0.9,
            y: 1400,
        }, {
            opacity: 1,
            y: -1000,
        },
        0.2
    )
    const classes = [".six", ".seven", ".eight",".nine"];
            classes.forEach((cls, index) => {
                tl.fromTo(
                    cls,
                    2,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0 },
                    `+=${index === 0 ? 2 : 1}`
                )
                .to(
                    cls,
                    2,
                    { opacity: 0, y: 30, zIndex: "-5" },
                    `+=2`
                );
            });
            tl.staggerFrom(".wish span", 1, {
                opacity: 0,
                y: -50,
                rotation: 150,
                skewX: "30deg",
                ease: "elastic.out(1, 0.5)"
            }, 0.1)
        
            .staggerFrom(".twelve p", 1, ideaTextTrans, 1.2)
            .to(
                ".last-smile",
                0.5, {
                    rotation: 90,
                },
                "+=1"
            )
        
            // Restart Animation on click
            const replyBtn = document.getElementById("replay");
            replyBtn.addEventListener("click", () => {
                tl.restart();
            });
           
        };