
import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';
import { Materia } from '../../entities/Materia';
import { tipoMateria } from '../typeDefs/tipoMateria';

export const GET_ALL_MATERIA = {
    type:new GraphQLList(tipoMateria),
    description:"Trae una lista de todos los datos de la BD  ",
    async resolve(){        
        return await Materia.find();
    },
};

export const GET_MATERIA = {
    type: tipoMateria,
    description:"Trae una solo dato con su id ",
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(_: any, args: any) {
      const result = await Materia.findOneBy( { id: args.id, } );
      return result;
    },
};
