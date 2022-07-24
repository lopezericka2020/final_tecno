
import { gql } from '@apollo/client';

const GET_ALLINSCRIPCION = gql`
    {
        getAllInscripcionDetalle {
            id
            inscripcion
            gestion
            alumno
            materia
            docente
            fecha_creacion
            estado
            concurrencia
        }
    }
`;

export {
    GET_ALLINSCRIPCION,
};
