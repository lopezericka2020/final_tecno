
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { GET_ALLGESTION } from '../../queries/GestionQueries';

export default function RowGestion( { gestion, index } ) {
    const navigate = useNavigate();

    const [ deleteGestion ] = useMutation( gql`
        mutation{
            deleteGestion(
                id: ${gestion.id}
            )
        }
    `, {
        variables: { id: gestion.id, },
        refetchQueries: [ { query: GET_ALLGESTION, } ],
    } );

    return (
        <tr key={index}>
            <td width="30">
                { index + 1 }
            </td>
            <td>
                { gestion.nombre }
            </td>
            <td>
                { gestion.fecha_inicio }
            </td>
            <td>
                { gestion.fecha_fin }
            </td>
            <td>
                { gestion.concurrencia }
            </td>
            <td>
                <a href="#" className="btn btn-action btn-primary mr-1"
                    onClick={ (e) => {
                        e.preventDefault();
                        navigate('/gestion/edit/' + gestion.id)
                    } }
                >
                    Editar
                </a>
                <a href="#" className="btn btn-action btn-danger"
                    onClick={ (e) => {
                        e.preventDefault();
                        Swal.fire( {
                            title: 'Eliminar Gestión',
                            text: 'Estás seguro de eliminar información?.',
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            },
                            inputAttributes: {
                                autocapitalize: 'off'
                            },
                            showCloseButton: true,
                            showCancelButton: true,
                            cancelButtonText: 'Cancelar',
                            cancelButtonColor: '#7066e0',
                            confirmButtonColor: '#dc3741',
                            showLoaderOnConfirm: true,
                            preConfirm: () => {
                                deleteGestion() . then ( (data) => {
                                    if ( data.data.deleteGestion === true ) {
                                        Swal.fire( {
                                            position: 'top-end',
                                            icon: 'success',
                                            title: 'Gestión eliminado exitosamente.',
                                            showConfirmButton: false,
                                            timer: 1500
                                        } );
                                    } else {
                                        Swal.fire( {
                                            position: 'top-end',
                                            icon: 'error',
                                            title: 'Error al eliminar información.',
                                            showConfirmButton: false,
                                            timer: 1500
                                        } );
                                    }
                                    return data;
                                } ) . catch ( (e) => {
                                    console.log(e);
                                } ) . finally ( () => {
                                    console.log('FINISH');
                                } );
                            },
                            allowOutsideClick: () => !Swal.isLoading(),
                        } ) . then ( ( result ) => {
                            console.log(result)
                            if ( result.isConfirmed ) { 
                                console.log(true)
                            }
                        } )
                    } }
                >
                    Eliminar
                </a>
            </td>
        </tr>
    );
};
