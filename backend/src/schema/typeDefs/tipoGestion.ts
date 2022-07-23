
import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql'

export const tipoGestion =new GraphQLObjectType( {
    name: 'tipoGestion',
    description:"Es un Tipo de Gestion",
    fields:() => ( {
        id:     { type: GraphQLID},
        nombre: { type: GraphQLString},
        fecha_inicio: { type: GraphQLString},
        fecha_fin: { type: GraphQLString},
        nota:  { type: GraphQLString},
        fecha_creacion:  { type: GraphQLString},
        estado: { type: GraphQLString},
        concurrencia: { type: GraphQLString},
    } ),
} );

export const tipoGestionInscrito =new GraphQLObjectType( {
    name: 'tipoGestionInscrito',
    description:"Es un Tipo de Gestion",
    fields:() => ( {
        id:     { type: GraphQLID},
        gestion: { type: GraphQLString},
        alumno: { type: GraphQLString},
        materia: { type: GraphQLString},
        docente:  { type: GraphQLString},
        fecha_creacion:  { type: GraphQLString},
        estado: { type: GraphQLString},
        concurrencia: { type: GraphQLString},
    } ),
} );
