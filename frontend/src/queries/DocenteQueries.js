
import { gql } from '@apollo/client';

const GET_ALLDOCENTE = gql`
    {
        getAllDocente {
            id
            nombre
            apellido_paterno
            apellido_materno
            ci
            telefono
            direccion
            genero
            estado_civil
            correo_electronico
            fecha_creacion
            estado
            concurrencia
        }
    }
`;

export {
    GET_ALLDOCENTE,
};
