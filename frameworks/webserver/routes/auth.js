import authController from '../../../adapters/controllers/authController.js'
import userDbRepository from "../../../application/repositories/userDbRepository.js"
import userDbRepositoryMongoDB from '../../database/mongoDB/repositories/userRepositoryMongoDB.js' 
import authServiceInterface from '../../../application/services/authService.js'
import authServiceImpl from '../../services/authService.js'


export default function authRouter(express){
    const router = express.Router()

    const controllers = authController(
        userDbRepository,
        userDbRepositoryMongoDB,
        authServiceInterface,
        authServiceImpl
    )

    router.route('/').post(controllers.loginUser)
    
    return router
}