
import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';
import { Docente } from '../../entities/Docente';
import { tipoDocente } from '../typeDefs/tipoDocente';

export const GET_ALL_DOCENTE = {
    type:new GraphQLList(tipoDocente),
    description:"Trae una lista de todos los datos de la BD  ",
    async resolve(){        
        return await Docente.find();
    },
};

export const GET_DOCENTE = {
    type: tipoDocente,
    description:"Trae una solo dato con su id ",
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(_: any, args: any) {
      const result = await Docente.findOneBy( { id: args.id, } );
      return result;
    },
};
