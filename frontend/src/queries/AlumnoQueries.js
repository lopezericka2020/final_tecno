
import { gql } from '@apollo/client';

const GET_ALLALUMNO = gql`
    {
        getAllAlumno {
            id
            nombre
            apellido_paterno
            apellido_materno
            ci
            telefono
            genero
            correo_electronico
            fecha_creacion
            estado
            concurrencia
        }
    }
`;

export {
    GET_ALLALUMNO,
};
