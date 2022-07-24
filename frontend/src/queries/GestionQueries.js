
import { gql } from '@apollo/client';

const GET_ALLGESTION = gql`
    {
        getAllGestion {
            id
            nombre
            fecha_inicio
            fecha_fin
            nota
            fecha_creacion
            estado
            concurrencia
        }
    }
`;

export {
    GET_ALLGESTION,
};
