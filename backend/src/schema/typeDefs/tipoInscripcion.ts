
import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql'

export const tipoInscripcion =new GraphQLObjectType( {
    name: 'tipoInscripcion',
    description:"Es un Tipo de Inscripcion",
    fields:() => ( {
        id:     { type: GraphQLID},
        gestion:  { type: GraphQLString},
        fecha_creacion:  { type: GraphQLString},
        estado: { type: GraphQLString},
        concurrencia: { type: GraphQLString},
    } ),
} );
