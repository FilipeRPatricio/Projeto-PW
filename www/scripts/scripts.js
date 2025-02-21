"use strict";

/*
    TODO: Verificações extra: i.e. datas que já passaram, tipos de eventos que já existem
*/

//#region Classe EventType

/**
 * Classe EventType
 * 
 * @class Tipos de Eventos de Ciclismo.
 */
class EventType {
    /**
     * @property {number} id - Identificador único do tipo de evento
     */
    id;

    /**
     * @property {string} description - Descritivo do tipo de evento
     */
    description;

    /**
     * @constructs EventType
     * 
     * @param {number} id - Identificador único do tipo de evento
     * @param {string} description - Descritivo para o tipo de evento
     */
    constructor(id, description) {
        this.id = id;
        this.description = description;
    }
}

//#endregion

//#region Classe Events

/**
 * Classe Events
 * 
 * @class Evento de Ciclismo.
 */
class Events {
    /**
     * @property {number} id - Identificador único do evento
     */
    id;

    /**
     * @property {EventType} type - Tipo de evento
     */
    type;

    /**
     * @property {string} description - Descritivo do evento
     */
    description;

    /**
     * @property {Date | string} date - Data de realização do evento
     */
    date;

    /**
     * @constructs Events
     * 
     * @param {number} id - Identificador único do evento
     * @param {EventType} type - O tipo de evento para o evento
     * @param {string} description - O descritivo para o evento
     * @param {Date | string} date - A data para o evento
     */
    constructor(id, type, description, date) {
        this.id = id;
        this.type = type;
        this.description = description;
        this.date = date;
    }
}

//#endregion

//#region Classe Member

/**
 * Classe Member
 * 
 * @class Membro do Clube de Ciclismo.
 */
class Member {
    /**
     * @property {number} id - Identificador único do membro
     */
    id;

    /**
     * @property {string} description - Nome do membro
     */
    description;

    /**
     * @property {EventType[]} favoriteEventTypes - Tipos de eventos favoritos do membro
     */
    favoriteEventTypes;

    /**
     * @property {Events[]} registeredEvents - Eventos em que o membro está inscrito
     */
    registeredEvents;

    /**
     * @constructs Member
     * 
     * @param {number} id - Identificador único do membro
     * @param {string} description - Nome do membro
     */
    constructor(id, description) {
        this.id = id;
        this.description = description;
        this.favoriteEventTypes = [];
        this.registeredEvents = [];
    }

    /**
     * Verifica se um membro tem um tipo de evento como favorito.
     * 
     * @param {number} type - O id do tipo de evento a procurar
     * @returns true se tiver como favorito o tipo de evento, false caso não tenha
     */
    likesThisEventType(type) {
        return !!this.favoriteEventTypes.find(t => t.id === type);
    }

    /**
     * Verifica se um membro está registado no evento recebido.
     * 
     * @param {number} event - O id do evento a verificar
     * @returns true se estiver inscrito, false caso não esteja
     */
    isRegisteredInEvent(event) {
        return !!this.registeredEvents.find(e => e.id === event);
    }
}

//#endregion

//#region Managers

/**
 * Classe ElementManager
 * 
 * @class Gestor de Elementos
 */
class ElementManager {}

//#region EventTypes

/**
 * Classe EventTypeManager
 * 
 * @class Gestor de Tipos de Eventos (criar, editar, apagar).
 */
class EventTypeManager extends ElementManager {

    /**
     * @property {EventType[]} typeList - Lista de tipos de eventos
     * @static
     */
    static typeList = [];

    /**
     * @property {number} currentId - Id atual dos tipos de eventos
     * @static
     */
    static currentId = 1;

    /**
     * @constructs EventTypeManager
     */
    constructor() {
        super();
        this.init();
    }

    /**
     * Retorna todos os tipos de eventos.
     * 
     * @returns um array com todos os tipos de eventos
     * @async
     */
    static async getTypes() {
        return await fetchJSON("/types/all", "GET");
    }

    /**
     * Atualiza a tabela com os tipos de eventos da base de dados.
     * 
     * @async
     */
    static async updateTypesTable() {
        const types = await EventTypeManager.getTypes();

        if (types) {
            tableManager.updateTable(EventTypeManager, types);
        }
    }

    /**
     * Retorna o Tipo de Evento encontrado com o id recebido.
     * 
     * @param {number} id - O id a procurar
     * @returns EventType com o id ou undefined caso não exista
     * @async
     */
    static async getTypeById(id) {
        let result = await fetchJSON(`/types/${id}`, "GET");

        return result ? result[0] : void 0;
    }
    
    /**
     * Retorna o Tipo de Evento encontrado com a descrição recebida.
     * 
     * @param {string} description - A descrição a procurar
     * @returns EventType com a descrição ou undefined caso não exista
     * @async
     */
    static async getTypeByDescription(description) {
        let result = await fetchJSON(`/types/desc/${description}`, "GET");
        
        return result ? result[0] : void 0;
    }

    /**
     * Retorna o número atual do auto_increment dos tipos de eventos.
     * 
     * @returns O próximo id para os tipos de eventos
     * @async
     */
    async getAutoIncrementId() {
        const result = await fetchJSON("/types/auto-inc", "GET");
        return result[0].AUTO_INCREMENT;
    }

    /**
     * Procura e retorna o tipo de evento que está selecionado na tabela.
     * 
     * @returns O tipo de evento selecionado
     * @async
     */
    async getSelectedType() {
        const selectedID = tableManager.getSelectedElementID();
        let result;

        selectedID > 0
        ? result = await fetchJSON(`/types/${selectedID}`, "GET")
        : alert("Por favor, selecione um tipo de evento antes de editar.");

        return result;
    }

