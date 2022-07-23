
import { GraphQLBoolean, GraphQLID, GraphQLInputObjectType, GraphQLString } from "graphql";

import { messageType } from "../typeDefs/message";
import { tipoDocente } from "../typeDefs/tipoDocente";
import { Docente } from "../../entities/Docente";

export const CREATE_DOCENTE = {
    type: tipoDocente,
    description:"Crear un registro en la BD ejemplo .... ",
    args:{
        ci: { type:GraphQLString },
        nombre: { type:GraphQLString },
        apellido_paterno: { type:GraphQLString },
        apellido_materno: { type:GraphQLString },
        direccion: { type:GraphQLString },
        genero: { type:GraphQLString },
        estado_civil: { type:GraphQLString },
        correo_electronico: { type:GraphQLString },
        telefono: { type:GraphQLString },
        fecha_creacion: { type:GraphQLString },
        estado: { type:GraphQLString },
        concurrencia: { type:GraphQLString },
    },
    async resolve(_:any, args: any){
        const{ 
            ci, nombre, apellido_paterno, apellido_materno, 
            direccion, genero, estado_civil, correo_electronico, 
            telefono, fecha_creacion, estado, concurrencia 
        } = args;

        const result = await Docente.insert( {
            ci: ci,
            nombre: nombre,
            apellido_paterno: apellido_paterno,
            apellido_materno: apellido_materno,
            direccion: direccion,
            genero: genero,
            estado_civil: estado_civil,
            correo_electronico: correo_electronico,
            telefono: telefono,
            fecha_creacion: fecha_creacion,
            estado: estado,
            concurrencia: concurrencia,
        } )
       // console.log(result)
        return {...args,id: result.identifiers[0].id};
    },
}
export const DELETE_DOCENTE = {
    type: GraphQLBoolean,
    description:"Elimina un registro de la BD ejemplo .... ",
    args:{
        id: { type: GraphQLID, },
    },
    async resolve(_:any, {id}: any){
        const result =await Docente.delete(id)
        if (result.affected === 1 ) return true;
        return false;
    },
};

export const UPDATE_DOCENTE = {
    type: messageType,
    description:"Modifica un registro ... ",
    args: {
      id: { type: GraphQLID },
      input: {
        type: new GraphQLInputObjectType({
          name: "DocenteInput",
          fields: () => ({
            ci: { type: GraphQLString },
            nombre: { type: GraphQLString },
            apellido_paterno: { type: GraphQLString },
            apellido_materno: { type: GraphQLString },
            direccion: { type: GraphQLString },
            genero: { type: GraphQLString },
            estado_civil: { type: GraphQLString },
            correo_electronico: { type: GraphQLString },
            telefono: { type: GraphQLString },
            estado: { type: GraphQLString },
            concurrencia: { type: GraphQLString },
          }),
        }),
      },
    },
    async resolve(_: any, { id, input }: any) {
      const userFound = await Docente.findOneBy({ id });
      if (!userFound) //throw new Error("User not found");
      return {
        success: false,
        message: "Docente no existe",
      }
      if ( 
        userFound.nombre == input.nombre && 
        userFound.apellido_paterno == input.apellido_paterno &&
        userFound.apellido_materno == input.apellido_materno &&
        userFound.ci == input.ci &&
        userFound.telefono == input.telefono &&
        userFound.genero == input.genero &&
        userFound.estado_civil == input.estado_civil &&
        userFound.correo_electronico == input.correo_electronico &&
        userFound.direccion == input.direccion &&
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
          message: "Docente ya actualizado, favor de regresar y actualizar el listado.",
        };
      }
      input.concurrencia = parseInt(input.concurrencia) + 1;
      const response = await Docente.update({ id }, input);
      if (response.affected === 0) return { message: "No se actualizó..." };
      return {
        success: true,
        message: "Se actualizo correctamente",
      };
    },
  };
