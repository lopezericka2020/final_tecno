
import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql'

export const tipoInscripcionDetalle =new GraphQLObjectType( {
    name: 'tipoInscripcionDetalle',
    description:"Es un Tipo de Inscripción Detalle",
    fields:() => ( {
        id:     { type: GraphQLID},
        inscripcion: { type: GraphQLString},
        gestion: { type: GraphQLString},
        alumno: { type: GraphQLString},
        materia:  { type: GraphQLString},
        docente:  { type: GraphQLString},
        fecha_creacion:  { type: GraphQLString},
        estado: { type: GraphQLString},
        concurrencia: { type: GraphQLString},
    } ),
} );
