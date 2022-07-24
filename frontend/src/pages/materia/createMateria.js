
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from "@apollo/client";
import toastr from 'toastr';
import { GET_ALLMATERIA } from '../../queries/MateriaQueries';

export default function CreateMateria(props) {
    const navigate = useNavigate();

    const [nombre, setNombre] = React.useState('');
    const [sigla, setSigla] = React.useState('');
    const [estado, setEstado] = React.useState(true);

    const [ addMateria ] = useMutation( gql`
        mutation {
            createMateria (
                sigla: "${sigla}",
                nombre: "${nombre}",
                fecha_creacion: "${getFecha()}",
                estado: "${estado}",
                concurrencia: "${1}"
            )
            {
                id
                sigla
                nombre
                fecha_creacion
                estado
                concurrencia
            }
        }
    `, {
        variables: { sigla, nombre, estado },
        refetchQueries: [ { query: GET_ALLMATERIA, } ],
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
        navigate('/materia/index');
    }

    function onSubmitStore(e) {
        e.preventDefault();
        if ( sigla.toString().trim().length === 0 ) {
            toastr.warning( 'No se permite campo vacio.', 'Campo Sigla', { closeButton: true, progressBar: true, } );
            return;
        }
        if ( nombre.toString().trim().length === 0 ) {
            toastr.warning( 'No se permite campo vacio.', 'Campo Nombre', { closeButton: true, progressBar: true, } );
            return;
        }
        addMateria(sigla, nombre, estado).then( (data) => {
            if ( data.data.createMateria ) {
                navigate('/materia/index');
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
                        Crear Materia
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
                                        <div className="form-group col-4">
                                            <label htmlFor="sigla_materia">Sigla</label>
                                            <input id="sigla_materia" type="text" className="form-control" 
                                                value={sigla}
                                                onChange={ (e) => setSigla(e.target.value) }
                                            />
                                        </div>
                                        <div className="form-group col-8">
                                            <label htmlFor="nombre_materia">Nombre</label>
                                            <input id="nombre_materia" type="text" className="form-control" 
                                                value={nombre}
                                                onChange={ (e) => setNombre(e.target.value) }
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
