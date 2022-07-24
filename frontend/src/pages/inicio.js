
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ALLINSCRIPCION } from '../queries/InscripcionQueries';

export default function Inicio(props) {
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(GET_ALLINSCRIPCION);

    if ( loading ) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role={"status"}>
                    <span className="sr-only">
                        
                    </span>
                </div>
            </div>
        );
    };

    if ( error ) {
        return (
            <p>Algo salió mal, intentar nuevamente...</p>
        );
    }

    return (
        <div className="main-content">
            <section className="section">
                <h1 className="section-header">
                    <div>Inicio</div>
                </h1>
                <div className="row">
                    <div className="col-12">
                        <div className="card card-primary">
                            <div className="card-header"><h4>HOME</h4></div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 col-sm-6 col-lg-3">
                                        <div className="card card-sm">
                                        <div className="card-icon text-primary">
                                            <i className="ion ion-person"></i>
                                        </div>
                                        <div className="card-wrap">
                                            <div className="card-body">
                                                10
                                            </div>
                                            <div className="card-header">
                                                <h4>Total Admin</h4>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3">
                                        <div className="card card-sm">
                                        <div className="card-icon text-danger">
                                            <i className="ion ion-ios-paper-outline"></i>
                                        </div>
                                        <div className="card-wrap">
                                            <div className="card-body">
                                                42
                                            </div>
                                            <div className="card-header">
                                                <h4>News</h4>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3">
                                        <div className="card card-sm">
                                        <div className="card-icon text-warning">
                                            <i className="ion ion-paper-airplane"></i>
                                        </div>
                                        <div className="card-wrap">
                                            <div className="card-body">
                                            1,201
                                            </div>
                                            <div className="card-header">
                                            <h4>Reports</h4>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3">
                                        <div className="card card-sm">
                                        <div className="card-icon text-success">
                                            <i className="ion ion-record"></i>
                                        </div>
                                        <div className="card-wrap">
                                            <div className="card-body">
                                            47
                                            </div>
                                            <div className="card-header">
                                            <h4>Online Users</h4>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
