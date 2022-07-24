
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation, useQuery } from "@apollo/client";
import toastr from 'toastr';

import { GET_ALLALUMNO } from '../../queries/AlumnoQueries';
import { GET_ALLDOCENTE } from '../../queries/DocenteQueries';
import { GET_ALLGESTION } from '../../queries/GestionQueries';
import { GET_ALLMATERIA } from '../../queries/MateriaQueries';
import { GET_ALLINSCRIPCION } from '../../queries/InscripcionQueries';

export default function CreateInscripcion(props) {
    const navigate = useNavigate();
    const gestionResponse = useQuery(GET_ALLGESTION);
    const alumnoResponse = useQuery(GET_ALLALUMNO);
    const materiaResponse = useQuery(GET_ALLMATERIA);
    const docenteResponse = useQuery(GET_ALLDOCENTE);

    const [gestion, setGestion] = React.useState('');
    const [alumno, setAlumno] = React.useState('');
    const [materia, setMateria] = React.useState('');
    const [docente, setDocente] = React.useState('');
    const [estado, setEstado] = React.useState(true);

    const [ addInscripcion ] = useMutation( gql`
        mutation {
            createInscripcionDetalle (
                inscripcion: "${'1'}",
                gestion: "${gestion}",
                alumno: "${alumno}",
                materia: "${materia}",
                docente: "${docente}",
                fecha_creacion: "${getFecha()}",
                estado: "${estado}",
                concurrencia: "${1}"
            )
            {
                id
                inscripcion
                gestion
                alumno
                materia
                docente
                fecha_creacion
                estado
                concurrencia
            }
        }
    `, {
        variables: { gestion, alumno, materia, docente },
        refetchQueries: [ { query: GET_ALLINSCRIPCION, } ],
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
        navigate('/inscripcion/index');
    }

    function onSubmitStore(e) {
        e.preventDefault();
        if ( gestion.toString().trim().length === 0 ) {
            toastr.warning( 'No se permite campo vacio.', 'Campo Gestión', { closeButton: true, progressBar: true, } );
            return;
        }
        if ( alumno.toString().trim().length === 0 ) {
            toastr.warning( 'No se permite campo vacio.', 'Campo Alumno', { closeButton: true, progressBar: true, } );
            return;
        }
        if ( materia.toString().trim().length === 0 ) {
            toastr.warning( 'No se permite campo vacio.', 'Campo Materia', { closeButton: true, progressBar: true, } );
            return;
        }
        if ( docente.toString().trim().length === 0 ) {
            toastr.warning( 'No se permite campo vacio.', 'Campo Docente', { closeButton: true, progressBar: true, } );
            return;
        }
        addInscripcion().then( (data) => {
            if ( data.data.createInscripcionDetalle ) {
                navigate('/inscripcion/index');
            }
        } ). catch ( (e) => {
            console.log(e);
        } ) . finally ( () => {
            console.log('Finish')
        } );
    }

    if ( gestionResponse.loading || alumnoResponse.loading || materiaResponse.loading || docenteResponse.loading ) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role={"status"}>
                    <span className="sr-only">
                        
                    </span>
                </div>
            </div>
        );
    };

    if ( gestionResponse.error || alumnoResponse.error || materiaResponse.error || docenteResponse.error ) {
        return (
            <p>Algo salió mal, intentar nuevamente...</p>
        );
    }

    return (
        <div className="main-content">
            <section className="section">
                <h1 className="section-header">
                    <div>
                        Crear Inscripción
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
                                        <div className="form-group col-4"></div>
                                        <div className="form-group col-4">
                                            <label htmlFor="gestion_inscripcion">Gestión</label>
                                            <select id="gestion_inscripcion" className="form-control"
                                                value={gestion}
                                                onChange={ (e) => setGestion(e.target.value) }
                                            >
                                                <option value={""}>Seleccionar</option>
                                                { gestionResponse.data.getAllGestion.map( (item, key) => {
                                                    return (
                                                        <option key={key} value={item.nombre}>
                                                            { item.nombre }
                                                        </option>
                                                    );
                                                } ) }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group col-4">
                                            <label htmlFor="alumno_inscripcion">Alumno</label>
                                            <select id="alumno_inscripcion" className="form-control"
                                                value={alumno}
                                                onChange={ (e) => setAlumno(e.target.value) }
                                            >
                                                <option value={""}>Seleccionar</option>
                                                { alumnoResponse.data.getAllAlumno.map( (item, key) => {
                                                    return (
                                                        <option key={key} value={item.apellido_paterno + " " + item.apellido_materno + " " + item.nombre}>
                                                            { item.apellido_paterno + " " + item.apellido_materno + " " + item.nombre }
                                                        </option>
                                                    );
                                                } ) }
                                            </select>
                                        </div>
                                        <div className="form-group col-4">
                                            <label htmlFor="materia_inscripcion">Materia</label>
                                            <select id="materia_inscripcion" className="form-control"
                                                value={materia}
                                                onChange={ (e) => setMateria(e.target.value) }
                                            >
                                                <option value={""}>Seleccionar</option>
                                                { materiaResponse.data.getAllMateria.map( (item, key) => {
                                                    return (
                                                        <option key={key} value={item.sigla + "-" + item.nombre}>
                                                            { item.sigla + "-" + item.nombre }
                                                        </option>
                                                    );
                                                } ) }
                                            </select>
                                        </div>
                                        <div className="form-group col-4">
                                            <label htmlFor="docente_inscripcion">Docente</label>
                                            <select id="docente_inscripcion" className="form-control"
                                                value={docente}
                                                onChange={ (e) => setDocente(e.target.value) }
                                            >
                                                <option value={""}>Seleccionar</option>
                                                { docenteResponse.data.getAllDocente.map( (item, key) => {
                                                    return (
                                                        <option key={key} value={item.apellido_paterno + " " + item.apellido_materno + " " + item.nombre}>
                                                            { item.apellido_paterno + " " + item.apellido_materno + " " + item.nombre }
                                                        </option>
                                                    );
                                                } ) }
                                            </select>
                                        </div>
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
