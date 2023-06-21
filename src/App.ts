import swaggerUI from 'swagger-ui-express'
import { swaggerSpec } from './swagger.conf'

import express,{Application, Request, Response }from 'express'
import CitaRouter from './routes/Cita.routes'
import PacienteRouter from  './routes/Paciente.routes'
import MedicoRouter from './routes/Medico.routes'
import EspecialidadRouter from './routes/Especialidad.routes'
import FormularioRouter from './routes/Formulario.routes'
import cors from 'cors'

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
          
        this.app.use(cors())
		this.routes()
	}

	/**
	 * Definir y agregar las rutas de la API con express
	 */
	private routes():void{
		this.app.use('/', PacienteRouter)
		this.app.use('/', MedicoRouter)
		this.app.use('/', FormularioRouter)
		this.app.use('/', CitaRouter)
		this.app.use('/', EspecialidadRouter)
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