    /**
     * Inicializa os botões e a tabela
     */
    init() {
        this.initializeButtons();

        EventTypeManager.updateTypesTable();
    }

    /**
     * Cria as ações do botões de gerenciamento de tipos de eventos.
     * (Criar, Editar, Apagar, Guardar e Cancelar)
     */
    initializeButtons() {
        // Botão "Criar"
        this.#createTypeButton();

        // Botão "Guardar"
        this.#saveTypeButton();

        // Botão "Cancelar"
        this.#cancelTypeButton();

        // Botão "Editar"
        this.#editTypeButton();
        
        // Botão "Apagar"
        this.#deleteTypeButton();
    }
    
    /**
     * Edita um tipo de evento.
     * 
     * @param {EventType} type - tipo de evento a editar
     * @param {string} newDescription - nova descrição do tipo de evento
     * @returns o tipo de evento
     */
    editType(type, newDescription) {
        if (type) {
            type.description = newDescription;
        }
        return type;
    }

    /**
     * Cria a ação do botão para criar um novo tipo de evento.
     */
    #createTypeButton() {
        const createButton = document.getElementById("type-create");

        if (createButton) {
            createButton.addEventListener("click", async () => {
                // Preencher campo ID com o próximo ID disponível
                document.getElementById("eventTypeId").value = await this.getAutoIncrementId();

                const modal = document.getElementById("createEventTypeModal");
                modal?.classList.remove("hidden");
            });
        }
    }

    /**
     * Cria a ação do botão para guardar a criação de um novo tipo de evento.
     * 
     * @returns 
     */
    #saveTypeButton() {
        const saveButton = document.getElementById("saveEventType");

        if (saveButton) {
            saveButton.addEventListener("click", async () => {
                const descriptionInput = document.getElementById("eventTypeDescription");
                const description = descriptionInput.value.trim();

                if (!description) {
                    alert("Por favor, insira uma descrição.");
                    return;
                }

                const id = parseInt(document.getElementById("eventTypeId").value);
                const existingType = await fetchJSON(`/types/${id}`, "GET");

                // Criar ou editar novo tipo de evento e atualizar tabela
                if (existingType.length !== 0) {

                    const editedType = this.editType(existingType[0], description);
                    await fetchJSON(`/types/${id}`, "PUT", editedType);

                } else {
                    const type = new EventType(id, description);
                    await fetchJSON("/types", "POST", type);
                }

                // Fechar modal e limpar campo
                document.getElementById("createEventTypeModal").classList.add("hidden");
                descriptionInput.value = "";

                EventTypeManager.updateTypesTable();
            });
        }
    }

    /**
     * Cria a ação do botão para cancelar a criação de um novo tipo de evento.
     */
    #cancelTypeButton() {
        const cancelButton = document.getElementById("cancelEventType");

        if (cancelButton) {
            cancelButton.addEventListener("click", () => {
                const modal = document.getElementById("createEventTypeModal");
                modal.classList.add("hidden");

                // Limpar campo de descrição
                document.getElementById("eventTypeDescription").value = "";
            });
        }
    }

    /**
     * Cria a ação do botão para editar um tipo de evento.
     * 
     * @returns 
     */
    #editTypeButton() {
        const editButton = document.getElementById("type-edit");

        if (editButton) {
            editButton.addEventListener("click", async () => {

                const selectedType = await this.getSelectedType();
                if(!selectedType) {
                    alert("Erro, tipo de evento selecionado não encontrado.");
                    return;
                }

                const modal = document.getElementById("createEventTypeModal");
                modal.classList.remove("hidden");

                // Preenche o modal com os valores já existentes
                document.getElementById("eventTypeId").value = selectedType[0].id;
                document.getElementById("eventTypeDescription").value = selectedType[0].description;

                // Ajusta o comportamento do botão de guardar para edição
                document.getElementById("saveEventType").onclick = () => {
                    let newDescription = document.getElementById("eventTypeDescription");
                    if (!newDescription) {
                        return;
                    }
                    newDescription = newDescription.value;

                    // Fecha o modal
                    modal.classList.add("hidden");
                };
            });
        }
    }

    /**
     * Cria a ação do botão para apagar um tipo de evento.
     * 
     * @returns 
     */
    #deleteTypeButton() {
        const deleteButton = document.getElementById("type-delete");

        if (deleteButton) {
            deleteButton.addEventListener("click", async () => {

                const selectedType = await this.getSelectedType();
                if(!selectedType) {
                    alert("Erro, tipo de evento selecionado não encontrado.");
                    return;
                }
                
                const selectedID = selectedType[0].id;

                const confirmed = confirm("Tem a certeza que deseja apagar este tipo de evento?");
                if (!confirmed) {return;}

                if (await EventManager.hasEventWithType(selectedID)) {
                    alert("Não pode apagar o Tipo de Evento, pois é utilizado num Evento!");
                    return;
                }

                if (await MemberManager.hasMemberWithFavorite(selectedID)) {
                    alert("Não pode apagar o Tipo de Evento, pois é o favorito de um Membro!");
                    return;
                }


                await fetchJSON(`/types/${selectedID}`, "DELETE");
                EventTypeManager.updateTypesTable();
            });
        }
    }
}

//#endregion

//#region Events

/**
 * Classe EventManager
 * 
 * @class Gestor de Eventos (criar, editar, apagar).
 */
