
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()

export class InscripcionDetalle extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    inscripcion: string;

    @Column()
    gestion: string;

    @Column()
    alumno: string;

    @Column()
    materia: string;

    @Column()
    docente: string;

    @Column()
    fecha_creacion: string;

    @Column()
    estado: string;
    
    @Column()
    concurrencia: string;

}

