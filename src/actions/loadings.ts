import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { Review } from "../components/review/ReviewComponent";
import { actions } from "../store";
import type { RootState, AppDispatch } from '../store/index'
import { StrapiUser } from "../strapi/strapiUser";
import { StrapiCar } from "../strapi/strapiCar";

export async function loadCarsActions(dispatch : Dispatch, cars: StrapiCar[]) {
    
    const userCars: StrapiCar[] = cars;
    dispatch(actions.user.setUserCars(userCars));
  
}

export async function loadSingleCarActions(dispatch : Dispatch, car: StrapiCar) {
    
    const singleCar: StrapiCar = car;
    dispatch(actions.user.setSelectedCar(singleCar));
  
}