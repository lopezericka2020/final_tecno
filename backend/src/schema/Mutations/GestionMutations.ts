
import { GraphQLBoolean, GraphQLID, GraphQLInputObjectType, GraphQLString } from "graphql";

import { messageType } from "../typeDefs/message";
import { tipoGestion } from "../typeDefs/tipoGestion";
import { Gestion } from "../../entities/Gestion";

export const CREATE_GESTION = {
    type: tipoGestion,
    description:"Crear un registro en la BD ejemplo .... ",
    args:{
        nombre: { type:GraphQLString },
        fecha_inicio: { type:GraphQLString },
        fecha_fin: { type:GraphQLString },
        nota: { type:GraphQLString },
        fecha_creacion: { type:GraphQLString },
        estado: { type:GraphQLString },
        concurrencia: { type:GraphQLString },
    },
    async resolve(_:any, args: any){
        const{ nombre, fecha_inicio, fecha_fin, nota, fecha_creacion, estado, concurrencia }=args;

        const result = await Gestion.insert( {
            nombre: nombre,
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            nota: nota,
            fecha_creacion: fecha_creacion,
            estado: estado,
            concurrencia: concurrencia,
        } );
        return {...args,id: result.identifiers[0].id};
    },
}
export const DELETE_GESTION = {
    type: GraphQLBoolean,
    description:"Elimina un registro de la BD ejemplo .... ",
    args:{
        id: { type: GraphQLID, },
    },
    async resolve(_:any, {id}: any){
        const result =await Gestion.delete(id)
        if (result.affected===1) return true;
        return false;
    },
};

export const UPDATE_GESTION = {
    type: messageType,
    description:"Modifica un registro ... ",
    args: {
      id: { type: GraphQLID },
      input: {
        type: new GraphQLInputObjectType({
          name: "GestionInput",
          fields: () => ({
            nombre: { type: GraphQLString },
            fecha_inicio: { type: GraphQLString },
            fecha_fin: { type: GraphQLString },
            nota: { type: GraphQLString },
            estado: { type: GraphQLString },
            concurrencia: { type: GraphQLString },
          }),
        }),
      },
    },
    async resolve(_: any, { id, input }: any) {
      const userFound = await Gestion.findOneBy({ id });
      if (!userFound) //throw new Error("User not found");
      return {
        success: false,
        message: "Gestion no existe",
      }
      if ( 
        userFound.nombre == input.nombre && 
        userFound.fecha_inicio == input.fecha_inicio &&
        userFound.fecha_fin == input.fecha_fin &&
        userFound.nota == input.nota &&
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
          message: "Gestión ya actualizado, favor de regresar y actualizar el listado.",
        };
      }
      input.concurrencia = parseInt(input.concurrencia) + 1;
      const response = await Gestion.update({ id }, input);
      if (response.affected === 0) return { message: "No se actualizó..." };
      return {
        success: true,
        message: "Se actualizo correctamente",
      };
    },
  };
