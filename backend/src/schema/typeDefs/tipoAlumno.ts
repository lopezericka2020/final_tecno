
import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql'

export const tipoAlumno = new GraphQLObjectType( {
    name: 'tipoAlumno',
    description:"Es un Tipo de Docente",
    fields:() => ( {
        id: { type: GraphQLID },
        ci: { type: GraphQLString },
        nombre:  { type: GraphQLString },
        apellido_paterno:  { type: GraphQLString },
        apellido_materno:  { type: GraphQLString },
        genero:  { type: GraphQLString },
        correo_electronico:  { type: GraphQLString },
        telefono:  { type: GraphQLString },
        fecha_creacion:  { type: GraphQLString },
        estado: { type: GraphQLString },
        concurrencia: { type: GraphQLString },
    } ),
} );
