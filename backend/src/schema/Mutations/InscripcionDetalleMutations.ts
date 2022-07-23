
import { GraphQLBoolean, GraphQLID, GraphQLInputObjectType, GraphQLString } from "graphql";

import { messageType } from "../typeDefs/message";
import { InscripcionDetalle } from "../../entities/InscripcionDetalle";
import { tipoInscripcionDetalle } from "../typeDefs/tipoInscripcionDetalle";

export const CREATE_INSCRIPCIONDETALLE = {
    type: tipoInscripcionDetalle,
    description:"Crear un registro en la BD ejemplo .... ",
    args:{
        inscripcion: { type:GraphQLString },
        gestion: { type:GraphQLString },
        alumno: { type:GraphQLString },
        materia: { type:GraphQLString },
        docente: { type:GraphQLString },
        fecha_creacion: { type:GraphQLString },
        estado: { type:GraphQLString },
        concurrencia: { type:GraphQLString },
    },
    async resolve(_:any, args: any){
        const{ inscripcion, gestion, alumno, materia, docente, fecha_creacion, estado, concurrencia }=args;

        const result = await InscripcionDetalle.insert( {
            inscripcion: inscripcion,
            gestion: gestion,
            alumno: alumno,
            materia: materia,
            docente: docente,
            fecha_creacion: fecha_creacion,
            estado: estado,
            concurrencia: concurrencia,
        } )
       // console.log(result)
        return {...args,id: result.identifiers[0].id};
    },
}
export const DELETE_INSCRIPCIONDETALLE = {
    type: GraphQLBoolean,
    description:"Elimina un registro de la BD ejemplo .... ",
    args:{
        id: { type: GraphQLID, },
    },
    async resolve(_:any, {id}: any){
        const result =await InscripcionDetalle.delete(id)
        if (result.affected===1) return true;
        return false;
    },
};

export const UPDATE_INSCRIPCIONDETALLE = {
    type: messageType,
    description:"Modifica un registro ... ",
    args: {
      id: { type: GraphQLID },
      input: {
        type: new GraphQLInputObjectType({
          name: "InscripcionDetalleInput",
          fields: () => ({
            inscripcion: { type: GraphQLString },
            gestion: { type: GraphQLString },
            alumno: { type: GraphQLString },
            materia: { type: GraphQLString },
            docente: { type: GraphQLString },
            estado: { type: GraphQLString },
            concurrencia: { type: GraphQLString },
          }),
        }),
      },
    },
    async resolve(_: any, { id, input }: any) {
      const userFound = await InscripcionDetalle.findOneBy({ id });
      if (!userFound) //throw new Error("User not found");
      return {
        success: false,
        message: "Inscripción no existe",
      }
      if ( 
        userFound.gestion == input.gestion && 
        userFound.alumno == input.alumno &&
        userFound.materia == input.materia &&
        userFound.docente == input.docente &&
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
          message: "Inscripción ya actualizado, favor de regresar y actualizar el listado.",
        };
      }
      input.concurrencia = parseInt(input.concurrencia) + 1;
      const response = await InscripcionDetalle.update({ id }, input);
      if (response.affected === 0) return { message: "No se actualizó..." };
      return {
        success: true,
        message: "Se actualizo correctamente",
      };
    },
  };
