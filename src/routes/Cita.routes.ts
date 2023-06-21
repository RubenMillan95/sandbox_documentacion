import { Router, Request, Response } from 'express'
import CitaController from '../controllers/CitaController'

class CitaRouter{

    router:Router
    citaController: CitaController

    constructor(){

        this.router=Router()
        this.citaController= new CitaController()
        this.routes()
    }

    private routes():void{

        this.router.get('/cita',
            (req:Request, res:Response)=> {
                this.citaController.obtenerCita(req,res)
            }        
        )
    }

}

export default new CitaRouter().router