
import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';
import { Gestion } from '../../entities/Gestion';
import { InscripcionDetalle } from '../../entities/InscripcionDetalle';
import { tipoGestion, tipoGestionInscrito } from '../typeDefs/tipoGestion';

export const GET_ALL_GESTION = {
    type:new GraphQLList(tipoGestion),
    description:"Trae una lista de todos los datos de la BD  ",
    async resolve() {        
        return await Gestion.find();
    },
};

export const GET_ALL_GESTIONINSCRITO = {
  type: new GraphQLList(tipoGestionInscrito),
  description:"Trae una lista de todos los datos de la BD",
  async resolve() {        
      return await InscripcionDetalle.find();
  },
};

export const GET_GESTION = {
    type: tipoGestion,
    description:"Trae una solo dato con su id ",
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(_: any, args: any) {
      const result = await Gestion.findOneBy( { id: args.id, } );
      return result;
    },
};
