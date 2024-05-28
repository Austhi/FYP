import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator, loginValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {

  async getRoles({ response }: HttpContext) {
    return response.ok(["admin", "doctor", "staff"])
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return response.ok({
      token: token,
      ...user.serialize(),
    })
  }

  // must be remove
  async register({ request, response }: HttpContext) {
      const payload = await request.validateUsing(registerValidator)
  
      const payload_with_role = {fullName: payload.fullName, email: payload.email, password: payload.password, role: "staff", doctorId: payload.idDoctor ? payload.idDoctor : 0}
      const user = await User.create(payload_with_role)
  
      return response.created(user)
  }

  // must be remove
  async registerAsAdmin({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const payload_with_role = {fullName: payload.fullName, email: payload.email, password: payload.password, role: payload.role, doctorId: 0}
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
    const payload_with_role = {fullName: req.fullName, email: req.email, password: req.password, role: req.role, doctorId: req.idDoctor ? req.idDoctor : 0}
    const user = await User.create(payload_with_role)
    return user
}

export async function UserDeleted(req) {
  // const payload = await req.validateUsing(registerValidator)
    // const payload_with_role = {fullName: req.fullName, email: req.email, password: req.password, role: req.role, doctorId: req.idDoctor ? req.idDoctor : 0}
    const user = await User.findBy('doctorId', req.idDoctor)
    if (user)
      user.delete()
    else
      throw Error("Doctor didn't exist")
    return user
}