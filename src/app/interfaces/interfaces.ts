import { User } from "firebase/auth";
import { GeoPoint } from "firebase/firestore";

export interface Componente {
    icon: string;
    name: string;
    redirectTo: string;
}

export interface Trail {
    name: string;
    description: string;
    distance: number;
    imgURL: string;
    lat: number;
    long: number;
    point: GeoPoint;
}

export interface Fav {
    name: string;
    description: string;
    distance: number;
    imgURL: string;
    lat: number;
    long: number;
    point: GeoPoint;
    Fav: boolean
}