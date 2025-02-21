Create Database ESTSBike;
Use ESTSBike;

-- Utilizador
Create User if not exists PW Identified by 'PW@123';
Grant ALL PRIVILEGES on ESTSBike.* to PW;

-- Drop de Tabelas
-- Comentado para segurança
/*
	drop table if exists Registration;
    drop table if exists FavoriteType;
    drop table if exists Member;
    drop table if exists Event;
    drop table if exists EventType;
*/

-- Tabela Tipo de Evento
Create Table EventType (
	ID int not null AUTO_INCREMENT,
    Description varchar(100) unique not null,
    Primary key (ID)
);

-- Tabela Evento
Create Table Event (
	ID int not null AUTO_INCREMENT,
    Type int not null,
    Description varchar(100) not null,
    Date date not null,
    Primary key (ID),
    Foreign Key (Type) references EventType(ID) on delete restrict
);

-- Tabela Membro
Create Table Member (
	ID int not null AUTO_INCREMENT,
    Description varchar(100) not null,
    Primary key (ID)
);

-- Tabela Tipos Favoritos
-- Representa os Tipos de Evento Favoritos de um Membro
Create Table FavoriteType (
    Member int not null,
    EventType int not null,
    Primary Key (Member, EventType),
    Foreign Key (Member) references Member(ID) on delete cascade,
    Foreign Key (EventType) references EventType(ID) on delete restrict
);

-- Tabela Inscrição
-- Representa a Inscrição de um Membro num Evento
Create Table Registration (
	Event int not null,
    Member int not null,
    Primary Key (Event, Member),
    Foreign Key (Event) references Event(ID) on delete restrict,
    Foreign Key (Member) references Member(ID) on delete cascade
);

-- Índices
Create index index_event_types on EventType (ID);
Create index index_types_description on EventType (Description);
Create index index_event on Event (ID);
Create index index_event_type on Event (Type);
Create index index_member on Member (ID);
Create index index_favorite_types on FavoriteType (Member, EventType);
Create index index_registrations on Registration (Event, Member);



-- Valores para Teste
Insert into EventType (Description) values ("BTT");
Insert into EventType (Description) values ("Track");
Insert into EventType (Description) values ("BMX");

Insert into Event (Type, Description, Date) values (1, "Mountain Biking", "2025-7-14");
Insert into Event (Type, Description, Date) values (2, "Classic", "2025-5-22");
Insert into Event (Type, Description, Date) values (3, "Freestyle", "2025-2-13");

Insert into Member (Description) values ("Tiago");
Insert into Member (Description) values ("Filipe");
Insert into Member (Description) values ("João");

Insert into FavoriteType (Member, EventType) values (1, 1);
Insert into FavoriteType (Member, EventType) values (1, 2);
Insert into FavoriteType (Member, EventType) values (3, 3);

Insert into Registration (Event, Member) values (1, 1);
Insert into Registration (Event, Member) values (2, 1);
Insert into Registration (Event, Member) values (3, 3);

set global information_schema_stats_expiry = 0;
