
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()

export class Materia extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sigla: string;

    @Column()
    nombre: string;

    @Column()
    fecha_creacion: string;

    @Column()
    estado: string;
    
    @Column()
    concurrencia: string;

}

