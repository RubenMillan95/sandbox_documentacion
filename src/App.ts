import swaggerUI from 'swagger-ui-express'
import { swaggerSpec } from './swagger.conf'

import express,{Application, Request, Response }from 'express'
import {PrismaClient} from '@prisma/client'


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
	private prismaClient:PrismaClient

	constructor(){
		this.app=express()
		this.app.use(express.json())
		this.app.use(
			'/api-docs',
			swaggerUI.serve,
			swaggerUI.setup(swaggerSpec)
		)
        this.prismaClient=new PrismaClient()  

		this.routes()
	}

	/**
	 * Definir y agregar las rutas de la API con express
	 */
	private routes():void{
		this.app.get(
			'/',
			(req:Request, res:Response)=>{
				res.send('Bienvenidos a typescript')
			}
		) 

		this.app.get(
			'/pacientes',async (req:Request, res:Response)=>{
			const pacientes=await this.prismaClient.paciente.findMany() 
				res.json(pacientes)
			}
		)


		this.app.post(
			'/crear_paciente',
			async (req:Request, res:Response)=>{
				try{

				const{
					cedula,
					nombre,
					apellido,
					fecha,
					telefono
				}=req.body

				const fechaNacimiento= new Date(fecha)

				const paciente=await this.prismaClient.paciente.create(
					{
						data:{cedula,
							nombre,
							apellido,
							fechaNacimiento,
							telefono}
					}
				)



				res.json(req.body)
			}catch(e:any){
				res.status(400)
				res.json({error:e.message})
			}
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