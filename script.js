import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.6/api.js";
import { renderHTML } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.6/element.js";
import { getHash, onHashChange } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.6/url.js";

onHashChange(loadProfile);

function loadProfile() {
    console.log(getHash());
    const hashpath = getHash();
    if (hashpath === "profile") {
        console.log("Menampilkan profil😊");
        renderHTML("container", "profile.html", fetchProfileData);
    }
}

function fetchProfileData() {
    getJSON("https://t.if.co.id/json/kaizhr.json", displayProfile);
}

function displayProfile(data) {
    console.log("Data JSON yang diterima:", data);

    // Cek apakah data memiliki properti yang benar
    if (!data || !data.profile) {
        console.log("Data profil tidak ditemukan!");
        return;
    }

    const profileContainer = document.getElementById("profile");
    if (!profileContainer) {
        console.log("Elemen dengan id 'profile' tidak ditemukan di HTML.");
        return;
    }

    profileContainer.innerHTML = ""; // Bersihkan konten lama

    // Buat elemen gambar untuk foto profil
    const avatar = document.createElement("img");
    avatar.src = data.profile.photo || "default-profile.png"; // Default jika foto tidak ada
    avatar.alt = "Foto Profil";
    avatar.id = "avatar";

    // Buat elemen nama
    const name = document.createElement("h3");
    name.id = "name";
    name.textContent = data.profile.name || "Nama tidak tersedia";

    // Buat elemen title/jabatan
    const title = document.createElement("p");
    title.id = "title";
    title.textContent = data.profile.title || "Jabatan tidak tersedia";

    // Buat container untuk informasi kontak
    const contactContainer = document.createElement("div");
    contactContainer.classList.add("contact-info");
    contactContainer.id = "contact";

    if (data.contact) {
        const email = document.createElement("p");
        email.innerHTML = `Email: <a href="mailto:${data.contact.email}">${data.contact.email}</a>`;

        const phone = document.createElement("p");
        phone.innerHTML = `Telepon: <a href="tel:${data.contact.phone}">${data.contact.phone}</a>`;

        contactContainer.appendChild(email);
        contactContainer.appendChild(phone);
    } else {
        console.warn("Informasi kontak tidak tersedia.");
    }

    // Buat container untuk media sosial
    const linksContainer = document.createElement("div");
    linksContainer.classList.add("social-links");
    linksContainer.id = "social";

    if (Array.isArray(data.social_media)) {
        data.social_media.forEach((social) => {
            const link = document.createElement("a");
            link.href = social.url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            const icon = document.createElement("i");
            icon.className = social.icon;
            icon.title = social.platform;

            link.appendChild(icon);
            linksContainer.appendChild(link);
        });
    } else {
        console.warn("Data media sosial tidak tersedia.");
    }

    // Tambahkan elemen-elemen ke dalam profileContainer
    profileContainer.appendChild(avatar);
    profileContainer.appendChild(name);
    profileContainer.appendChild(title);
    profileContainer.appendChild(contactContainer);
    profileContainer.appendChild(linksContainer);
}


const colors = ['#3f2f2f', '#854646', '#8f1c1c', '#670d0d', '#430101'];
let currentColorIndex = 0;

setInterval(function() {
    document.body.style.backgroundColor = colors[currentColorIndex];
    currentColorIndex = (currentColorIndex + 1) % colors.length;
}, 2000);
