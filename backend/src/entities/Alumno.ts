
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()

export class Alumno extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ci: string;

    @Column()
    nombre: string;

    @Column()
    apellido_paterno: string;
    
    @Column()
    apellido_materno: string;
    
    @Column()
    genero: string;

    @Column()
    correo_electronico: string;

    @Column()
    telefono: string;

    @Column()
    fecha_creacion: string;

    @Column()
    estado: string;
    
    @Column()
    concurrencia: string;

}

