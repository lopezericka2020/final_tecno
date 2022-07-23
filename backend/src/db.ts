
import { DataSource } from "typeorm";

import { Alumno } from "./entities/Alumno";
import { Docente } from "./entities/Docente";
import { Gestion } from "./entities/Gestion";
import { Inscripcion } from "./entities/Inscripcion";
import { InscripcionDetalle } from "./entities/InscripcionDetalle";
import { Materia } from "./entities/Materia";

export const AppDataSource = new DataSource({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",    
        password: "",
        database: "bdfinaltecnoxyz",
        //entities: ["src/entity/*.js"],
        entities: [ Alumno, Docente, Gestion, Inscripcion, InscripcionDetalle, Materia ],
        logging: true,
        synchronize: true, //true
        ssl: false,
});