class EventManager extends ElementManager {
    /**
     * @property {Events[]} eventList - Lista de eventos disponíveis
     * @static
     */
    static eventList = [];

    /**
     * @property {number} currentId - Id atual dos eventos
     * @static
     */
    static currentId = 1;

    /**
     * @constructs EventManager
     */
    constructor() {
        super();
        this.init();
    }

    /**
     * Retorna todos os eventos.
     * 
     * @returns um array com todos os eventos
     * @async
     */
    static async getEvents() {
        let events = await fetchJSON("/events/all", "GET");

        for (const event of events) {
            event.type = await EventTypeManager.getTypeById(event.type);
        }

        return events;
    }

    /**
     * Retorna uma lista com os eventos que têm o mesmo tipo que algum dos tipos favoritos recebidos.
     * 
     * @param {Array} typeList - A lista com os tipos favoritos de um membro
     * @returns Um array com os eventos possíveis de se inscrever o membro
     * @static
     * @async
     */
    static async getEventsWithFavoriteTypes(typeList) {
        let events = await fetchJSON("/events/all", "GET") || [];

        let result = events.filter(
            event => typeList.some(type => type.EventType == event.type)
        );

        return result || [];
    }

    /**
     * Cria a lista de tipos de eventos para o modal dos eventos.
     * 
     * @param {Events} event - O evento a editar, ou null por default
     */
    async #createEventsTypeList(event = null) {
        const typesDropDownList = document.getElementById("events-type-list");

        // Lista de tipos a mostrar
        const typeList = await EventTypeManager.getTypes();

        // Elemento placeholder com valor 0
        if (!event) {
            let placeholder = document.createElement("option");
            placeholder.textContent = "Escolha um Tipo: ";
            placeholder.value = 0;
            typesDropDownList.appendChild(placeholder);
        }

