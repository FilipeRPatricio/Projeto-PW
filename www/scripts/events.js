"use strict";

const body = document.body;

// Cabeçalho principal
const header = document.createElement('h1');
header.className ='name';
header.textContent = 'ESTSBike - Clube de Ciclismo';
body.appendChild(header);

// Barra navegação
const navBar = document.createElement('div');
navBar.className = 'navigator-bar';

// Botões para a Página de Membros, Eventos e Tipos de Eventos
const links = [
  { id: 'Membros', href: 'members.html', text: 'Membros' },
  { id: 'Eventos', href: 'index.html', text: 'Eventos' },
  { id: 'Tipos-de-Eventos', href: 'eventType.html', text: 'Tipos de Eventos' },
];

links.forEach(link => {
  const a = document.createElement('a');
  a.id = link.id;
  a.className = 'area-link';
  a.href = link.href;
  a.textContent = link.text;
  navBar.appendChild(a);
});

body.appendChild(navBar);

// Título da página
const pageTitle = document.createElement('h1');
pageTitle.className = 'page-title';
pageTitle.textContent = 'Eventos';
body.appendChild(pageTitle);



// Tabela de Eventos
const table = document.createElement('table');
table.className = 'event-table';

// Header
const thead = document.createElement('thead');
const headerRow = document.createElement('tr');
['ID', 'Tipo', 'Descritivo', 'Data'].forEach(text => {
  const th = document.createElement('th');
  th.textContent = text;
  headerRow.appendChild(th);
});

thead.appendChild(headerRow);
table.appendChild(thead);

// Corpo
const tbody = document.createElement('tbody');

table.appendChild(tbody);
body.appendChild(table);

// Botões para Criar, Editar e Apagar Eventos
const buttonContainer = document.createElement('div');
buttonContainer.className = 'button-container';

const actionButtons = ['Criar', 'Editar', 'Apagar'];

actionButtons.forEach(action => {
  const button = document.createElement('button');
  button.className = 'action-button';
  button.textContent = action;
  button.id = action;
  buttonContainer.appendChild(button);
});

body.appendChild(buttonContainer);

// Rodapé
const footer = document.createElement('footer');
const footerLink = document.createElement('a');
footerLink.className = 'about-link';
footerLink.href = 'about.html';
footerLink.innerHTML = 'About &copy; Tecnologia Setúbal &bull; Programação Web';
footer.appendChild(footerLink);
body.appendChild(footer);
