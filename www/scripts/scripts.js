"use strict";
const INITIAL_EVENT_ID = 1;

//EventManager.currentId = INITIAL_EVENT_ID;    ta a dar mal pq ele aqui ainda n foi definido 

/* ENUM? */
/**
 * Classe EventType
 * 
 * @class Tipos de Eventos de Ciclismo.
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
     * 
     * @param {number} id - Identificador único do tipo de evento
     * @param {string} description - Descritivo para o tipo de evento
     */
    constructor(id, description) {
        this.#id = id;
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
 * Classe Events
 * 
 * @class Evento de Ciclismo.
 */
class Events {
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
     * @constructs Events
     * 
     * @param {number} id - Identificador único do evento
     * @param {EventType} type - O tipo de evento para o evento
     * @param {string} description - O descritivo para o evento
     * @param {Date | string} date - A data para o evento
     */
    constructor(id, type, description, date) {
        this.#id = id;
        if (!(type instanceof EventType)) {
            throw new Error("O tipo de evento deve ser do tipo EventType")
        }
        this.#type = type;
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
 * Classe Member
 * 
 * @class Membro do Clube de Ciclismo.
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
     * @property {Events[]} registeredEvents - Eventos em que o membro está inscrito
     */
    #registeredEvents;

    /**
     * @constructs Member
     * 
     * @param {number} id - Identificador único do membro
     * @param {string} name 
     */
    constructor(id, name) {
        this.#id = id;
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

    /**
     * @property {Events[]} registeredEvents - Eventos em que este membro está inscrito
     */
    get registeredEvents() {
        return this.#registeredEvents;
    }
}



/**
 * Classe EventTypeManager
 * 
 * @class Gestor de Tipos de Eventos (criar, editar, apagar).
 */
class EventTypeManager {
   
      static typeList;
      static currentId;

    constructor() {
        EventTypeManager.typeList = [];
        EventTypeManager.currentId = 1;

        this.createButtons();
    }

      /**
     * Cria um novo tipo de evento e adiciona à lista.
     * @param {string} description - Descrição do tipo de evento.
     */
    createType(description){
        const newType = new EventType(EventTypeManager.currentId, description);
        EventTypeManager.typeList.push(newType);
        EventTypeManager.currentId++;
        return newType; 
    }


     /**
     * Atualiza a tabela com os tipos de eventos.
     */
    updateEventTypeTable() {
        const table = document.getElementById("member-table");
        console.log(table);

        /**  */
        table.removeChild(table.getElementsByTagName("tbody")[0]);

        const tbody = document.createElement("tbody");
        table.appendChild(tbody);

        // Limpar tabela
        tbody.replaceChildren();

        EventTypeManager.typeList.forEach(type => {
            const row = this.#addTableRow(type);

            tbody.appendChild(row);
        });
    }

    #addTableRow(type) {
        let result = document.createElement('tr');

        // Array para iterar sobre cada parâmetro
        const typeValues = [
            type.id,
            type.description
        ]

        // Adicionar uma coluna na tabela para cada parâmetro no evento
        typeValues.forEach(parameter => {
            const td = document.createElement('td');
            td.textContent = parameter;
            result.appendChild(td);
        });

        return result;
    }

    createButtons() {
        // Botão "Criar"
        document.getElementById("type-create").addEventListener("click", () => {
            const modal = document.getElementById("createEventTypeModal");
            modal.classList.remove("hidden");
    
            // Preencher campo ID com o próximo ID disponível
            document.getElementById("eventTypeId").value = EventTypeManager.currentId;
        });


        // Adicionar comportamento ao botão "Salvar"
        document.getElementById("saveEventType").addEventListener("click", () => {
            const descriptionInput = document.getElementById("eventTypeDescription");
            const description = descriptionInput.value.trim();

            if (description) {
                console.log(description);

               // Criar novo tipo de evento e atualizar tabela
               this.createType(description);

                // Fechar modal e limpar campo
                document.getElementById("createEventTypeModal").classList.add("hidden");
                descriptionInput.value = "";

               this.updateEventTypeTable();
            } else {
                alert("Por favor, insira uma descrição.");
            }
        });

        // Adicionar comportamento ao botão "Cancelar"
        document.getElementById("cancelEventType").addEventListener("click", () => {
            const modal = document.getElementById("createEventTypeModal");
            modal.classList.add("hidden");

            // Limpar campo de descrição
            document.getElementById("eventTypeDescription").value = "";
        });
    }
}



/**
 * Classe EventManager
 * 
 * @class Gestor de Eventos (criar, editar, apagar).
 */
class EventManager {
    /**
     * @property {Events[]} eventList - Lista de eventos disponíveis
     * @static
     */
    static eventList;

    /**
     * @property {number} currentId - Id atual dos eventos
     * @static
     */
    static currentId;           //alterei aqui para ele começar o id já em 1

    /**
     * @property {EventManager} instance                -A instancia unica do EventManager (Singleton)
     * @static
     */
    static instance;

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
        if(EventManager.instance){
            return EventManager.instance; //Retorna instancia unica (singleton)
        }

        EventManager.id = 1;
        EventManager.eventList = [];

        this.initializeButtons();

        EventManager.instance = this;
    }

    /**
     * Inicializa os botões de ação.
     */
    initializeButtons() {
        this.createButton = document.getElementById("Criar");
        this.editButton = document.getElementById("Editar");
        this.deleteButton = document.getElementById("Apagar");

        if (this.createButton) {
            this.setActions();
        }
    }

    getButtonById(id){                              //Em vez de verificarmos em varios sitios se os botões existem criei esta fç que verifica
        const button = document.getElementById(id);
        if(!button) console.warn('Botão com id "${id}" não encontrado');
        return button;
    }

    /**
     * Adiciona as ações ao clicar num dos botões.
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

    /**
     * Apaga os eventos presentes na tabela, de forma a evitar duplicados
     * e adiciona todos os eventos presentes na lista de eventos.
     */
    updateEvents() {
        // Apagar o body da tabela para evitar duplicados
        tbody.replaceChildren();

        // Criar uma linha na tabela para cada evento
        EventManager.eventList.forEach(event => {
            const row = this.#addTableRow(event);

            tbody.appendChild(row);
        });
    }

    /**
     * Cria uma nova linha na tabela e adiciona-lhe os valores de um evento.
     * 
     * @param {Events} event - o evento a adicionar na nova linha
     * @returns uma linha ('tr') com os valores do evento
     */
    #addTableRow(event) {
        let result = document.createElement('tr');

        // Array para iterar sobre cada parâmetro
        const eventValues = [
            event.id,
            event.type.description,
            event.description,
            event.date
        ]

        // Adicionar uma coluna na tabela para cada parâmetro no evento
        eventValues.forEach(parameter => {
            const td = document.createElement('td');
            td.textContent = parameter;
            result.appendChild(td);
        });

        return result;
    }



    createEvent() {
        // Mostrar página para criar evento

        // Teste
        const type = new EventType(1, "BTT");
        const event = new Events(EventManager.currentId, type, "Evento", "15/12/2024");

        EventManager.eventList.push(event);
        EventManager.currentId++;

        // Adicionar evento à lista de eventos
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
    
    static memberList = [];
    static currentId = 1;

    constructor() {
        // Caso o id não tenha sido inicializado
        if (MemberManager.instance) return MemberManager.instance;
            
        MemberManager.instance = this;
    }
}

let memberManagerInstance;

window.onload = function () {
    // TODO: Change to singleton instances
    const eventTypeManager = new EventTypeManager();
    const eventManager = new EventManager();
    const memberManager = new MemberManager();
    
   const pageActions = {
    "EventType": () => eventTypeManager.updateEventTypeTable(),
    "Events": () => eventManager.updateEvents(),
    "Members": () => {},
   };

   const action = pageActions[document.body.id];
   if(action) {
    action();
   }
} 


document.addEventListener("DOMContentLoaded", () => {
    console.log("Loaded!");
});