        for (const typeOfEvent of typeList) {

            let eventType = document.createElement("option");
            eventType.textContent = typeOfEvent.description;
            eventType.value = typeOfEvent.id;
            
            if (event?.type === typeOfEvent.id) eventType.setAttribute("selected", true);   // "?" para se tiver algo undefined

            typesDropDownList.appendChild(eventType);
        }
    }

    /**
     * Atualiza a tabela com os eventos da base de dados.
     * 
     * @async
     */
    static async updateEventsTable() {
        const events = await EventManager.getEvents();

        if (events) {
            tableManager.updateTable(EventManager, events);
        }
    }

    /**
     * Retorna o evento com o id específicado.
     * 
     * @param {number} eventId - O id do evento a procurar
     * @returns O evento com o id pedido
     * @async
     */
    static async getEventById(eventId) {
        let result = await fetchJSON(`/events/${eventId}`, "GET")
        return result ? result[0] : void 0;
    }

    /**
     * Retorna o número atual do auto_increment dos eventos.
     * 
     * @returns O próximo id para os eventos
     * @async
     */
    async getAutoIncrementId() {
        const result = await fetchJSON("/events/auto-inc", "GET");
        return result[0].AUTO_INCREMENT;
    }

    /**
     * Procura e retorna o evento que está selecionado na tabela.
     * 
     * @returns O evento selecionado
     * @async
     */
    async getSelectedEvent() {
        const selectedID = tableManager.getSelectedElementID();
        let result;

        selectedID > 0
        ? result = await fetchJSON(`/events/${selectedID}`, "GET")
        : alert("Por favor, selecione um evento antes de editar.");

        return result;
    }

    /**
     * Retorna um array com os membros inscritos no evento com o id recebido.
     * 
     * @param {number} eventId - O id do evento a procurar
     * @returns Um array com os membros inscritos no evento
     * @async
     */
    static async getRegisteredMembers(eventId) {
        if (!eventId || isNaN(eventId)) { return; }

        const registeredMembers = await fetchJSON(`/registrations/events/${eventId}`, "GET") || [];
        let result = [];

        for (const reg of registeredMembers) {
            result.push(await EventManager.getMemberById(reg.Member));
        }

        return result;
    }

    /**
     * Retorna um boolean dependendo se houver pelo menos um membro inscrito no evento com o id recebido.
     * 
     * @param {number} eventId - Id do evento a procurar
     * @returns true se houver membros incritos, false caso contrário
     * @async
     */
    static async eventHasMembersRegistered(eventId) {
        const registeredMembers = await this.getRegisteredMembers(eventId);
        return registeredMembers && registeredMembers.some(reg => reg);
    }

    /**
     * Inicializa os botões e a tabela
     */
    init() {
        this.initializeButtons();
        EventManager.updateEventsTable();
    }

    /**
     * Inicializa os botões de ação.
     */
    initializeButtons() {
        this.createButton = document.getElementById("event-create");
        this.saveButton = document.getElementById("save-event");
        this.cancelButton = document.getElementById("cancel-event");
        this.editButton = document.getElementById("event-edit");
        this.deleteButton = document.getElementById("event-delete");

        if (this.createButton && this.editButton && this.deleteButton) {
            this.setActions();
        }
    }

    /**
     * Adiciona as ações ao clicar num dos botões.
     */
    setActions() {
        this.createButton.addEventListener("click", async () => {
            this.openModal();
        });

        this.saveButton.addEventListener("click", async () => {
            this.saveEvent();
        });

        this.cancelButton.addEventListener("click", () => {
            this.closeModal();
        });

        this.editButton.addEventListener("click", async () => {
            this.editSelectedEvent();
        });

        this.deleteButton.addEventListener("click", async () => {
            this.deleteSelectedEvent();
        });
    }

    /**
     * Abre a aba para criar eventos, ou editar caso seja recebido um.
     * 
     * @param {Events} event - O evento a editar
     * @returns 
     */
    async openModal(event = null) {

        const id = document.getElementById("event-id");
        const type = document.getElementsByName("event-type");

        const description = document.getElementById("event-description");
        const date = document.getElementById("event-date");

        if (!id || !type || !description || !date) { return; }

        if (event) {
            id.value = event.id;
            const existingType = await EventTypeManager.getTypeById(event.type);
            type.value = existingType?.description;
            description.value = event.description;
            date.value = dateToString(event.date);
        } else {
            id.value = await this.getAutoIncrementId();
        }

        this.#createEventsTypeList(event);

        document.getElementById("event-modal")?.classList.remove("hidden");
    }

    /**
     * Fecha a aba de criar/editar eventos.
     * 
     * @returns 
     */
    closeModal() {
        const modal = document.getElementById("event-modal");
        if (!modal) {
            return;
        }

        modal.classList.add("hidden");
        document.getElementById("event-description").value = "";
        document.getElementById("event-date").value = "";
        document.getElementById("events-type-list").textContent = ""
    }

    /**
     * Cria um novo evento e adiciona-o à lista.
     * 
     * @param {string} type - O tipo do evento
     * @param {string} description - A descrição do evento
     * @param {Date | string} date - A data do evento
     * @returns 
     * @async
     */
    async createEvent(type, description, date) {
        const eventType = await EventTypeManager.getTypeById(type);
        if (!eventType) {
            alert("Tipo de evento não encontrado.")
            return;
        }

        await fetchJSON("/events", "POST", { "type": eventType.id, "description": description, "date": date });
    }

    /**
     * Edita um evento a partir do seu id.
     * 
     * @param {number} id - O id do evento a editar
     * @param {number} type - O id do novo tipo de evento
     * @param {string} description - A nova descrição do evento
     * @param {Date | string} date - A nova data do evento
     */
    async editEvent(id, type, description, date) {
        const event = await EventManager.getEventById(id);
        if (event) {
            event.type = type;
            event.description = description;
            event.date = date;
        }
        return event;
    }

    /**
     * Edita o evento selecionado.
     * 
     * @returns 
     */
    async editSelectedEvent() {
        const event = await this.getSelectedEvent();
        if (event) this.openModal(event[0]);
    }

    /**
     * Cria um novo evento com os dados inseridos.
     * 
     * @returns 
     */
    async saveEvent() {
        const description = document.getElementById("event-description").value;
        const date = document.getElementById("event-date").value;
        const eventType = document.getElementById("events-type-list").value;

        if (!description || !date || !eventType) {
            alert("Insira parâmetros válidos.");
            return;
        }


        // Verifica se a data é futura
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
        alert("A data do evento deve ser futura.");
        return;
        }


        const eventId = parseInt(document.getElementById("event-id")?.value);
    
        if (await EventManager.getEventById(eventId)) {
            const existingEvent = await this.editEvent(eventId, eventType, description, date);
            await fetchJSON(`/events/${eventId}`, "PUT", existingEvent);
        } else {
            await this.createEvent(eventType, description, date);
        }
    
        this.closeModal();
        EventManager.updateEventsTable();
    }

    /**
     * Apaga um evento a partir do seu id.
     */
    async deleteSelectedEvent() {
        const selectedID = tableManager.getSelectedElementID();
        if (selectedID < 0) {
            alert("Selecione um evento.");
            return;
        }

        if (await EventManager.eventHasMembersRegistered()) {
            alert("Erro, evento tem membros inscritos.");
            return;
        }

        const confirmed = confirm("Deseja mesmo apagar este evento?");
        if (confirmed) {
            await this.deleteEvent(selectedID);
            EventManager.updateEventsTable();
        }
    }

    /**
     * Apaga um evento a partir do seu id.
     * 
     * @param {number} id - O id do evento a apagar
     * @async
     */
    async deleteEvent(id) {
        await fetchJSON(`/events/${id}`, "DELETE");
    }
    
    /**
     * Verifica se algum Evento é do Tipo recebido.
     * 
     * @param {number} typeId - O id do Tipo de Evento a procurar
     * @returns true se existir pelo menos um Evento do Tipo recebido, false caso contrário
     * @static
     * @async
     */
    static async hasEventWithType(typeId) {
        const events = await EventManager.getEvents();
        const receivedType = await EventTypeManager.getTypeById(typeId);
        return events && receivedType && events?.some(e => e.type.id === receivedType.id);
    }
}

//#endregion

//#region Members

/**
 * Classe MemberManager
 * 
 * @class Gestor de Membros (criar, editar, apagar)
 */
class MemberManager extends ElementManager {

    /**
     * @property {CheckboxManager} checkboxManager - Gestor de Checkboxes para a lista de Tipos favoritos
     */
    checkboxManager;

    /**
     * @property {Member[]} memberList - Lista dos membros disponíveis
     * @static
     */
    static memberList = [];

    /**
     * @property {number} currentId - Id atual dos membros
     * @static
     */
    static currentId = 1;

    /**
     * @constructs MemberManager
     * @param {CheckboxManager} checkboxManager - O Gestor para as Checkboxes de Tipos de Eventos
     */
    constructor(checkboxManager) {
        super();
        this.checkboxManager = checkboxManager;
        this.init();
    }

