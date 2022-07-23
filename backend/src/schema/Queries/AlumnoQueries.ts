
import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';
import { Alumno } from '../../entities/Alumno';
import { tipoAlumno } from '../typeDefs/tipoAlumno';

export const GET_ALL_ALUMNO = {
    type:new GraphQLList(tipoAlumno),
    description:"Trae una lista de todos los datos de la BD  ",
    async resolve(){        
        return await Alumno.find();
    },
};

export const GET_ALUMNO = {
    type: tipoAlumno,
    description:"Trae una solo dato con su id ",
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(_: any, args: any) {
      const result = await Alumno.findOneBy( { id: args.id, } );
      return result;
    },
};
