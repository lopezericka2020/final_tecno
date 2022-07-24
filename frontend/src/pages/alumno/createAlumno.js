
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from "@apollo/client";
import toastr from 'toastr';
import { GET_ALLALUMNO } from '../../queries/AlumnoQueries';

export default function CreateAlumno(props) {
    const navigate = useNavigate();
    const [nombre, setNombre] = React.useState('');
    const [apellidoPaterno, setApellidoPaterno] = React.useState('');
    const [apellidoMaterno, setApellidoMaterno] = React.useState('');
    const [ci, setCi] = React.useState('');
    const [telefono, setTelefono] = React.useState('');
    const [genero, setGenero] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [estado, setEstado] = React.useState(true);

    const [ addAlumno ] = useMutation( gql`
        mutation {
            createAlumno (
                nombre: "${nombre}",
                apellido_paterno: "${apellidoPaterno}",
                apellido_materno: "${apellidoMaterno}",
                ci: "${ci}",
                telefono: "${telefono}",
                genero: "${genero}",
                correo_electronico: "${email}",
                fecha_creacion: "${getFecha()}",
                estado: "${estado}",
                concurrencia: "${1}"
            )
            {
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
    `, {
        variables: { },
        refetchQueries: [ { query: GET_ALLALUMNO, } ],
    } );

    function getFecha() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        return year + '-' + month + '-' + day;
    }

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
        addAlumno().then( (data) => {
            if ( data.data.createAlumno ) {
                navigate('/alumno/index');
            }
        } ). catch ( (e) => {
            console.log(e);
        } ) . finally ( () => {
            console.log('Finish')
        } );
    }

    return (
        <div className="main-content">
            <section className="section">
                <h1 className="section-header">
                    <div>
                        Crear Alumno
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
                                            Guardar
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
