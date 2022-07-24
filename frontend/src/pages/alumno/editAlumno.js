
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gql, useMutation, useQuery } from "@apollo/client";
import toastr from 'toastr';
import { GET_ALLALUMNO } from '../../queries/AlumnoQueries';

export default function EditAlumno(props) {
    const navigate = useNavigate();
    const params = useParams();

    const [nombre, setNombre] = React.useState('');
    const [apellidoPaterno, setApellidoPaterno] = React.useState('');
    const [apellidoMaterno, setApellidoMaterno] = React.useState('');
    const [ci, setCi] = React.useState('');
    const [telefono, setTelefono] = React.useState('');
    const [genero, setGenero] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [concurrencia, setConcurrencia] = React.useState(null);
    const [estado, setEstado] = React.useState(true);

    const getAlumno = useQuery(
        gql`
            {
                getAlumno( id: "${params.idalumno}" ) {
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
        `
    );

    React.useEffect( () => {
        if ( !getAlumno.loading ) {
            if ( getAlumno.data ) {
                if ( getAlumno.data.getAlumno ) {
                    setNombre(getAlumno.data.getAlumno.nombre);
                    setApellidoPaterno(getAlumno.data.getAlumno.apellido_paterno);
                    setApellidoMaterno(getAlumno.data.getAlumno.apellido_materno);
                    setCi(getAlumno.data.getAlumno.ci);
                    setTelefono(getAlumno.data.getAlumno.telefono);
                    setGenero(getAlumno.data.getAlumno.genero);
                    setEmail(getAlumno.data.getAlumno.correo_electronico);
                    setConcurrencia(getAlumno.data.getAlumno.concurrencia);
                    setEstado(getAlumno.data.getAlumno.estado === "true" ? true : false);
                }
            }
        }
    }, [ getAlumno ] );

    const [ updateAlumno ] = useMutation( gql`
        mutation {
            updateAlumno (
                id: "${params.idalumno}"
                input: {
                    nombre: "${nombre}",
                    apellido_paterno: "${apellidoPaterno}",
                    apellido_materno: "${apellidoMaterno}",
                    ci: "${ci}",
                    telefono: "${telefono}",
                    genero: "${genero}",
                    correo_electronico: "${email}",
                    estado: "${estado}",
                    concurrencia: "${concurrencia}"
                }
            )
            {
                message
                success
            }
        }
    `, {
        variables: { },
        refetchQueries: [ { query: GET_ALLALUMNO, } ],
    } );

    function onBack(e) {
        e.preventDefault();
        navigate('/alumno/index');
    }

    function onSubmitStore(e) {
        e.preventDefault();
        if ( nombre.toString().trim().length === 0 ) {
            toastr.warning( 'No se permite campo vacio.', 'Campo Nombre', { closeButton: true, progressBar: true, } );
            return;
        }
        if ( apellidoPaterno.toString().trim().length === 0 ) {
            toastr.warning( 'No se permite campo vacio.', 'Campo Apellido Paterno', { closeButton: true, progressBar: true, } );
            return;
        }
        if ( apellidoMaterno.toString().trim().length === 0 ) {
            toastr.warning( 'No se permite campo vacio.', 'Campo Apellido Materno', { closeButton: true, progressBar: true, } );
            return;
        }
        if ( ci.toString().trim().length === 0 ) {
            toastr.warning( 'No se permite campo vacio.', 'Campo CI', { closeButton: true, progressBar: true, } );
            return;
        }
        if ( telefono.toString().trim().length === 0 ) {
            toastr.warning( 'No se permite campo vacio.', 'Campo Teléfono', { closeButton: true, progressBar: true, } );
            return;
        }
        if ( genero.toString().trim().length === 0 ) {
            toastr.warning( 'No se permite campo vacio.', 'Campo Genéro', { closeButton: true, progressBar: true, } );
            return;
        }
        if ( email.toString().trim().length === 0 ) {
            toastr.warning( 'No se permite campo vacio.', 'Campo Email', { closeButton: true, progressBar: true, } );
            return;
        }
        updateAlumno().then( (data) => {
            if ( data.data.updateAlumno ) {
                if ( data.data.updateAlumno.success === true ) {
                    navigate('/alumno/index');
                } else {
                    toastr.error( data.data.updateAlumno.message, 'Error al actualizar', { closeButton: true, progressBar: true, } );
                }
            }
        } ). catch ( (e) => {
            console.log(e);
        } ) . finally ( () => {
            console.log('Finish')
        } );
    }

    if ( getAlumno.loading ) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role={"status"}>
                    <span className="sr-only">
                        
                    </span>
                </div>
            </div>
        );
    };

    if ( getAlumno.error ) {
        return (
            <p>Algo salió mal, intentar nuevamente...</p>
        );
    }

    return (
        <div className="main-content">
            <section className="section">
                <h1 className="section-header">
                    <div>
                        Editar Alumno
                    </div>
                    <div className="float-right">
                        <button className="btn btn-sm btn-primary" onClick={onBack}>
                            Atras
                        </button>
                    </div>
                </h1>
                <div className="row">
                    <div className="col-12">
                        <div className="card card-primary">
                            <div className="card-header"><h4>Registrar</h4></div>

                            <div className="card-body">
                                <form method="POST" onSubmit={onSubmitStore}>
                                    <div className="row">
                                        <div className="form-group col-12">
                                            <label htmlFor="nombre_docente">Nombre</label>
                                            <input id="nombre_docente" type="text" className="form-control" 
                                                value={nombre}
                                                onChange={ (e) => setNombre(e.target.value) }
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group col-6">
                                            <label htmlFor="apellidopaterno_docente">Apellido Paterno</label>
                                            <input id="apellidopaterno_docente" type="text" className="form-control" 
                                                value={apellidoPaterno}
                                                onChange={ (e) => setApellidoPaterno(e.target.value) }
                                            />
                                        </div>
                                        <div className="form-group col-6">
                                            <label htmlFor="apellidomaterno_docente">Apellido Materno</label>
                                            <input id="apellidomaterno_docente" type="text" className="form-control" 
                                                value={apellidoMaterno}
                                                onChange={ (e) => setApellidoMaterno(e.target.value) }
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group col-4">
                                            <label htmlFor="ci_docente">Ci</label>
                                            <input id="ci_docente" type="text" className="form-control" 
                                                value={ci}
                                                onChange={ (e) => setCi(e.target.value) }
                                            />
                                        </div>
                                        <div className="form-group col-4">
                                            <label htmlFor="telefono_docente">Teléfono</label>
                                            <input id="telefono_docente" type="text" className="form-control" 
                                                value={telefono}
                                                onChange={ (e) => setTelefono(e.target.value) }
                                            />
                                        </div>
                                        <div className="form-group col-4">
                                            <label htmlFor="genero_docente">Genéro</label>
                                            <select className="form-control" id='genero_docente'
                                                value={genero}
                                                onChange={ (e) => setGenero(e.target.value) }
                                            >
                                                <option value={''}>Seleccionar</option>
                                                <option value={'Masculino'}>Masculino</option>
                                                <option value={'Femenino'}>Femenino</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email_docente">Email</label>
                                        <input id="email_docente" type="email" className="form-control"
                                            value={email}
                                            onChange={ (e) => setEmail(e.target.value) }
                                        />
                                        <div className="invalid-feedback"></div>
                                    </div>

                                    <div className="form-group">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" checked={estado} className="custom-control-input" id="estado_docente"
                                                readOnly
                                            />
                                            <label className="custom-control-label" 
                                                htmlFor="estado_docente" 
                                                onClick={ () => setEstado(!estado) }
                                                style={{ cursor: 'pointer', }}
                                            >
                                                Activo
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <button type="submit" className="btn btn-danger mr-1" onClick={onBack}>
                                            Cancelar
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Editar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
