
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gql, useMutation, useQuery } from "@apollo/client";
import toastr from 'toastr';
import { GET_ALLDOCENTE } from '../../queries/DocenteQueries';

export default function EditDocente(props) {
    const navigate = useNavigate();
    const params = useParams();
    
    const [nombre, setNombre] = React.useState('');
    const [apellidoPaterno, setApellidoPaterno] = React.useState('');
    const [apellidoMaterno, setApellidoMaterno] = React.useState('');
    const [ci, setCi] = React.useState('');
    const [telefono, setTelefono] = React.useState('');
    const [genero, setGenero] = React.useState('');
    const [estadoCivil, setEstadoCivil] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [direccion, setDireccion] = React.useState('');
    const [concurrencia, setConcurrencia] = React.useState(null);
    const [estado, setEstado] = React.useState(true);

    const getDocente = useQuery(
        gql`
            {
                getDocente( id: "${params.iddocente}" ) {
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
        `
    );

    React.useEffect( () => {
        if ( !getDocente.loading ) {
            if ( getDocente.data ) {
                if ( getDocente.data.getDocente ) {
                    setNombre(getDocente.data.getDocente.nombre);
                    setApellidoPaterno(getDocente.data.getDocente.apellido_paterno);
                    setApellidoMaterno(getDocente.data.getDocente.apellido_materno);
                    setCi(getDocente.data.getDocente.ci);
                    setTelefono(getDocente.data.getDocente.telefono);
                    setGenero(getDocente.data.getDocente.genero);
                    setEstadoCivil(getDocente.data.getDocente.estado_civil);
                    setEmail(getDocente.data.getDocente.correo_electronico);
                    setDireccion(getDocente.data.getDocente.direccion);
                    setConcurrencia(getDocente.data.getDocente.concurrencia);
                    setEstado(getDocente.data.getDocente.estado === "true" ? true : false);
                }
            }
        }
    }, [ getDocente ] );

    const [ updateDocente ] = useMutation( gql`
        mutation {
            updateDocente (
                id: "${params.iddocente}"
                input: {
                    nombre: "${nombre}",
                    apellido_paterno: "${apellidoPaterno}",
                    apellido_materno: "${apellidoMaterno}",
                    ci: "${ci}",
                    telefono: "${telefono}",
                    direccion: "${direccion}",
                    genero: "${genero}",
                    estado_civil: "${estadoCivil}",
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
        refetchQueries: [ { query: GET_ALLDOCENTE, } ],
    } );

    function onBack(e) {
        e.preventDefault();
        navigate('/docente/index');
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
        if ( estadoCivil.toString().trim().length === 0 ) {
            toastr.warning( 'No se permite campo vacio.', 'Campo Estado Civil', { closeButton: true, progressBar: true, } );
            return;
        }
        if ( email.toString().trim().length === 0 ) {
            toastr.warning( 'No se permite campo vacio.', 'Campo Email', { closeButton: true, progressBar: true, } );
            return;
        }
        if ( direccion.toString().trim().length === 0 ) {
            toastr.warning( 'No se permite campo vacio.', 'Campo Dirección', { closeButton: true, progressBar: true, } );
            return;
        }
        updateDocente().then( (data) => {
            if ( data.data.updateDocente ) {
                if ( data.data.updateDocente.success === true ) {
                    navigate('/docente/index');
                } else {
                    toastr.error( data.data.updateDocente.message, 'Error al actualizar', { closeButton: true, progressBar: true, } );
                }
            }
        } ). catch ( (e) => {
            console.log(e);
        } ) . finally ( () => {
            console.log('Finish')
        } );
    }

    if ( getDocente.loading ) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role={"status"}>
                    <span className="sr-only">
                        
                    </span>
                </div>
            </div>
        );
    };

    if ( getDocente.error ) {
        return (
            <p>Algo salió mal, intentar nuevamente...</p>
        );
    }

    return (
        <div className="main-content">
            <section className="section">
                <h1 className="section-header">
                    <div>
                        Editar Docente
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
                                        <div className="form-group col-3">
                                            <label htmlFor="ci_docente">Ci</label>
                                            <input id="ci_docente" type="text" className="form-control" 
                                                value={ci}
                                                onChange={ (e) => setCi(e.target.value) }
                                            />
                                        </div>
                                        <div className="form-group col-3">
                                            <label htmlFor="telefono_docente">Teléfono</label>
                                            <input id="telefono_docente" type="text" className="form-control" 
                                                value={telefono}
                                                onChange={ (e) => setTelefono(e.target.value) }
                                            />
                                        </div>
                                        <div className="form-group col-3">
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
                                        <div className="form-group col-3">
                                            <label htmlFor="estadocivil_docente">Estado Civil</label>
                                            <select className="form-control" id='estadocivil_docente'
                                                value={estadoCivil}
                                                onChange={ (e) => setEstadoCivil(e.target.value) }
                                            >
                                                <option value={''}>Seleccionar</option>
                                                <option value={'Soltero'}>Soltero</option>
                                                <option value={'Casado'}>Casado</option>
                                                <option value={'Divorciado'}>Divorciado</option>
                                                <option value={'Viudo'}>Viudo</option>
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
                                        <label htmlFor="direccion_docente">Dirección</label>
                                        <input id="direccion_docente" type="text" className="form-control"
                                            value={direccion}
                                            onChange={ (e) => setDireccion(e.target.value) }
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