    /**
     * Retorna todos os membros.
     * 
     * @returns um array com todos os membros
     * @async
     */
    static async getMembers() {
        return await fetchJSON("/members/all", "GET");
    }

    /**
     * Atualiza a tabela com os membros da base de dados.
     * 
     * @async
     */
    static async updateMembersTable() {
        const members = await MemberManager.getMembers();

        if (members) {
            tableManager.updateTable(MemberManager, members);
        }
    }

    /**
     * Retorna o membro encontrado com o id recebido.
     * 
     * @param {number} id - O id a procurar
     * @returns Member com o id ou undefined caso não exista
     * @static
     * @async
     */
    static async getMemberById(id) {
        let result = await fetchJSON(`/members/${id}`, "GET");

        return result ? result[0] : void 0;
    }

    /**
     * Retorna o número atual do auto_increment dos membros.
     * 
     * @returns O próximo id para os membros
     * @async
     */
    async getAutoIncrementId() {
        const result = await fetchJSON("/members/auto-inc", "GET");
        return result[0].AUTO_INCREMENT;
    }

    /**
     * Procura e retorna o membro que está selecionado na tabela.
     * 
     * @returns O membro selecionado
     * @async
     */
    async getSelectedMember() {
        const selectedID = tableManager.getSelectedElementID();
        let result;

        selectedID > 0
        ? result = await fetchJSON(`/members/${selectedID}`, "GET")
        : alert("Por favor, selecione um membro antes de editar.");

        return result;
    }

    /**
     * Retorna uma lista com os eventos em que o membro com o id pedido está inscrito.
     * 
     * @param {number} memberId - Id do membro a procurar
     * @returns Um array com os eventos inscritos
     * @async
     */
    async getRegisteredEvents(memberId) {
        if (!memberId || isNaN(memberId)) { return; }

        const registeredEvents = await fetchJSON(`/registrations/${memberId}`, "GET") || [];
        let result = [];

        for (const reg of registeredEvents) {
            result.push(await EventManager.getEventById(reg.Event));
        }

        return result;
    }

    /**
     * Retorna os eventos em que o membro com o id pedido não está inscrito.
     * i.e. A diferença entre todos os eventos e os eventos inscritos.
     * 
     * @param {number} memberId - Id do membro a procurar
     * @returns Um array com os eventos não inscritos
     */
    async getUnregisteredEvents(memberId) {
        const favTypes = await this.getMemberFavoriteTypes(memberId);
        if (!favTypes) { return; }

        const allEvents = await EventManager.getEventsWithFavoriteTypes(favTypes);
        const registered = await this.getRegisteredEvents(memberId);

        let result = allEvents.filter(
            ev => !registered.some(event => event.id === ev.id)
        );

        return result || [];
    }

    /**
     * Retorna se um membro está inscrito num evento.
     * 
     * @param {number} memberId - O id do membro a procurar
     * @param {number} eventId - O id do evento a procurar
     * @returns true se estiver inscrito, false caso contrário
     */
    async memberIsRegisteredInEvent(memberId, eventId) {
        const registeredEvents = await this.getRegisteredEvents(memberId);
        return registeredEvents && registeredEvents.some(reg => reg.id == eventId);
    }

    /**
     * Retorna os tipos favoritos do membro com o id recebido.
     * 
     * @param {number} memberId - O id do membro a procurar
     * @returns Um array com os tipos de eventos favoritos
     * @async
     */
    async getMemberFavoriteTypes(memberId) {
        let result = await fetchJSON(`/favorites/${memberId}`, "GET");
        return result || [];
    }

    /**
     * Verifica se algum membro tem, como favorito, o tipo de evento recebido.
     * 
     * @param {number} typeId - O id do tipo de evento a procurar
     * @returns true se existir pelo menos um membro com o tipo recebido como favorito, false caso contrário
     * @static
     * @async
     */
    static async hasMemberWithFavorite(typeId) {
        const favorites = await fetchJSON(`/favorites/type/${typeId}`, "GET");
        return favorites && favorites.some(f => f.EventType == typeId);
    }

    /**
     * Inicializa os botões e a tabela.
     */
    init() {
        this.createButtons();

        MemberManager.updateMembersTable();
    }

    /**
     * Inicializa as ações dos botões de criar, editar, apagar, guardar e cancelar.
     */
    createButtons() {
        this.#addAction("member-create", "click", async () => this.openModal());
        this.#addAction("save-member", "click", async () => this.saveMember());
        this.#addAction("cancel-member", "click", () => this.closeModal());
        this.#addAction("member-edit", "click", async () => this.editSelectedMember());
        this.#addAction("member-delete", "click", async () => this.deleteSelectedMember());
        this.#addAction("register-event", "click", async () => this.openRegistrationModal(true));
        this.#addAction("unregister-event", "click", async () => this.openRegistrationModal(false));
        this.#addAction("accept-registration", "click", async () => this.#acceptRegistration());
        this.#addAction("cancel-registration", "click", () => this.#cancelRegistration());
    }

