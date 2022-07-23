
import { GraphQLBoolean, GraphQLID, GraphQLInputObjectType, GraphQLString } from "graphql";

import { messageType } from "../typeDefs/message";
import { Materia } from '../../entities/Materia';
import { tipoMateria } from '../typeDefs/tipoMateria';

export const CREATE_MATERIA = {
    type: tipoMateria,
    description:"Crear un registro en la BD ejemplo .... ",
    args:{
        sigla: { type:GraphQLString },
        nombre: { type:GraphQLString },
        fecha_creacion: { type:GraphQLString },
        estado: { type:GraphQLString },
        concurrencia: { type:GraphQLString },
    },
    async resolve(_:any, args: any){
        const{ sigla, nombre, fecha_creacion, estado, concurrencia }=args;

        const result = await Materia.insert( {
            sigla: sigla,
            nombre: nombre,
            fecha_creacion: fecha_creacion,
            estado: estado,
            concurrencia: concurrencia,
        } )
       // console.log(result)
        return {...args,id: result.identifiers[0].id};
    },
}
export const DELETE_MATERIA = {
    type: GraphQLBoolean,
    description:"Elimina un registro de la BD ejemplo .... ",
    args:{
        id: { type: GraphQLID, },
    },
    async resolve(_:any, {id}: any){
        const result =await Materia.delete(id)
        if (result.affected===1) return true;
        return false;
    },
};

export const UPDATE_MATERIA = {
    type: messageType,
    description:"Modifica un registro ... ",
    args: {
      id: { type: GraphQLID },
      input: {
        type: new GraphQLInputObjectType({
          name: "MateriaInput",
          fields: () => ({
            sigla: { type: GraphQLString },
            nombre: { type: GraphQLString },
            estado: { type: GraphQLString },
            concurrencia: { type: GraphQLString },
          }),
        }),
      },
    },
    async resolve(_: any, { id, input }: any) {
      const userFound = await Materia.findOneBy({ id });
      if (!userFound) //throw new Error("User not found");
      return {
        success: false,
        message: "Materia no existe",
      }

      if ( 
        userFound.sigla == input.sigla && 
        userFound.nombre == input.nombre &&
        userFound.estado == input.estado
      ) {
        return {
          success: true,
          message: "Se actualizo correctamente",
        };
      }

      if ( userFound.concurrencia != input.concurrencia ) {
        return {
          success: false,
          message: "Materia ya actualizado, favor de regresar y actualizar el listado.",
        };
      }

      input.concurrencia = parseInt(input.concurrencia) + 1;

      const response = await Materia.update({ id }, input);
  
      if (response.affected === 0) return { message: "No se actualizó..." };
 
      return {
        success: true,
        message: "Se actualizo correctamente",
      };
    },
  };
