
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { GET_ALLALUMNO } from '../../queries/AlumnoQueries';

export default function RowAlumno( { alumno, index } ) {
    const navigate = useNavigate();
    
    const [ deleteAlumno ] = useMutation( gql`
        mutation{
            deleteAlumno(
                id: ${alumno.id}
            )
        }
    `, {
        variables: { id: alumno.id, },
        refetchQueries: [ { query: GET_ALLALUMNO, } ],
    } );

    return (
        <tr key={index}>
            <td width="30">
                { index + 1 }
            </td>
            <td>
                { alumno.ci }
            </td>
            <td>
                { alumno.nombre }
            </td>
            <td>
                { alumno.apellido_paterno } { alumno.apellido_materno }
            </td>
            <td>
                { alumno.genero }
            </td>
            <td>
                { alumno.correo_electronico }
            </td>
            <td>
                { alumno.concurrencia }
            </td>
            <td>
                <a href="#" className="btn btn-action btn-primary mr-1"
                    onClick={ (e) => {
                        e.preventDefault();
                        navigate('/alumno/edit/' + alumno.id)
                    } }
                >
                    Editar
                </a>
                <a href="#" className="btn btn-action btn-danger"
                    onClick={ (e) => {
                        e.preventDefault();
                        Swal.fire( {
                            title: 'Eliminar Alumno',
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
                                deleteAlumno() . then ( (data) => {
                                    if ( data.data.deleteAlumno === true ) {
                                        Swal.fire( {
                                            position: 'top-end',
                                            icon: 'success',
                                            title: 'Alumno eliminado exitosamente.',
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
