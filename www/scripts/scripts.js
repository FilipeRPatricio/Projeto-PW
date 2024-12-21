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



// /**
//  * Classe Member
//  * 
//  * @class Membro do Clube de Ciclismo.
//  */
// class Member {
//     /**
//      * @property {number} id - Identificador único do membro
//      */
//     #id;

//     /**
//      * @property {string} name - Nome do membro
//      */
//     #name;

//     /**
//      * @property {EventType[]} favoriteEventTypes - Tipos de eventos favoritos do membro
//      */
//     #favoriteEventTypes;

//     /**
//      * @property {Events[]} registeredEvents - Eventos em que o membro está inscrito
//      */
//     #registeredEvents;

//     /**
//      * @constructs Member
//      * 
//      * @param {number} id - Identificador único do membro
//      * @param {string} name 
//      */
//     constructor(id, name) {
//         this.#id = id;
//         this.#name = name;
//     }

//     /**
//      * @property {number} id - Identificador único deste membro
//      */
//     get id() {
//         return this.#id;
//     }

//     /**
//      * @property {string} name - Nome deste membro
//      */
//     get name() {
//         return this.#name;
//     }

//     /**
//      * @property {EventType[]} favoriteEventTypes - Tipos de eventos favoritos deste membro
//      */
//     get favoriteEventTypes() {
//         return this.#favoriteEventTypes;
//     }

//     /**
//      * @property {Events[]} registeredEvents - Eventos em que este membro está inscrito
//      */
//     get registeredEvents() {
//         return this.#registeredEvents;
//     }
// }



/**
 * Classe EventTypeManager
 * 
 * @class Gestor de Tipos de Eventos (criar, editar, apagar).
 */
class EventTypeManager {

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
     * @property {number} selectedId - Id selecionado na tabela
     */
    selectedID;

    /**
     * @constructs EventTypeManager
     */
    constructor() {
        this.selectedID = null;        //tipo de evento selecionado inicialmente
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

    // Atualiza a descrição de um tipo de evento na tabela
    // changeDescription(newDescription) {
    //     const table = document.getElementById("member-table");
    //     const tbody = table.getElementsByTagName("tbody");

    //     if (tbody) {
    //         Array.from(tbody.rows).forEach(row => {
    //             const rowId = parseInt(row.getAttribute("data-id"), 10); // ID na linha
    //             if (rowId === this.selectedID) {
    //                 const descriptionCell = row.querySelector(".description-cell");
    //                 if (descriptionCell) {
    //                     descriptionCell.textContent = newDescription;
    //                 }
    //             }
    //         });
    //     }
    // }

     /**
     * Atualiza a tabela com os tipos de eventos.
     */
    updateEventTypeTable() {
        const table = document.getElementById("member-table");

        const tbody = table.querySelector("tbody");
        if (!tbody) {
            return;
        }

        tbody.replaceChildren();

        

        EventTypeManager.typeList.forEach(type => {
            const row = this.#addTableRow(type);

            //Adiciona evento de clique para selecionar uma linha

            row.addEventListener("click", () =>{

                document.querySelectorAll("#member-table tbody tr").forEach(r => r.classList.remove("selected"));
                row.classList.add("selected");

                // atualiza id selecionado
                this.selectedID = type.id;
            })

            tbody.appendChild(row);
        });
    }

    /**
     * Cria e retorna uma linha de tabela com os valores de um tipo de evento.
     * 
     * @param {EventType} type - o tipo de evento para a nova linha da tabela
     * @returns uma nova linha para a tabela de tipos de eventos
     */
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
     * (Criar, Editar, Apagar, Salvar e Cancelar)
     */
    createButtons() {
        // Botão "Criar"
        this.#createTypeButton();

        // Botão "Salvar"
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
     * Cria a ação do botão para salvar a criação de um novo tipo de evento.
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

                this.updateEventTypeTable();
                
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

                // Ajusta o comportamento do botão de salvar para edição
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
                    this.updateEventTypeTable();
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



//--------------------------------------------criar-----------------------------------------------------------------------
    /**
    * cria um novo tipo de evento
    * @param {string} description
    */
    createType(description) {
        const newType = new EventType(EventTypeManager.currentId, description);
        EventTypeManager.typeList.push(newType);
        EventTypeManager.currentId++;
        return newType;
    }

//------------------------------------------apagar----------------------------------------------------------------------------------
    /**
     * @property {Button} deleteButton - Botão para apagar eventos
     * Remove um tipo de evento da lista com base no ID
     */
    deleteEventTypeButton(id) {
        // Verifica se typeList está definido
        if (!EventTypeManager.typeList) {
            console.error("typeList não foi inicializado.");
            return;
        }
        // Filtra a lista para remover o evento com o ID correspondente
        EventTypeManager.typeList = EventTypeManager.typeList.filter(type => type.id !== id);
    
        console.log("Lista após a remoção:", EventTypeManager.typeList);
        this.updateEventTypeTable();
    }
//-------------------------------------------construtor-----------------------------------------------------------------------
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
        });

        this.editButton.addEventListener("click", () => {
            this.editEvent();
        });

