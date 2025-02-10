"use strict";

/*
    TODO: Drop-down list de tipos de eventos ao criar evento;
    TODO: Inscrever e Desinscrever membro num evento.
    TODO: Mudar forma como os alerts são mostrados para diminuir o nº de clicks
    TODO: Verificações extra: i.e. datas que já passaram, tipos de eventos que já existem
*/

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



/**
 * Classe ElementManager
 * 
 * @class Gestor de Elementos
 */
class ElementManager {}



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
     * Inicializa os botões e a tabela
     */
    init() {
        this.initializeButtons();

        // Valores Default para Testes
        this.createType("BTT");
        this.createType("Track");
        this.createType("BMX");

        tableManager.updateTable(EventTypeManager, EventTypeManager.typeList);
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
    * Cria um novo tipo de evento e adiciona-o à lista.
    * 
    * @param {string} description - Descrição do tipo de evento.
    */
    createType(description){
        const newType = new EventType(EventTypeManager.currentId++, description);
        EventTypeManager.typeList.push(newType);
    }
    
    /**
     * Edita um tipo de evento a partir do seu id.
     * 
     * @param {number} id - 
     * @param {string} newDescription - 
     */
    editType(id, newDescription) {
        const type = EventTypeManager.typeList.find(type => type.id === id);
        if (type) {
            type.description = newDescription;
        }
    }

    /**
     * Cria a ação do botão para criar um novo tipo de evento.
     */
    #createTypeButton() {
        const createButton = document.getElementById("type-create");

        if (createButton) {
            createButton.addEventListener("click", () => {
                const modal = document.getElementById("createEventTypeModal");
                modal.classList.remove("hidden");
        
                // Preencher campo ID com o próximo ID disponível
                document.getElementById("eventTypeId").value = EventTypeManager.currentId;
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
            saveButton.addEventListener("click", () => {
                const descriptionInput = document.getElementById("eventTypeDescription");
                const description = descriptionInput.value.trim();

                if (!description) {
                    alert("Por favor, insira uma descrição.");
                    return;
                }

                const id = parseInt(document.getElementById("eventTypeId").value);

                // Criar novo tipo de evento e atualizar tabela
                if (EventTypeManager.typeList.find(type => type.id === id)) {
                    this.editType(id, description);
                } else {
                    this.createType(description);
                }

                // Fechar modal e limpar campo
                document.getElementById("createEventTypeModal").classList.add("hidden");
                descriptionInput.value = "";

                tableManager.updateTable(EventTypeManager, EventTypeManager.typeList);
                
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
            editButton.addEventListener("click", () => {

                const selectedID = tableManager.getSelectedElementID();
                if (selectedID < 0) {
                    alert("Por favor, selecione um tipo de evento antes de editar.");
                    return;
                }

                const selectedType = EventTypeManager.typeList.find(type => type.id ===  selectedID);
                if(!selectedType) {
                    alert("Erro, tipo de evento selecionado não encontrado.");
                    return;
                }

                const modal = document.getElementById("createEventTypeModal");
                modal.classList.remove("hidden");

                // Preenche o modal com os valores já existentes
                document.getElementById("eventTypeId").value = selectedType.id;
                document.getElementById("eventTypeDescription").value = selectedType.description;

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
            deleteButton.addEventListener("click", () => {

                const selectedID = tableManager.getSelectedElementID();
                if (selectedID < 0) {
                    alert("Selecione um tipo de evento antes de apagar.");
                    return;
                }

                const confirmed = confirm("Tem a certeza que deseja apagar este tipo de evento?");
                if (!confirmed) {return;}

                if (EventManager.hasEventWithType(selectedID)) {
                    alert("Não pode apagar o Tipo de Evento, pois é utilizado num Evento!");
                    return;
                }

                if (MemberManager.hasMemberWithFavorite(selectedID)) {
                    alert("Não pode apagar o Tipo de Evento, pois é o favorito de um Membro!");
                    return;
                }

                EventTypeManager.typeList = EventTypeManager.typeList.filter(type => type.id !== selectedID);
                tableManager.updateTable(EventTypeManager, EventTypeManager.typeList);

            });
        }
    }

    /**
     * Retorna o Tipo de Evento encontrado com o id recebido.
     * 
     * @param {number} id - O id a procurar
     * @returns EventType com o id ou undefined caso não exista
     */
    static getTypeById(id) {
        return EventTypeManager.typeList.find(t => t.id === id);
    }

    /**
     * Retorna o Tipo de Evento encontrado com a descrição recebida.
     * 
     * @param {string} description - A descrição a procurar
     * @returns EventType com a descrição ou undefined caso não exista
     */
    static getTypeByDescription(description) {
        return EventTypeManager.typeList.find(t => t.description === description);
    }
}



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
     * Inicializa os botões e a tabela
     */
    init() {
        this.initializeButtons();

        // Valores Default para Testes
        this.createEvent("BTT", "Mountain Biking", "2025-7-14");
        this.createEvent("Track", "Classic", "2025-5-22");
        this.createEvent("BMX", "Freestyle", "2025-2-13");

        tableManager.updateTable(EventManager, EventManager.eventList);
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
        this.createButton.addEventListener("click", () => {
            this.openModal();
        });

        this.saveButton.addEventListener("click", () => {
            this.saveEvent();
        });

        this.cancelButton.addEventListener("click", () => {
            this.closeModal();
        });

        this.editButton.addEventListener("click", () => {
            this.editSelectedEvent();
        });

        this.deleteButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.deleteSelectedEvent();
        });
    }

    /**
     * Cria um novo evento e adiciona-o à lista.
     * 
     * @param {EventType} type - O tipo do evento
     * @param {string} description - A descrição do evento
     * @param {Date | string} date - A data do evento
     * @returns 
     */
    createEvent(type, description, date) {
        // Encontra o tipo de evento com a mesma descrição
        const eventType = EventTypeManager.typeList.find(t => t.description === type);
        if (!eventType) {
            alert("Tipo de evento não encontrado.")
            return;
        }

        if (!(date instanceof Date)) {
            date = new Date(date);
        }

        EventManager.eventList.push(new Events(EventManager.currentId++, eventType, description, date));
    }

    /**
     * Cria um novo evento com os dados inseridos.
     * 
     * @returns 
     */
    saveEvent() {
        const type = document.getElementById("event-type").value;
        const description = document.getElementById("event-description").value;
        const date = document.getElementById("event-date").value;

        if (!type || !description || !date) {
            alert("Insira parâmetros válidos.");
            return;
        }

        const eventIdString = document.getElementById("event-id");
        if (!eventIdString) {
            return;
        }

        const eventId = parseInt(eventIdString.value);
    
        if (EventManager.eventList.some(event => event.id === eventId)) {
            this.editEvent(eventId, type, description, date);
        } else {
            this.createEvent(type, description, date);
        }
    
        this.closeModal();
        tableManager.updateTable(EventManager, EventManager.eventList);
    }

    /**
     * Edita um evento a partir do seu id.
     * 
     * @param {number} id - O id do evento a editar
     * @param {EventType} type - O novo tipo do evento
     * @param {string} description - A nova descrição do evento
     * @param {Date | string} date - A nova data do evento
     */
    editEvent(id, type, description, date) {
        const event = EventManager.eventList.find(ev => ev.id === id);
        if (event) {
            event.type = type;
            event.description = description;
            event.date = date;
        }
    }

    /**
     * Apaga um evento a partir do seu id.
     * 
     * @param {number} id - O id do evento a apagar
     */
    deleteEvent(id) {
        EventManager.eventList = EventManager.eventList.filter(ev => ev.id !== id);
    }


    /**
     * Abre a aba para criar eventos, ou editar caso seja recebido um.
     * 
     * @param {Events} event - O evento a editar
     * @returns 
     */
    openModal(event = null) {
        const modal = document.getElementById("event-modal");
        if (!modal) {
            return;
        }

        modal.classList.remove("hidden");

        const id = document.getElementById("event-id");
        const type = document.getElementById("event-type");
        const description = document.getElementById("event-description");
        const date = document.getElementById("event-date");

        if (event) {
            id.value = event.id;
            type.value = event.type.description || event.type;
            description.value = event.description;
            date.value = dateToString(event.date);
        } else {
            id.value = EventManager.currentId;
        }
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
        document.getElementById("event-type").value = "";
        document.getElementById("event-description").value = "";
        document.getElementById("event-date").value = "";
    }

    /**
     * Edita o evento selecionado.
     * 
     * @returns 
     */
    editSelectedEvent() {
        const selectedID = tableManager.getSelectedElementID();
        if (selectedID < 0) {
            alert("Selecione um membro.");
            return;
        }

        const event = EventManager.eventList.find(ev => ev.id === selectedID);
        if (event) this.openModal(event);
    }

    /**
     * Apaga o evento selecionado.
     * 
     * @returns 
     */
    async deleteSelectedEvent() {
        const selectedID = tableManager.getSelectedElementID();
        if (selectedID < 0) {
            alert("Selecione um evento.");
            return;
        }

        const confirmed = confirm("Deseja mesmo apagar este evento?");
        if (!confirmed) {return;}

        if (MemberManager.hasMemberInEvent(selectedID)) {
            alert("Não pode apagar o Evento, pois tem Membros inscritos!");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5502/api/events/${selectedID}`, {
                method: "DELETE",
                headers:{"Content-Type": "application/json"}
            });
        
            if(!response.ok) {
                throw new Error("Erro ao apagar evento");
            }

            alert("Evento apagado com sucesso!");
            tableManager.updateTable(EventManager, EventManager.eventList);
        } catch (error) {
            console.error("Erro no frontend:", error);
            alert("Erro ao apagar evento.");
        }
    }

    
    static getEventsWithTypes(...types) {
        return EventManager.eventList.filter(e => types.includes(e.type));
    }

    /**
     * Verifica se algum Evento é do Tipo recebido.
     * 
     * @param {number} typeId - O id do Tipo de Evento a procurar
     * @returns true se existir pelo menos um Evento do Tipo recebido, false caso contrário
     */
    static hasEventWithType(typeId) {
        return EventManager.eventList.some(e => e.type === EventTypeManager.getTypeById(typeId));
    }
}



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
     * Inicializa os botões e a tabela.
     */
    init() {
        this.createButtons();

        // Valores Default para Testes
        this.createMember("Tiago");
        this.createMember("Filipe");
        this.createMember("João");

        tableManager.updateTable(MemberManager, MemberManager.memberList);
    }

    /**
     * Cria um novo membro.
     * 
     * @param {string} description - O nome do membro a criar
     * @param {EventType[]} favoriteEventTypes - Os tipos de eventos preferidos do membro a criar
     */
    createMember(description, favoriteEventTypes = []) {
        // Filtra os tipos de eventos preferidos que são da classe EventType
        const validTypes = favoriteEventTypes.filter(type => type instanceof EventType);

        const newMember = new Member(MemberManager.currentId++, description);
        newMember.favoriteEventTypes = validTypes;

        MemberManager.memberList.push(newMember);
    }

    /**
     * Edita um membro do clube a partir de um id.
     * 
     * @param {number} id - O id do membro a editar
     * @param {string} newdescription - O novo nome do membro
     * @param {EventType[]} newFavoriteEventTypes - Os novos tipos de eventos preferidos do membro a editar
     */
    editMember(id, newdescription, newFavoriteEventTypes = []) {
        const member = MemberManager.memberList.find(m => m.id === id);
        if(member) {
            const validTypes = newFavoriteEventTypes.filter(type => type instanceof EventType);

            member.description = newdescription;
            member.favoriteEventTypes = validTypes;
        }
    }

    /**
     * Apaga um membro do clube a partir de um id.
     * 
     * @param {number} id - O id do membro a apagar
     */
    deleteMember(id) {
        MemberManager.memberList = MemberManager.memberList.filter(m => m.id !== id);
    }

    /**
     * Inicializa as ações dos botões de criar, editar, apagar, guardar e cancelar.
     */
    createButtons() {
        this.#addAction("member-create", "click", () => this.openModal());
        this.#addAction("saveMember", "click", () => this.saveMember());
        this.#addAction("cancelMember", "click", () => this.closeModal());
        this.#addAction("member-edit", "click", () => this.editSelectedMember());
        this.#addAction("member-delete", "click", () => this.deleteSelectedMember());
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
     * Abre a aba de criação ou edição de membro, caso seja recebido um parâmetro.
     * 
     * @param {Member} member - O membro a editar
     * @returns 
     */
    openModal(member = null) {
        const modal = document.getElementById("create-member-modal");
        if (!modal) {
            return;
        }

        const id = document.getElementById("member-id");
        const description = document.getElementById("member-name");

        if (!id || !description) return;

        this.checkboxManager.updateCheckboxes(EventTypeManager.typeList);

        if (member) {
            document.getElementById("modal-register")?.classList.remove("hidden");

            id.value = member.id;
            description.value = member.description;
            this.checkboxManager.checkFavoriteEventTypes(member.favoriteEventTypes);

        } else {
            id.value = MemberManager.currentId;
            description.value = "";
        }

        modal.classList.remove("hidden");
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
     */
    saveMember() {
        let description = document.getElementById("member-name");
        if (!description || description.value.trim() === "") {
            alert("Insira um nome válido");
            return;
        }

        description = description.value.trim();

        const checkedTypes = this.checkboxManager.getCheckedEventTypes();
        const favoriteTypes = [];
        checkedTypes.forEach(type => {
            const typeId = EventTypeManager.getTypeById(type);
            if (typeId !== void 0) {
                favoriteTypes.push(typeId);
            }
        });
        
        const memberId = document.getElementById("member-id");
        if (!memberId) {
            return;
        }
        const id = parseInt(memberId.value, 10); 
    
        if (MemberManager.memberList.some(m => m.id === id)) {
            this.editMember(id, description, favoriteTypes);
        } else {
            this.createMember(description, favoriteTypes);
        }
    
        this.closeModal();
        tableManager.updateTable(MemberManager, MemberManager.memberList);
    }

    /**
     * Edita um membro e abre o modal com a informação dele.
     * 
     * @returns 
     */
    editSelectedMember() {
        const selectedID = tableManager.getSelectedElementID();
        if (selectedID < 0) {
            alert("Selecione um membro.");
            return;
        }

        const member = MemberManager.memberList.find(m => m.id === selectedID);
        if (member) this.openModal(member);
    }

    /**
     * Apaga o membro selecionado.
     * 
     * @returns 
     */
    deleteSelectedMember() {
        const selectedID = tableManager.getSelectedElementID();
        if (selectedID < 0) {
            alert("Selecione um membro.");
            return;
        }

        const confirmed = confirm("Deseja mesmo apagar este membro?");
        if (confirmed) {
            this.deleteMember(selectedID);
            tableManager.updateTable(MemberManager, MemberManager.memberList);
        }
    }

    /**
     * Verifica se um dos membros geridos tem, como favorito, o tipo de evento recebido.
     * 
     * @param {number} type - O id do tipo de evento a procurar
     */
    static hasMemberWithFavorite(type) {
        return MemberManager.memberList.some(m => m.likesThisEventType(type));
    }

    /**
     * Verifica se um dos membros geridos está inscrito no evento recebido.
     * 
     * @param {number} event - O id do evento a procurar
     */
    static hasMemberInEvent(event) {
        return MemberManager.memberList.some(m => m.isRegisteredInEvent(event));
    }
}



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
     * @param {EventType[]} typeList - A lista de Tipos de Eventos a selecionar
     */
    checkFavoriteEventTypes(typeList = []) {
        const checkboxes = this.#getCheckboxes();

        checkboxes.forEach(checkbox => {
            const type = EventTypeManager.getTypeById(parseInt(checkbox.value, 10));

            if (typeList.includes(type)) {
                checkbox.checked = true;
            }
        });
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
        if (type == null || list == null) {return;}

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

        element instanceof Events ?
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

/**
 * Função para alternar entre páginas
 */
function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.remove('hidden');
    }
    
    switch(pageId) {
        case "EventType":
            tableManager.updateTable(EventTypeManager, EventTypeManager.typeList);
            break;
        case "Events":
            tableManager.updateTable(EventManager, EventManager.eventList);
            break;
        case "Members":
            tableManager.updateTable(MemberManager, MemberManager.memberList);
            break;
    }
}

/**
* Retorna uma data em string no formato 'YYYY-MM-DD'.
* 
* @param {Date | string} date 
* @returns 
*/
function dateToString(date) {
   if (!(date instanceof Date)) {
       date = new Date(date);
   }

   const day = date.getDate().toString().padStart(2, '0');
   const month = (date.getMonth() + 1).toString().padStart(2, '0');

   return `${date.getFullYear()}-${month}-${day}`;
}

/**
 * Função chamada quando a página é carregada
 */
window.onload = function () {
    const eventTypeManager = new EventTypeManager();
    const eventManager = new EventManager();
    const memberManager = new MemberManager(new CheckboxManager("member-favorite-event-types"));
}
