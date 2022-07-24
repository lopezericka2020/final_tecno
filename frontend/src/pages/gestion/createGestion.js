
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from "@apollo/client";
import toastr from 'toastr';
import { GET_ALLGESTION } from '../../queries/GestionQueries';

export default function CreateGestion(props) {
    const navigate = useNavigate();

    const [nombre, setNombre] = React.useState('');
    const [fechaInicio, setFechaInicio] = React.useState('');
    const [fechaFin, setFechaFin] = React.useState('');
    const [nota, setNota] = React.useState('');
    const [estado, setEstado] = React.useState(true);

    const [ addGestion ] = useMutation( gql`
        mutation {
            createGestion (
                nombre: "${nombre}",
                fecha_inicio: "${fechaInicio}",
                fecha_fin: "${fechaFin}",
                nota: "${nota}",
                fecha_creacion: "${getFecha()}",
                estado: "${estado}",
                concurrencia: "${1}"
            )
            {
                id
                nombre
                fecha_inicio
                fecha_fin
                nota
                fecha_creacion
                estado
                concurrencia
            }
        }
    `, {
        variables: { nombre, fechaInicio, fechaFin, nota, estado },
        refetchQueries: [ { query: GET_ALLGESTION, } ],
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
        navigate('/gestion/index');
    }

    function onSubmitStore(e) {
        e.preventDefault();
        if ( nombre.toString().trim().length === 0 ) {
            toastr.warning( 'No se permite campo vacio.', 'Campo Nombre', { closeButton: true, progressBar: true, } );
            return;
        }
        if ( fechaInicio.toString().trim().length === 0 ) {
            toastr.warning( 'No se permite campo vacio.', 'Campo Fecha Inicio', { closeButton: true, progressBar: true, } );
            return;
        }
        if ( fechaFin.toString().trim().length === 0 ) {
            toastr.warning( 'No se permite campo vacio.', 'Campo Fecha Fin', { closeButton: true, progressBar: true, } );
            return;
        }
        if ( nota.toString().trim().length === 0 ) {
            toastr.warning( 'No se permite campo vacio.', 'Campo Nota', { closeButton: true, progressBar: true, } );
            return;
        }
        addGestion().then( (data) => {
            if ( data.data.createGestion ) {
                navigate('/gestion/index');
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
                        Crear Gestión
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
                                        <div className="form-group col-6">
                                            <label htmlFor="nombre_gestion">Nombre</label>
                                            <input id="nombre_gestion" type="text" className="form-control" 
                                                value={nombre}
                                                onChange={ (e) => setNombre(e.target.value) }
                                            />
                                        </div>
                                        <div className="form-group col-3">
                                            <label htmlFor="fechainicio_gestion">Fecha Inicio</label>
                                            <input id="fechainicio_gestion" type="date" className="form-control" 
                                                value={fechaInicio}
                                                onChange={ (e) => setFechaInicio(e.target.value) }
                                            />
                                        </div>
                                        <div className="form-group col-3">
                                            <label htmlFor="fechafin_gestion">Fecha Fin</label>
                                            <input id="fechafin_gestion" type="date" className="form-control" 
                                                value={fechaFin}
                                                onChange={ (e) => setFechaFin(e.target.value) }
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group col-12">
                                            <label htmlFor="nota_gestion">Nota</label>
                                            <textarea id="nota_gestion" type="text" className="form-control" 
                                                value={nota}
                                                onChange={ (e) => setNota(e.target.value) }
                                            />
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
