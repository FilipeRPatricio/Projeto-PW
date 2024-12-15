"use strict";


/* ENUM? */
/**
 * @class Tipos de Eventos
 */
class EventType {
    /**
     * @property {number} id - Identificador único do tipo de evento
     */
    #id;

    /**
     * @property {string} description - Descritivo do tipo de evento
     */
    #description;

    /**
     * @constructs EventType
     * @param {string} description - Descritivo para o tipo de evento
     */
    constructor(description) {
        this.#description = description;
    }

    /**
     * @property {number} id - Identificator único deste tipo de evento
     */
    get id() {
        return this.#id;
    }

    /**
     * @property {string} description - Descritivo deste tipo de evento
     */
    get description() {
        return this.#description;
    }
}



/**
 * @class Evento Concreto
 */
class Event {
    /**
     * @property {number} id - Identificador único do evento
     */
    #id;

    /**
     * @property {EventType} type - Tipo de evento
     */
    #type;

    /**
     * @property {string} description - Descritivo do evento
     */
    #description;

    /**
     * @property {Date | string} date - Data de realização do evento
     */
    #date;

    /**
     * @constructs Event
     * @param {EventType} type - O tipo de evento para o evento
     * @param {string} description - O descritivo para o evento
     * @param {Date | string} date - A data para o evento
     */
    constructor(id, type, description, date) {
        this.#id = id;
        type === EventType ? this.#type = type : this.#type = "";
        this.#description = description;
        this.#date = date;
    }

    /**
     * @property {number} id - Identificador único deste evento
     */
    get id() {
        return this.#id;
    }

    /**
     * @property {EventType} type - Tipo deste evento
     */
    get type() {
        return this.#type;
    }

    /**
     * @property {string} description - Descritivo deste evento
     */
    get description() {
        return this.#description;
    }

    /**
     * @property {Date | string} date - Data de realização deste evento
     */
    get date() {
        return this.#date;
    }
}



/**
 * @class Membro do Clube
 */
class Member {
    /**
     * @property {number} id - Identificador único do membro
     */
    #id;

    /**
     * @property {string} name - Nome do membro
     */
    #name;

    /**
     * @property {EventType[]} favoriteEventTypes - Tipos de eventos favoritos do membro
     */
    #favoriteEventTypes;

    /**
     * @property {Event[]} registeredEvents - Eventos em que o membro está inscrito
     */
    #registeredEvents;

    /**
     * @constructs Member
     * @param {string} name 
     */
    constructor(name) {
        this.#name = name;
    }

    /**
     * @property {number} id - Identificador único deste membro
     */
    get id() {
        return this.#id;
    }

    /**
     * @property {string} name - Nome deste membro
     */
    get name() {
        return this.#name;
    }

    /**
     * @property {EventType[]} favoriteEventTypes - Tipos de eventos favoritos deste membro
     */
    get favoriteEventTypes() {
        return this.#favoriteEventTypes;
    }
}



/**
 * @class Gestor de Tipos de Eventos (criar, editar, apagar)
 */
class EventTypeManager {
    /**
     * @property {number} currentId - Id atual dos tipos de eventos
     * @static
     */
    static currentId;
}

/**
 * @class Gestor de Eventos (criar, editar, apagar)
 */
class EventManager {
    /**
     * @property {Event[]} eventList - Lista de eventos disponíveis
     */
    eventList;

    /**
     * @property {number} currentId - Id atual dos eventos
     * @static
     */
    static currentId;

    /**
     * @property {Button} createButton - Botão para criar novos eventos
     */
    createButton;

    /**
     * @property {Button} editButton - Botão para editar eventos
     */
    editButton;

    /**
     * @property {Button} deleteButton - Botão para apagar eventos
     */
    deleteButton;

    /**
     * @constructs EventManager
     */
    constructor() {
        this.currentId = 1;
        this.initializeButtons();
    }

    /**
     * Initializes the button variables
     */
    initializeButtons() {
        this.createButton = document.getElementById("Criar");
        this.editButton = document.getElementById("Editar");
        this.deleteButton = document.getElementById("Apagar");

        this.setActions();
    }

    /**
     * Sets the buttons onClick actions
     */
    setActions() {
        this.createButton.addEventListener("click", () => {
            this.createEvent();
            console.log("create");
        });

        this.editButton.addEventListener("click", () => {
            this.editEvent();
            console.log("edit");
        });

        this.deleteButton.addEventListener("click", () => {
            this.deleteEvent();
            console.log("delete");
        });
    }

    updateEvents() {
        events.forEach(event => {
            const row = document.createElement('tr');

            Object.values(event).forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                row.appendChild(td);
            });

            tbody.appendChild(row);
        });
    }

    createEvent() {

        this.updateEvents();
    }

    editEvent() {
        
    }

    deleteEvent() {

    }
}



/**
 * @class Gestor de Membros (criar, editar, apagar)
 */
class MemberManager {
    /**
     * @property {number} currentId - Id atual dos membros
     * @static
     */
    static currentId;
}



window.onload = function () {
    const eventManager = new EventManager();
    eventManager.updateEvents();
}