        this.deleteButton.addEventListener("click", () => {
            this.deleteEvent();
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
 * representa um membro
 * @class
 */
class Member {
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.favoriteEventTypes = []; //Lista de tipos de eventos favoritos
    }
}



/**
 * @class Gestor de Membros (criar, editar, apagar)
 */
class MemberManager {
    
    static memberList = [];
    static currentId = 1;
    static instance;
    selectedId;

    constructor() {
        if(MemberManager.instance) return MemberManager.instance;

        this.selectedID = null;
        this.init();   //initialize
        MemberManager.instance = this;
    }

    /**
     * inicializa os botões e a tabela
     */

    init() {
        this.createButtons();
        this.updateMemberTable();
    }


    // Adiciona membros a lista
    createMember(name, favoriteEventTypes = []) {
        const newMember = new Member(MemberManager.currentId, name);
        newMember.favoriteEventTypes = favoriteEventTypes;
        MemberManager.memberList.push(newMember);
        MemberManager.currentId++;
    }

    // Atualizar/Editar um membro existente
    editMember(id, newName, newFavoriteEventTypes = []) {
        const member = MemberManager.memberList.find(m => m.id === id);
        if(member) {
            member.name = newName;
            member.favoriteEventTypes = newFavoriteEventTypes;
        }
    }

    // Delete member
    deleteMember(id) {
        MemberManager.memberList = MemberManager.memberList.filter(m => m.id !== id);
    }

    // Botões
    createButtons() {
        this.addEvent("member-create", "click", () => this.openModal());
        this.addEvent("saveMember", "click", () => this.saveMember());
        this.addEvent("cancelMember", "click", () => this.closeModal());
        this.addEvent("member-edit", "click", () => this.editSelectedMember());
        this.addEvent("member-delete", "click", () => this.deleteSelectedMember());
    }

    addEvent(id = "", event = "", func) {
        const result = document.getElementById(id);
        if (result && func) {
            result.addEventListener(event, func);
        }
    }


    openModal(member = null) {
        const modal = document.getElementById("createMemberModal");
        if (!modal) {
            return;
        }

        modal.classList.remove("hidden");

        if (member) {
            document.getElementById("memberId").value = member.id;
            document.getElementById("memberName").value = member.name;
            document.getElementById("memberFavoriteEventTypes").value = 
                member.favoriteEventTypes.map(e => e.description).join(", ");
        } else {
            document.getElementById("memberId").value = MemberManager.currentId;
            document.getElementById("memberName").value = "";
            document.getElementById("memberFavoriteEventTypes").value = "";
        }
    }

    closeModal() {
        const modal = document.getElementById("createMemberModal");
        if (!modal) {
            return;
        }

        modal.classList.add("hidden");
        document.getElementById("memberName").value = "";
        document.getElementById("memberFavoriteEventTypes").values = "";
    }

    saveMember() {
        let name = document.getElementById("memberName");
        if (name) {
            name = name.value.trim();
        }

        let favoriteEventTypes = document.getElementById("memberFavoriteEventTypes");
        if (favoriteEventTypes && EventTypeManager.typeList) {
            favoriteEventTypes = favoriteEventTypes.value
                .split(",")
                .map(desc => EventTypeManager.typeList.find(type => type.description.trim() === desc.trim()))
                .filter(type => type);
        }
    
        if (!name) {
            alert("Insira um nome válido");
            return;
        }
        
        const memberId = document.getElementById("memberId");
        if (!memberId) {
            return;
        }
        const id = parseInt(memberId.value, 10); 
    
        if (MemberManager.memberList.some(m => m.id === id)) {
            this.editMember(id, name, favoriteEventTypes);
        } else {
            this.createMember(name, favoriteEventTypes);
        }
    
        this.closeModal();
        this.updateMemberTable();
    }

    /**
     * Selects a member from the table via on-click
     * 
     * @param {*} tbody 
     * @param {*} row 
     * @returns 
     */
    selectMemberFromTable(tbody, row) {
        if (!tbody) {
            return;
        }

        // Apaga o último selecionado
        tbody.querySelectorAll("tr").forEach(r => r.classList.remove("selected"));
        row.classList.add("selected");

        const cells = row.querySelectorAll("td");
        if (cells.length > 0) {
            this.selectedID = parseInt(cells[0].textContent, 10);
        }
    }

    editSelectedMember() {
        if (this.selectedID === void 0) {
            alert("Selecione um membro.");
            return;
        }

        const member = MemberManager.memberList.find(m => m.id === this.selectedID);
        if (member) this.openModal(member);
    }

    /**
     * Exclui o membro selecionado.
     */
    deleteSelectedMember() {
        if (this.selectedID === void 0) {
            alert("Selecione um membro.");
            return;
        }

        const confirmed = confirm("Deseja mesmo apagar este membro?");
        if (confirmed) {
            this.deleteMember(this.selectedID);
            this.selectedID = null;
            this.updateMemberTable();
        }
    }

    updateMemberTable() {
        const tableBody = document.getElementById("memberTableBody");
        if (!tableBody) {
            return;
        }

        tableBody.replaceChildren();  // Limpa a tabela antes de atualizar
    
        MemberManager.memberList.forEach(member => {
            const row = document.createElement("tr");
            row.setAttribute("data-id", member.id);

            const idCell = document.createElement("td");
            idCell.textContent = member.id;
            row.appendChild(idCell);

            const nameCell = document.createElement("td");
            nameCell.textContent = member.name;
            row.appendChild(nameCell);

            row.addEventListener("click", () => {
                this.selectMemberFromTable(tableBody, row);
            });

            tableBody.appendChild(row);
        });
    }
    
    selectMember(id) {
        this.selectedID = id;
        document.querySelectorAll("tr").forEach(row => row.classList.remove("selected"));
        const selectedRow = document.querySelector(`tr[data-id='${id}']`);
        if (selectedRow) {
            selectedRow.classList.add("selected");
        }
    }
    
}



window.onload = function () {
    // TODO: Change to singleton instances
    const eventTypeManager = new EventTypeManager();
    const eventManager = new EventManager();
    const memberManager = new MemberManager();

    const pageActions = {
        "EventType": () => eventTypeManager.updateEventTypeTable(),
        "Events": () => eventManager.updateEvents(),
        "Members": () => memberManager.updateMemberTable()
    };

    const action = pageActions[document.body.id];
    if(action) {
        action();
    }
}
