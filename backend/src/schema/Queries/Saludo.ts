
import {GraphQLNonNull,GraphQLString} from 'graphql'

export const SALUDO = {
    type: GraphQLString,    
    description: "Prueba para saber si el servidor esta respondiendo ejemplo saludo (name:'Edwin') ",
    args: {
      TuNombre: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(_: any, args: any) {
      return `${args.TuNombre} ,el servidor esta funcionando ok`;
    },
};