    /**
     * Adiciona uma ação a um elemento a partir do seu id.
     * 
     * @param {number} id - O id
     * @param {string} event - A ação a adicionar
     * @param {function} func - A função a executar na ação
     */
    #addAction(id = "", action = "", func) {
        const result = document.getElementById(id);
        if (result && func) {
            result.addEventListener(action, func);
        }
    }

    /**
     * Cria um novo membro com a descrição e tipos de eventos favoritos recebidos.
     * 
     * @param {string} description - A descrição do membro
     * @param {number[]} favoriteTypes - Um array com os ids dos tipos de eventos favoritos do membro
     * @async
     */
    async createMember(description, favoriteTypes = []) {
        let result = await fetchJSON("/members", "POST", { "description": description });

        if (result) {
            const id = result.insertId;
            await this.updateFavoriteTypes(id, favoriteTypes);
        }
    }

    /**
     * Edita um membro do clube a partir de um id.
     * 
     * @param {number} id - O id do membro a editar
     * @param {string} newDescription - O novo nome do membro
     * @param {number[]} newFavoriteEventTypes - Os ids dos novos tipos de eventos preferidos do membro a editar
     * @async
     */
    async editMember(id, newDescription, newFavoriteEventTypes = []) {
        let result = await fetchJSON(`/members/${id}`, "PUT", { "description": newDescription });

        if (result) {
            await this.updateFavoriteTypes(id, newFavoriteEventTypes);
        }
    }

    /**
     * Atualiza os tipos de eventos favoritos de um membro.
     * 
     * @param {number} memberId - O id do membro a atualizar
     * @param {number[]} favoriteTypes - Os novos tipos favoritos do membro
     * @returns 
     * @async
     */
    async updateFavoriteTypes(memberId, favoriteTypes = []) {
        let typeList = await this.getMemberFavoriteTypes(memberId);

        if (!typeList) { return; }

        // Filtra os tipos adicionados
        // i.e. os que estão em favoriteTypes, mas não em typeList
        const addedTypes = favoriteTypes.filter(
            t => !typeList.some(type => type.EventType === t)
        );

        // Filtra os tipos removidos
        // i.e. os que estão em typeList, mas não em favoriteTypes
        const removedTypes = typeList.filter(
            type => !favoriteTypes.some(t => t === type.EventType)
        );

        for (const newType of addedTypes) {
            await fetchJSON("/favorites", "POST", { "member": memberId, "eventType": newType });
        }

        for (const oldType of removedTypes) {
            await fetchJSON("/favorites", "DELETE", { "member": memberId, "eventType": oldType.EventType });
        }
    }

    /**
     * Abre o modal de inscrição em eventos e faz update à lista de eventos
     * dependendo se é para inscrever ou desinscrever.
     * 
     * @param {boolean} register - true se for para inscrever, false caso contrário
     * @async
     */
    async openRegistrationModal(register = true) {
        const title = document.getElementById("registration-title");
        title.textContent = register ? "Inscrever em Evento" : "Desinscrever em Evento";
        
        const modal = document.getElementById("create-member-modal");
        modal?.classList.add("hidden");

        const registrationDiv = document.getElementById("register-member");
        registrationDiv?.classList.remove("hidden");

        await this.#createEventsList(register);
    }

    /**
     * Cria a lista de opções e mostra-a na drop down list de eventos.
     * 
     * @param {boolean} register - true se for para inscrever, false caso contrário
     * @async
     */
    async #createEventsList(register) {
        const eventsDropDownList = document.getElementById("events-list");
        eventsDropDownList.replaceChildren();

        // Lista de eventos a mostrar
        const eventList = await this.#getRegistrationList(register);

        // Elemento placeholder com valor 0
        let placeholder = document.createElement("option");
        placeholder.textContent = "Escolha um Evento: ";
        placeholder.value = 0;
        eventsDropDownList.appendChild(placeholder);

        for (const event of eventList) {
            eventsDropDownList.appendChild(this.#createDropDownOption(event));
        }
    }

    /**
     * Cria uma opção para a drop down list com a descrição do evento recebido.
     * 
     * @param {Events} event - evento para criar a opção
     * @returns um elemento html option com a descrição do evento
     */
    #createDropDownOption(event) {
        let result = document.createElement("option");
        result.textContent = event.description;
        result.value = event.id;
        return result;
    }

    /**
     * Retorna a lista com os eventos a mostrar na drop down list,
     * dependendo se for para inscrever ou desinscrever um membro.
     * 
     * @param {boolean} register - true se for para inscrever, false caso contrário
     * @returns Um array com os eventos a mostrar
     * @async
     */
    async #getRegistrationList(register) {
        let eventList;

        const id = document.getElementById("member-id")?.value;
        
        id && register ?
        eventList = await this.getUnregisteredEvents(id) :
        eventList = await this.getRegisteredEvents(id)

        return eventList || [];
    }

    /**
     * Aceita e cria ou apaga uma inscrição num evento consoante se ela já existe ou não.
     */
    async #acceptRegistration() {
        const eventId = document.getElementById("events-list")?.value;
        const memberId = document.getElementById("member-id")?.value;

        if (!eventId || Number(eventId) === 0 || !memberId) { return; }

        if (await this.memberIsRegisteredInEvent(memberId, eventId)) {
            await fetchJSON("/registrations", "DELETE", { "event": eventId, "member": memberId});
            await this.#createEventsList(false);
        } else {
            await fetchJSON("/registrations", "POST", { "event": eventId, "member": memberId});
            await this.#createEventsList(true);
        }
    }

    /**
     * Esconde o div de inscrição num evento e volta a mostrar o modal de edição.
     */
    #cancelRegistration() {
        const modal = document.getElementById("create-member-modal");
        modal?.classList.remove("hidden");

        const registrationDiv = document.getElementById("register-member");
        registrationDiv?.classList.add("hidden");
    }

    /**
     * Abre a aba de criação ou edição de membro, caso seja recebido um por parâmetro.
     * 
     * @param {Member} member - O membro a editar
     * @returns 
     * @async
     */
    async openModal(member = null) {

        const id = document.getElementById("member-id");
        const description = document.getElementById("member-name");

        if (!id || !description) return;

        this.checkboxManager.updateCheckboxes(await EventTypeManager.getTypes());

        if (member) {
            document.getElementById("modal-register")?.classList.remove("hidden");

            id.value = member.id;
            description.value = member.description;
            await this.checkboxManager.checkFavoriteEventTypes(member.id);

        } else {
            id.value = await this.getAutoIncrementId();
            description.value = "";
        }

        document.getElementById("create-member-modal")?.classList.remove("hidden");
    }

    /**
     * Fecha a aba de criação/edição de um membro.
     * 
     * @returns 
     */
    closeModal() {
        document.getElementById("create-member-modal")?.classList.add("hidden");
        document.getElementById("modal-register")?.classList.add("hidden");
        document.getElementById("member-name").value = "";
        this.checkboxManager.uncheckAllEventTypes();
    }

    /**
     * Cria um novo membro com os dados inseridos. 
     * 
     * @returns 
     * @async
     */
    async saveMember() {
        let description = document.getElementById("member-name");
        if (!description || description.value.trim() === "") {
            alert("Insira um nome válido");
            return;
        }

        description = description.value.trim();

        const checkedTypes = this.checkboxManager.getCheckedEventTypes();
        const id = parseInt(document.getElementById("member-id")?.value, 10); 
    
        if (await MemberManager.getMemberById(id)) {
            const registeredEvents = await this.getRegisteredEvents(id);

            if (!registeredEvents.length == 0 && !registeredEvents.some((e) => checkedTypes.some(t => t == e.type))) {
                alert("Membro está inscrito num evento com esse tipo");
                return;
            }

            await this.editMember(id, description, checkedTypes);
            
        } else {
            await this.createMember(description, checkedTypes);
        }
    
        this.closeModal();
        MemberManager.updateMembersTable();
    }

    /**
     * Edita um membro e abre o modal com a informação dele.
     * 
     * @returns 
     * @async
     */
    async editSelectedMember() {
        const member = await this.getSelectedMember();
        if (member) await this.openModal(member[0]);
    }

    /**
     * Apaga o membro selecionado.
     * 
     * @returns 
     * @async
     */
    async deleteSelectedMember() {
        const selectedID = tableManager.getSelectedElementID();
        if (selectedID < 0) {
            alert("Selecione um membro.");
            return;
        }

        const confirmed = confirm("Deseja mesmo apagar este membro?");
        if (confirmed) {
            await this.deleteMember(selectedID);
            MemberManager.updateMembersTable();
        }
    }

    /**
     * Apaga um membro do clube a partir do seu id.
     * 
     * @param {number} id - O id do membro a apagar
     * @async
     */
    async deleteMember(id) {
        await fetchJSON(`/members/${id}`, "DELETE");
    }
}

