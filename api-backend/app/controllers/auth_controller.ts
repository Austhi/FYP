import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator, loginValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {

/**
* @show
* @paramPath id - Describe the param
* @description Returns a product with it's relation on user and user relations
* @responseBody 200 - <Product>.with(user, user.relations)
* @responseBody 404
*/

  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return response.ok({
      token: token,
      ...user.serialize(),
    })
  }
  async register({ request, response }: HttpContext) {
      const payload = await request.validateUsing(registerValidator)
  
      const payload_with_role = {fullName: payload.fullName, email: payload.email, password: payload.password, administrator: false, doctorId: payload.idDoctor ? payload.idDoctor : 0}
      const user = await User.create(payload_with_role)
  
      return response.created(user)
  }

  async registerAsAdmin({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const payload_with_role = {fullName: payload.fullName, email: payload.email, password: payload.password, administrator: true, doctorId: 0}
    const user = await User.create(payload_with_role)

    return response.created(user)
}

  async logout({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const token = auth.user?.currentAccessToken.identifier
    if (!token) {
      return response.badRequest({ message: 'Token not found' })
    }
    await User.accessTokens.delete(user, token)
    return response.ok({ message: 'Logged out' })
  }
}

export async function UserRegister(req) {
  // const payload = await req.validateUsing(registerValidator)
    const payload_with_role = {fullName: req.fullName, email: req.email, password: req.password, administrator: false, doctorId: req.idDoctor ? req.idDoctor : 0}
    const user = await User.create(payload_with_role)
    return user
}

export async function UserDeleted(req) {
  // const payload = await req.validateUsing(registerValidator)
    const payload_with_role = {fullName: req.fullName, email: req.email, password: req.password, administrator: false, doctorId: req.idDoctor ? req.idDoctor : 0}
    const user = await User.findBy('doctorId', req.idDoctor)
    if (user)
      user.delete()
    else
      throw Error("Doctor didn't exist")
    return user
}