
import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';
import { Inscripcion } from '../../entities/Inscripcion';
import { tipoInscripcion } from '../typeDefs/tipoInscripcion';

export const GET_ALL_INSCRIPCION = {
    type:new GraphQLList(tipoInscripcion),
    description:"Trae una lista de todos los datos de la BD  ",
    async resolve(){        
        return await Inscripcion.find();
    },
};

export const GET_INSCRIPCION = {
    type: tipoInscripcion,
    description:"Trae una solo dato con su id ",
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(_: any, args: any) {
      const result = await Inscripcion.findOneBy( { id: args.id, } );
      return result;
    },
};
