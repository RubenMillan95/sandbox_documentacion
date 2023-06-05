import swaggerUI from 'swagger-ui-express'
import { swaggerSpec } from './swagger.conf'

import express,{Application, Request, Response }from 'express'


/**
 * Clase principal de la API. Define las rutas de la API
 * 
 * @author Ruben Felipe Millan
 * @description Clase inicial de ejemplo para manejar rutas y documentación
 */
class App{
  
	//Atributos
	public app:any
	private server:any

	constructor(){
		this.app=express()
		this.app.use(express.json())
		this.app.use(
			'/api-docs',
			swaggerUI.serve,
			swaggerUI.setup(swaggerSpec)
		)
		this.routes()
	}
	private routes():void{
		this.app.get(
			'/',
			(req:Request, res:Response)=>{
				res.send('Bienvenidos a typescript')
			}
		)
		this.app.post(
			'/paciente',
			(req:Request, res:Response)=>{
				res.send('Bienvenidos a typescript')
			}
		)
	}
	public start():void{
		this.server=this.app.listen(
			3000,
			()=>{'El servidor está escuchando en el puerto 3000'}
		)
	}
	public close():void{
		this.server.close()
	}

}
export default App