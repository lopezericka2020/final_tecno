
import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql'

export const tipoMateria =new GraphQLObjectType( {
    name: 'tipoMateria',
    description:"Es un Tipo de Materia",
    fields:() => ( {
        id:     { type: GraphQLID},
        sigla: { type: GraphQLString},
        nombre:  { type: GraphQLString},
        fecha_creacion:  { type: GraphQLString},
        estado: { type: GraphQLString},
        concurrencia: { type: GraphQLString},
    } ),
} );
