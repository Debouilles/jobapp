import { Service } from "./service";

/* export type AnimalResponse = {
    animal: Animal;
}; */

export type ServiceResponse = {
    _id: string;
    picture: string;
    location: any;
    titre: string;
    date: Date;
    type: string;
    description: string;

};