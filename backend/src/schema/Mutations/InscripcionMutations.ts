
import { GraphQLBoolean, GraphQLID, GraphQLInputObjectType, GraphQLString } from "graphql";

import { messageType } from "../typeDefs/message";
import { Inscripcion } from '../../entities/Inscripcion';
import { tipoInscripcion } from "../typeDefs/tipoInscripcion";

export const CREATE_INSCRIPCION = {
    type: tipoInscripcion,
    description:"Crear un registro en la BD ejemplo .... ",
    args:{
        gestion: { type:GraphQLString },
        fecha_creacion: { type:GraphQLString },
        estado: { type:GraphQLString },
        concurrencia: { type:GraphQLString },
    },
    async resolve(_:any, args: any){
        const{ gestion, fecha_creacion, estado, concurrencia }=args;

        const result = await Inscripcion.insert( {
            gestion: gestion,
            fecha_creacion: fecha_creacion,
            estado: estado,
            concurrencia: concurrencia,
        } )
       // console.log(result)
        return {...args,id: result.identifiers[0].id};
    },
}
export const DELETE_INSCRIPCION = {
    type: GraphQLBoolean,
    description:"Elimina un registro de la BD ejemplo .... ",
    args:{
        id: { type: GraphQLID, },
    },
    async resolve(_:any, {id}: any){
        const result =await Inscripcion.delete(id)
        if (result.affected===1) return true;
        return false;
    },
};

export const UPDATE_INSCRIPCION = {
    type: messageType,
    description:"Modifica un registro ... ",
    args: {
      id: { type: GraphQLID },
      input: {
        type: new GraphQLInputObjectType({
          name: "InscripcionInput",
          fields: () => ({
            gestion: { type: GraphQLString },
            estado: { type: GraphQLString },
            concurrencia: { type: GraphQLString },
          }),
        }),
      },
    },
    async resolve(_: any, { id, input }: any) {
      const userFound = await Inscripcion.findOneBy({ id });
      if (!userFound) //throw new Error("User not found");
      return {
        success: false,
        message: "Gestión no existe",
      }
      const response = await Inscripcion.update({ id }, input);
  
      if (response.affected === 0) return { message: "No se actualizó..." };
 
      return {
        success: true,
        message: "Se actualizo correctamente",
      };
    },
  };
