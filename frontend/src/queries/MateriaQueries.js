
import { gql } from '@apollo/client';

const GET_ALLMATERIA = gql`
    {
        getAllMateria {
            id
            sigla
            nombre
            fecha_creacion
            estado
            concurrencia
        }
    }
`;

export {
    GET_ALLMATERIA,
};
