
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { GET_ALLDOCENTE } from '../../queries/DocenteQueries';

export default function RowDocente( { docente, index } ) {
    const navigate = useNavigate();
    const [ deleteDocente ] = useMutation( gql`
        mutation{
            deleteDocente(
                id: ${docente.id}
            )
        }
    `, {
        variables: { id: docente.id, },
        refetchQueries: [ { query: GET_ALLDOCENTE, } ],
    } );

    return (
        <tr key={index}>
            <td width="30">
                { index + 1 }
            </td>
            <td>
                { docente.ci }
            </td>
            <td>
                { docente.nombre }
            </td>
            <td>
                { docente.apellido_paterno } { docente.apellido_materno }
            </td>
            <td>
                { docente.genero }
            </td>
            <td>
                { docente.estado_civil }
            </td>
            <td>
                { docente.correo_electronico }
            </td>
            <td>
                { docente.concurrencia }
            </td>
            <td>
                <a href="#" className="btn btn-action btn-primary mr-1" 
                    onClick={ (e) => {
                        e.preventDefault();
                        navigate('/docente/edit/' + docente.id)
                    } }
                >
                    Editar
                </a>
                <a href="#" className="btn btn-action btn-danger"
                    onClick={ (e) => {
                        e.preventDefault();
                        Swal.fire( {
                            title: 'Eliminar Docente',
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
                                deleteDocente() . then ( (data) => {
                                    if ( data.data.deleteDocente === true ) {
                                        Swal.fire( {
                                            position: 'top-end',
                                            icon: 'success',
                                            title: 'Docente eliminado exitosamente.',
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
