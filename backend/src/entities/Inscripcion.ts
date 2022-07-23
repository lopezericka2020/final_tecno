
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()

export class Inscripcion extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    gestion: string;

    @Column()
    fecha_creacion: string;

    @Column()
    estado: string;
    
    @Column()
    concurrencia: string;

}