//#endregion

//#region Checkboxes

/**
 * Classe CheckboxManager
 * 
 * @class Gestor de Checkboxes para os Tipos de Eventos favoritos
 */
class CheckboxManager {

    /**
     * @property {HTMLElement} checkboxDiv - O Div onde as Checkboxes a gerir estão localizadas
     */
    checkboxDiv;

    /**
     * @constructs CheckboxManager
     * @param {string} divId - O Id do Div onde as Checkboxes estão localizadas
     */
    constructor(divId) {
        this.checkboxDiv = document.getElementById(divId);
    }

    /**
    * Retorna um Array com todos os Elementos 'Checkbox' disponíveis.
    * 
    * @returns Um Array com Checkboxes
    */
    #getCheckboxes() {
        return [...this.checkboxDiv.getElementsByTagName("input")] || [];
    }

    /**
     * Retorna um Array com os Ids dos Tipos de Eventos selecionados nas Checkboxes.
     * 
     * @returns Um Array com os Ids dos Tipos de Eventos
     */
    getCheckedEventTypes() {
        const types = [];
        const checkboxes = this.#getCheckboxes();

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                types.push(parseInt(checkbox.value, 10));
            }
        });

        return types;
    }

    /**
     * Faz com que todas as checkboxes apareçam não selecionadas.
     */
    uncheckAllEventTypes() {
        const checkboxes = this.#getCheckboxes();

        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    }

    /**
     * Seleciona as checkboxes que correspondem aos Tipos de Eventos na lista.
     * 
     * @param {number} memberId - O id do membro a verificar os tipos favoritos
     * @async
     */
    async checkFavoriteEventTypes(memberId) {
        const checkboxes = this.#getCheckboxes();
        let typeList = await fetchJSON(`/favorites/${memberId}`, "GET");

        if (typeList) {
            checkboxes.forEach(checkbox => {
                const type = parseInt(checkbox.value, 10);

                if (typeList.some(t => t.EventType === type)) {
                    checkbox.checked = true;
                }
            });
        }
    }

    /**
     * Atualiza as Checkboxes.
     * 
     * @param {EventType[]} typeList - A lista de Tipos de Eventos para criar Checkboxes
     */
    updateCheckboxes(typeList) {
        this.checkboxDiv.replaceChildren();

        typeList.forEach(type => {
            this.#createCheckbox(type);
        });
    }

    /**
     * Cria uma Checkbox com Label para um Tipo de Evento recebido.
     * 
     * @param {EventType} type - O Tipo de Evento
     */
    #createCheckbox(type) {
        const input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.id = type.description;
        input.name = type.description;
        input.value = type.id;

        const label = document.createElement("label");
        label.htmlFor = type.description;
        label.textContent = type.description;

        this.checkboxDiv.append(input);
        this.checkboxDiv.append(label);
        this.checkboxDiv.append(document.createElement("br"));
    }
}

