
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { GET_ALLMATERIA } from '../../queries/MateriaQueries';

export default function RowMateria( { materia, index } ) {
    const navigate = useNavigate();

    const [ deleteMateria ] = useMutation( gql`
        mutation{
            deleteMateria(
                id: ${materia.id}
            )
        }
    `, {
        variables: { id: materia.id, },
        refetchQueries: [ { query: GET_ALLMATERIA, } ],
    } );

    return (
        <tr key={index}>
            <td width="30">
                { index + 1 }
            </td>
            <td>
                { materia.sigla }
            </td>
            <td>
                { materia.nombre }
            </td>
            <td>
                { materia.concurrencia }
            </td>
            <td>
                <a href="#" className="btn btn-action btn-primary mr-1"
                    onClick={ (e) => {
                        e.preventDefault();
                        navigate('/materia/edit/' + materia.id)
                    } }
                >
                    Editar
                </a>
                <a href="#" className="btn btn-action btn-danger"
                    onClick={ (e) => {
                        e.preventDefault();
                        Swal.fire( {
                            title: 'Eliminar Materia',
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
                                deleteMateria() . then ( (data) => {
                                    if ( data.data.deleteMateria === true ) {
                                        Swal.fire( {
                                            position: 'top-end',
                                            icon: 'success',
                                            title: 'Materia eliminado exitosamente.',
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
