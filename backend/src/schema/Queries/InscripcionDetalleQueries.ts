
import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';
import { InscripcionDetalle } from '../../entities/InscripcionDetalle';
import { tipoInscripcionDetalle } from '../typeDefs/tipoInscripcionDetalle';

export const GET_ALL_INSCRIPCIONDETALLE = {
    type:new GraphQLList(tipoInscripcionDetalle),
    description:"Trae una lista de todos los datos de la BD  ",
    async resolve(){        
        return await InscripcionDetalle.find();
    },
};

export const GET_INSCRIPCIONDETALLE = {
    type: tipoInscripcionDetalle,
    description:"Trae una solo dato con su id ",
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(_: any, args: any) {
      const result = await InscripcionDetalle.findOneBy( { id: args.id, } );
      return result;
    },
};
