import {Router, Response, Request} from 'express'

import FormularioController from '../Controllers/FormularioControler'

class FormularioRouter{

    router:Router
    miFormularioController:FormularioController

    constructor(){
        this.router=Router()
        this.miFormularioController= new FormularioController()
        this.routes()
     
    }
    private routes(){
        this.router.get(
            '/formulario/:formulario',
            (res:Response, req:Request)=>{
                this.miFormularioController.obtenerDefinicion(req, res)
            }
        )
    }
}

export default new FormularioRouter().router