//#endregion

//#region Tables

/**
 * Classe TableManager
 * 
 * @class Gestor de Tabela (Atualizar, Selecionar)
 */
class TableManager {
    /**
     * @property {ElementManager} elemType - Tipo dos elementos a mostrar na tabela
     */
    elemType;

    /**
     * @property {Array} elemList - Lista dos elementos a mostrar na tabela
     */
    elemList;

    /**
     * @property {number} selectedId - Id selecionado na tabela
     */
    selectedID;

    /**
     * @constructs TableManager
     */
    constructor() {
        this.elemType = null;
        this.elemList = [];
        this.selectedID = -1;
    }

    /**
     * Retorna o corpo da tabela de acordo com o tipo de elemento.
     * 
     * @returns o corpo da tabela
     */
    getTableBody() {
        let tbody;

        switch(this.elemType) {
            case EventTypeManager:
                tbody = document.getElementById("event-type-body");
                break;
            case EventManager:
                tbody = document.getElementById("event-body");
                break;
            case MemberManager:
                tbody = document.getElementById("member-body");
                break;
        }

        return tbody;
    }

    /**
     * Atualiza a tabela para mostar a versão mais atualizada
     * 
     * @param {ElementManager} type 
     * @param {Array} list 
     * @returns 
     */
    updateTable(type, list) {
        if (!type || !list) {return;}

        this.elemType = type;
        this.elemList = list;

        const tbody = this.getTableBody();
        if (!tbody) {return;}

        tbody.replaceChildren()  // Limpa a tabela antes de atualizar
        this.selectedID = -1;

        this.elemList.forEach(elem => {
            const row = this.#addTableRow(elem);

            tbody.appendChild(row);
        });
    }

    /**
     * Cria e retorna uma linha de tabela com os valores de um elemento.
     * 
     * @param element - o elemento para a nova linha da tabela
     * @returns uma nova linha para a tabela
     */
    #addTableRow(element) {
        let result = document.createElement('tr');

        // Array para iterar sobre cada parâmetro
        let elementValues;

        element.type && element.date ?
            elementValues = [element.id, element.type.description, element.description, dateToString(element.date)] :
            elementValues = [element.id, element.description];

        // Adicionar uma coluna na tabela para cada parâmetro do elemento
        elementValues.forEach(parameter => {
            const td = document.createElement('td');
            td.textContent = parameter;
            result.appendChild(td);
        });

        // Ação on-click para selecionar elemento
        result.addEventListener("click", () => {
            this.selectElement(result);
        });

        return result;
    }

    /**
     * Seleciona um elemento da tabela, coloca-o a BOLD e guarda o seu Id.
     * 
     * @param {HTMLTableRowElement} row - Linha da tabela para selecionar
     * @returns
     */
    selectElement(row) {
        const tbody = this.getTableBody();
        if (!tbody) {return;}

        // Apaga o último selecionado
        tbody.querySelectorAll("tr").forEach(r => r.classList.remove("selected"));

        row.classList.add("selected");

        const cells = row.querySelectorAll("td");
        if (cells.length > 0) {
            this.selectedID = parseInt(cells[0].textContent, 10);
        }
    }

    /**
     * Retorna o id do elemento selecionado
     * 
     * @returns o id selecionado
     */
    getSelectedElementID() {
        return this.selectedID;
    }
}

// Gestor de Tabelas
const tableManager = new TableManager();

//#endregion

//#endregion

//#region Help Functions

/**
 * Função para alternar entre páginas.
 */
function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.remove('hidden');
    }
    
    switch(pageId) {
        case "EventType":
            EventTypeManager.updateTypesTable();
            break;
        case "Events":
            EventManager.updateEventsTable();
            break;
        case "Members":
            MemberManager.updateMembersTable();
            break;
    }
}

/**
 * Função para buscar dados em formato JSON a partir de um url.
 * 
 * @param {string} url - para enviar o pedido
 * @param {string} method - método HTTP, default GET
 * @param {Object} body - corpo do pedido
 * @returns O corpo da resposta em formato JSON, ou undefined se ocorrer algum erro
 * @async
 */
async function fetchJSON(url, method = "GET", body) {
    const fetchOptions = {
        method: method,
        mode: "cors",
        headers: { "Accept": "application/json" }
    }

    if (body) {
        fetchOptions.headers["Content-type"] = "application/json";
        fetchOptions.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`http://localhost:8081${url}`, fetchOptions);
        return response.ok ? await response.json() : void 0;
    } catch (error) {
        console.error(error);
        return void 0;
    }
}


/**
* Retorna uma data em string no formato 'YYYY-MM-DD'.
* 
* @param {Date | string} date 
* @returns a data formatada
*/
function dateToString(date) {
   if (!(date instanceof Date)) {
       date = new Date(date);
   }

   const day = date.getDate().toString().padStart(2, '0');
   const month = (date.getMonth() + 1).toString().padStart(2, '0');

   return `${date.getFullYear()}-${month}-${day}`;
}

//#endregion

/**
 * Função chamada quando a página é carregada
 */
window.onload = function () {
    const eventTypeManager = new EventTypeManager();
    const eventManager = new EventManager();
    const memberManager = new MemberManager(new CheckboxManager("member-favorite-event-types"));

    EventManager.updateEventsTable();
}
