
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { GET_ALLINSCRIPCION } from '../../queries/InscripcionQueries';

export default function RowInscripcion( { inscripcion, index } ) {
    const navigate = useNavigate();

    const [ deleteInscripcion ] = useMutation( gql`
        mutation{
            deleteInscripcionDetalle(
                id: ${inscripcion.id}
            )
        }
    `, {
        variables: { id: inscripcion.id, },
        refetchQueries: [ { query: GET_ALLINSCRIPCION, } ],
    } );

    return (
        <tr key={index}>
            <td width="30">
                { index + 1 }
            </td>
            <td>
                { inscripcion.gestion }
            </td>
            <td>
                { inscripcion.alumno }
            </td>
            <td>
                { inscripcion.materia }
            </td>
            <td>
                { inscripcion.docente }
            </td>
            <td>
                { inscripcion.concurrencia }
            </td>
            <td>
                <a href="#" className="btn btn-action btn-primary mr-1"
                    onClick={ (e) => {
                        e.preventDefault();
                        navigate('/inscripcion/edit/' + inscripcion.id)
                    } }
                >
                    Editar
                </a>
                <a href="#" className="btn btn-action btn-danger"
                    onClick={ (e) => {
                        e.preventDefault();
                        Swal.fire( {
                            title: 'Eliminar Inscripción',
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
                                deleteInscripcion() . then ( (data) => {
                                    if ( data.data.deleteInscripcionDetalle === true ) {
                                        Swal.fire( {
                                            position: 'top-end',
                                            icon: 'success',
                                            title: 'Inscripción eliminado exitosamente.',
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
