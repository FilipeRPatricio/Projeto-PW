"use strict";



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
     * @property {EventType | string} type - Tipo de evento
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
     * @param {EventType | string} type - O tipo de evento para o evento
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
     * @property {EventType[] | string[]} favoriteEventTypes - Tipos de eventos favoritos do membro
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
    }
}



/**
 * 
 */
class ElementManager {}


/**
 * Classe EventTypeManager
 * 
 * @class Gestor de Tipos de Eventos (criar, editar, apagar).
 */
class EventTypeManager extends ElementManager {

    /**
     * @property {EventType[] | string[]} typeList - Lista de tipos de eventos
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
        this.createButtons();
    }

    /**
    * Cria um novo tipo de evento e adiciona-o à lista.
    * 
    * @param {string} description - Descrição do tipo de evento.
    */
    createType(description){
        const newType = new EventType(EventTypeManager.currentId, description);
        EventTypeManager.typeList.push(newType);
        EventTypeManager.currentId++;
        return newType; 
    }
    
    /**
     * 
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
     * Cria as ações do botões de gerenciamento de tipos de eventos.
     * (Criar, Editar, Apagar, Guardar e Cancelar)
     */
    createButtons() {
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
                if(this.selectedID === void 0) {
                    alert("Por favor, selecione um tipo de evento antes de editar.");
                    return;
                }

                const selectedType = EventTypeManager.typeList.find(type => type.id ===  this.selectedID);
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

                if(!this.selectedID) {
                    alert("Tem que selecionar um tipo de evento antes de apagar.");
                    return;
                }

                const confirmed = confirm("Tem a certeza que deseja apagar este tipo de evento?");
                
                if(confirmed){
                    EventTypeManager.typeList = EventTypeManager.typeList.filter(type => type.id !== this.selectedID);
                    this.selectedID = null;
                    tableManager.updateTable(EventTypeManager, EventTypeManager.typeList);
                }
            });
        }
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
        this.initializeButtons();
    }



    /**
     * Inicializa os botões de ação.
     */
    initializeButtons() {
        this.createButton = document.getElementById("Criar");
        this.saveButton = document.getElementById("save-event");
        this.cancelButton = document.getElementById("cancel-event");
        this.editButton = document.getElementById("Editar");
        this.deleteButton = document.getElementById("Apagar");

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
            this.editSelectedMember();
        });

        this.deleteButton.addEventListener("click", () => {
            this.deleteSelectedMember();
        });
    }



    /**
     * 
     * @param {Date | string} date 
     * @returns 
     */
    dateToString(date) {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }

        let result = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        return result;
    }



    /**
     * Cria um novo evento e adiciona-o à lista.
     */
    createEvent(type, description, date) {
        EventManager.eventList.push(new Events(EventManager.currentId++, type, description, date));
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
        if(event) {


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
            date.value = event.date;
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
    editSelectedMember() {
        if (!this.selectedID) {
            alert("Selecione um membro.");
            return;
        }

        const event = EventManager.eventList.find(ev => ev.id === this.selectedID);
        if (event) this.openModal(event);
    }

    /**
     * Apaga o evento selecionado.
     * 
     * @returns 
     */
    deleteSelectedMember() {
        if (!this.selectedID) {
            alert("Selecione um evento.");
            return;
        }

        const confirmed = confirm("Deseja mesmo apagar este evento?");
        if (confirmed) {
            this.deleteEvent(this.selectedID);
            this.selectedID = null;
            tableManager.updateTable(EventManager, EventManager.eventList);
        }
    }
}



/**
 * Classe MemberManager
 * 
 * @class Gestor de Membros (criar, editar, apagar)
 */
class MemberManager extends ElementManager {

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
     */
    constructor() {
        super();
        this.init();
    }



    /**
     * Inicializa os botões e a tabela.
     */
    init() {
        this.createButtons();
        tableManager.updateTable(MemberManager, MemberManager.memberList);
    }

    /**
     * Cria um novo membro.
     * 
     * @param {string} description - O nome do membro a criar
     * @param {EventType[] | string[]} favoriteEventTypes - Os tipos de eventos preferidos do membro a criar
     */
    createMember(description, favoriteEventTypes = []) {
        const newMember = new Member(MemberManager.currentId, description);
        newMember.favoriteEventTypes = favoriteEventTypes;
        MemberManager.memberList.push(newMember);
        MemberManager.currentId++;
    }

    /**
     * Edita um membro do clube a partir de um id.
     * 
     * @param {number} id - O id do membro a editar
     * @param {string} newdescription - O novo nome do membro
     * @param {EventType[] | string[]} newFavoriteEventTypes - Os novos tipos de eventos preferidos do membro a editar
     */
    editMember(id, newdescription, newFavoriteEventTypes = []) {
        const member = MemberManager.memberList.find(m => m.id === id);
        if(member) {
            member.description = newdescription;
            member.favoriteEventTypes = newFavoriteEventTypes;
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
     * @param {Member} member - o membro a editar
     * @returns 
     */
    openModal(member = null) {
        const modal = document.getElementById("createMemberModal");
        if (!modal) {
            return;
        }

        modal.classList.remove("hidden");

        const id = document.getElementById("memberId");
        const description = document.getElementById("memberName");
        const favTypes = document.getElementById("memberFavoriteEventTypes");

        if (member) {
            id.value = member.id;
            description.value = member.description;
            favTypes.value = member.favoriteEventTypes.map(e => e.description).join(", ");
        } else {
            id.value = MemberManager.currentId;
            description.value = "";
            favTypes.value = "";
        }
    }

    /**
     * Fecha a aba de criação/edição de um membro.
     * 
     * @returns 
     */
    closeModal() {
        const modal = document.getElementById("createMemberModal");
        if (!modal) {
            return;
        }

        modal.classList.add("hidden");
        document.getElementById("memberName").value = "";
        document.getElementById("memberFavoriteEventTypes").value = "";
    }

    /**
     * Cria um novo membro com os dados inseridos. 
     * 
     * @returns 
     */
    saveMember() {
        let description = document.getElementById("memberName");
        if (!description) {
            alert("Insira um nome válido");
            return;
        }

        description = description.value.trim();

        let favoriteEventTypes = document.getElementById("memberFavoriteEventTypes");
        if (favoriteEventTypes && EventTypeManager.typeList) {
            favoriteEventTypes = favoriteEventTypes.value
                .split(",")
                .map(desc => EventTypeManager.typeList.find(type => type.description.trim() === desc.trim()))
                .filter(type => type);
        }
        
        const memberId = document.getElementById("memberId");
        if (!memberId) {
            return;
        }
        const id = parseInt(memberId.value, 10); 
    
        if (MemberManager.memberList.some(m => m.id === id)) {
            this.editMember(id, description, favoriteEventTypes);
        } else {
            this.createMember(description, favoriteEventTypes);
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
        if (this.selectedID === null) {
            alert("Selecione um membro.");
            return;
        }

        const member = MemberManager.memberList.find(m => m.id === this.selectedID);
        if (member) this.openModal(member);
    }

    /**
     * Apaga o membro selecionado.
     * 
     * @returns 
     */
    deleteSelectedMember() {
        if (this.selectedID === null) {
            alert("Selecione um membro.");
            return;
        }

        const confirmed = confirm("Deseja mesmo apagar este membro?");
        if (confirmed) {
            this.deleteMember(this.selectedID);
            this.selectedID = null;
            tableManager.updateTable(MemberManager, MemberManager.memberList);
        }
    }
}



/**
 * 
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
            elementValues = [element.id, element.type, element.description, element.date] :
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
 * Função chamada quando a página é carregada
 */
window.onload = function () {
    const eventTypeManager = new EventTypeManager();
    const eventManager = new EventManager();
    const memberManager = new MemberManager();
}
