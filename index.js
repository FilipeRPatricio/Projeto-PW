"use strict";
import express from "express";
import cors from "cors";

/* Tipos de Eventos */
import { readTypes, readTypeWithDescription, typesAutoIncrement } from "./routes/types/read-types.js";
import createType from "./routes/types/create-type.js";
import updateType from "./routes/types/update-type.js";
import deleteType from "./routes/types/delete-type.js";

/* Eventos */
import { readEvents, eventsAutoIncrement } from "./routes/events/read-events.js";

/* Membros */
import { readMembers, membersAutoIncrement } from "./routes/members/read-members.js";
import createMember from "./routes/members/create-member.js";
import updateMember from "./routes/members/update-member.js";
import deleteMember from "./routes/members/delete-member.js";

/* Tipos de Eventos Favoritos */
import { readFavorites, readFavoritesOfMember, readFavoritesWithType } from "./routes/favorite-types/read-favorites.js";
import createFavorite from "./routes/favorite-types/create-favorite.js";
import deleteFavorite from "./routes/favorite-types/delete-favorite.js";

/* Membros Inscritos */
import { readRegistrations, readMemberRegistrations, readEventRegistrations } from "./routes/registration/read-registrations.js";
import createRegistration from "./routes/registration/create-registration.js";
import deleteRegistration from "./routes/registration/delete-registration.js";


const app = express();
const port = 8081;

app.use(cors({ origin: "*" }));              // Permite que o frontend aceda ao backend
app.use(express.json());                     // Processar o json no body


// Routes para os tipos de eventos
app.get("/types/auto-inc", typesAutoIncrement)
app.get("/types/desc/:description", readTypeWithDescription);
app.get("/types/:id?", readTypes);
app.post("/types", createType);
app.put("/types/:id", updateType);
app.delete("/types/:id", deleteType);

// Routes para os eventos
app.get("/events/auto-inc", eventsAutoIncrement);
app.get("/events/:id?", readEvents);

// Routes para os membros
app.get("/members/auto-inc", membersAutoIncrement);
app.get("/members/:id?", readMembers);
app.post("/members", createMember);
app.put("/members/:id", updateMember);
app.delete("members/:id", deleteMember);      // Rever

// Routes para os tipos de eventos favoritos
app.get("/favorites", readFavorites);
app.get("/favorites/:member", readFavoritesOfMember);
app.get("/favorites/type/:type", readFavoritesWithType);
app.post("/favorites", createFavorite);
app.delete("/favorites", deleteFavorite);

// Routes para os membros inscritos em eventos
app.get("/registrations", readRegistrations);
app.get("/registrations/:member", readMemberRegistrations);
app.get("/registrations/event/:event", readEventRegistrations);
app.post("/registrations", createRegistration);
app.delete("/registrations", deleteRegistration);


app.listen(port, () => {
    console.log(`Servidor a correr em http://localhost:${port}`);
});
