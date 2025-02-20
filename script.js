import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.1/api.js";
import { renderHTML } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.1/element.js";
import { getHash, onHashChange } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.1/url.js";

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
    console.log(data);

    const profileContainer = document.getElementById("profile");
    profileContainer.innerHTML = ""; // Bersihkan konten lama

    const avatar = document.createElement("img");
    avatar.src = data.profile.photo;
    avatar.alt = "Foto Profil";
    avatar.id = "avatar";

    const name = document.createElement("h3");
    name.id = "name";
    name.textContent = data.profile.name;

    const title = document.createElement("p");
    title.id = "title";
    title.textContent = data.profile.title;

    const contactContainer = document.createElement("div");
    contactContainer.classList.add("contact-info");
    contactContainer.id = "contact";

    const email = document.createElement("p");
    email.innerHTML = `Email: <a href="mailto:${data.contact.email}">${data.contact.email}</a>`;
    
    const phone = document.createElement("p");
    phone.innerHTML = `Telepon: <a href="tel:${data.contact.phone}">${data.contact.phone}</a>`;

    contactContainer.appendChild(email);
    contactContainer.appendChild(phone);

    const linksContainer = document.createElement("div");
    linksContainer.classList.add("social-links");
    linksContainer.id = "social";

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
