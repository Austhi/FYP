import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator';
import User from 'App/Models/User';
import LoginUserValidator from 'App/Validators/LoginUserValidator';

export default class AuthController {
    public async register({ request, response } : HttpContextContract ) {
        const payload = await request.validate(RegisterUserValidator); 
        const user_created = await User.create(payload);
        return response.status(200).json({ID: user_created.id});
    }
    public async login({auth, request, response } : HttpContextContract) {
        const {email, password} = await request.validate(LoginUserValidator); 
        const token = await auth.use('api').attempt(email, password)
        return response.status(200).json({token: token})
    }
}