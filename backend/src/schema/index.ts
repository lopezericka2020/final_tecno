
import { GraphQLSchema, GraphQLObjectType} from 'graphql';
import { SALUDO } from './Queries/Saludo';

import { GET_ALL_MATERIA, GET_MATERIA } from './Queries/MateriaQueries';
import { CREATE_MATERIA, DELETE_MATERIA, UPDATE_MATERIA } from './Mutations/MateriaMutations';

import { GET_ALL_DOCENTE, GET_DOCENTE } from './Queries/DocenteQueries';
import { CREATE_DOCENTE, DELETE_DOCENTE, UPDATE_DOCENTE } from './Mutations/DocenteMutations';

import { GET_ALL_ALUMNO, GET_ALUMNO } from './Queries/AlumnoQueries';
import { CREATE_ALUMNO, DELETE_ALUMNO, UPDATE_ALUMNO } from './Mutations/AlumnoMutations';

import { GET_ALL_GESTION, GET_ALL_GESTIONINSCRITO, GET_GESTION } from './Queries/GestionQueries';
import { CREATE_GESTION, DELETE_GESTION, UPDATE_GESTION } from './Mutations/GestionMutations';

import { GET_ALL_INSCRIPCION, GET_INSCRIPCION } from './Queries/InscripcionQueries';
import { CREATE_INSCRIPCION, DELETE_INSCRIPCION, UPDATE_INSCRIPCION } from './Mutations/InscripcionMutations';

import { GET_ALL_INSCRIPCIONDETALLE, GET_INSCRIPCIONDETALLE } from './Queries/InscripcionDetalleQueries';
import { CREATE_INSCRIPCIONDETALLE, DELETE_INSCRIPCIONDETALLE, UPDATE_INSCRIPCIONDETALLE } from './Mutations/InscripcionDetalleMutations';

const RootQuery = new GraphQLObjectType( {
    name: 'RootQuery',
    description:"Consultas sobre las personas ",
    fields: {
        saludo: SALUDO,

        getAllMateria: GET_ALL_MATERIA,
        getMateria: GET_MATERIA,

        getAllDocente: GET_ALL_DOCENTE,
        getDocente: GET_DOCENTE,

        getAllAlumno: GET_ALL_ALUMNO,
        getAlumno: GET_ALUMNO,

        getAllGestion: GET_ALL_GESTION,
        getGestion: GET_GESTION,

        getAllInscripcion: GET_ALL_INSCRIPCION,
        getInscripcion: GET_INSCRIPCION,

        getAllInscripcionDetalle: GET_ALL_INSCRIPCIONDETALLE,
        getInscripcionDetalle: GET_INSCRIPCIONDETALLE,

        getAllGestionInscrito: GET_ALL_GESTIONINSCRITO,
    },
} );
const Mutation = new GraphQLObjectType( {
 name :"Mutation",
 fields: {
    createMateria: CREATE_MATERIA,
    deleteMateria: DELETE_MATERIA,
    updateMateria: UPDATE_MATERIA,

    createDocente: CREATE_DOCENTE,
    deleteDocente: DELETE_DOCENTE,
    updateDocente: UPDATE_DOCENTE,

    createAlumno: CREATE_ALUMNO,
    deleteAlumno: DELETE_ALUMNO,
    updateAlumno: UPDATE_ALUMNO,

    createGestion: CREATE_GESTION,
    deleteGestion: DELETE_GESTION,
    updateGestion: UPDATE_GESTION,

    createInscripcion: CREATE_INSCRIPCION,
    deleteInscripcion: DELETE_INSCRIPCION,
    updateInscripcion: UPDATE_INSCRIPCION,

    createInscripcionDetalle: CREATE_INSCRIPCIONDETALLE,
    deleteInscripcionDetalle: DELETE_INSCRIPCIONDETALLE,
    updateInscripcionDetalle: UPDATE_INSCRIPCIONDETALLE,
 },
} );

export const schema = new GraphQLSchema( {
    query: RootQuery,
    mutation: Mutation,
} );