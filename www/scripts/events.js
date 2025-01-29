"use strict";

const body = document.body;


const header = document.createElement("h1");
header.className = "name";
header.textContent = "ESTSBike - Clube de Ciclismo";
body.appendChild(header);

// Barra de navegação
const navBar = document.createElement("div");
navBar.className = "navigator-bar";

// Botões para navegação entre secções (SPA)
const links = [
  { id: "Membros", href: "#Members", text: "Members" },
  { id: "Eventos", href: "#Events", text: "Events" },
  { id: "Tipos-de-Eventos", href: "#EventType", text: "Event Types" },
];


links.forEach(link => {
  const a = document.createElement("a");
  a.id = link.id;
  a.className = "area-link";
  a.href = link.href;
  a.textContent = link.text;

  // Adiciona evento de navegação SPA
  a.addEventListener("click", event => {
    event.preventDefault(); // Previne o comportamento padrão
    navigateTo(link.href.substring(1)); // Remove o "#" para usar como ID
  });

  navBar.appendChild(a);
});

body.appendChild(navBar);

// Função para alternar entre sections
function navigateTo(pageId) {
  // Esconde todas as secções
  document.querySelectorAll(".page").forEach(page => page.classList.add("hidden"));
  // Mostra apenas a secção selecionada
  const targetSection = document.getElementById(pageId);
  if (targetSection) {
    targetSection.classList.remove("hidden");
  }
}

// Exemplo de secção dinâmica para Eventos
const eventsSection = document.createElement("section");
eventsSection.id = "Events";
eventsSection.className = "page";


const pageTitle = document.createElement("h1");
pageTitle.className = "page-title";
pageTitle.textContent = "Eventos";
eventsSection.appendChild(pageTitle);


const table = document.createElement("table");
table.className = "event-table";


const thead = document.createElement("thead");
const headerRow = document.createElement("tr");
["ID", "Tipo", "Descritivo", "Data"].forEach(text => {
  const th = document.createElement("th");
  th.textContent = text;
  headerRow.appendChild(th);
});
thead.appendChild(headerRow);
table.appendChild(thead);


const tbody = document.createElement("tbody");
table.appendChild(tbody);


eventsSection.appendChild(table);


const buttonContainer = document.createElement("div");
buttonContainer.className = "button-container";

const actionButtons = ["Criar", "Editar", "Apagar"];
actionButtons.forEach(action => {
  const button = document.createElement("button");
  button.className = "action-button";
  button.textContent = action;
  button.id = action;
  buttonContainer.appendChild(button);
});

eventsSection.appendChild(buttonContainer);

// Adiciona a secção de eventos ao corpo
body.appendChild(eventsSection);

// Outras secções (Membros e Tipos de Eventos)
const membersSection = document.createElement("section");
membersSection.id = "Members";
membersSection.className = "page hidden";
membersSection.innerHTML = "<h1 class='page-title'>Membros</h1>";
body.appendChild(membersSection);

const eventTypeSection = document.createElement("section");
eventTypeSection.id = "EventType";
eventTypeSection.className = "page hidden";
eventTypeSection.innerHTML = "<h1 class='page-title'>Tipos de Eventos</h1>";
body.appendChild(eventTypeSection);


const footer = document.createElement("footer");
const footerLink = document.createElement("a");
footerLink.className = "about-link";
footerLink.href = "about.html";
footerLink.innerHTML = "About &copy; Tecnologia Setúbal &bull; Programação Web";
footer.appendChild(footerLink);
body.appendChild(footer);
