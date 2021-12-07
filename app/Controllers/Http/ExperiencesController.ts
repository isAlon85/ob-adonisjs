import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Experience from 'App/Models/Experience';
export default class ExperiencesController {

  public async index() {
    return Experience.all();
  }

  public async show({ params }: HttpContextContract) {
    return Experience.findOrFail(params.id);
  }

  public async store({ request, response }: HttpContextContract) {

    const body = request.body();

    const experience = await Experience.create(body);
    response.status(201);
    return experience;

  }

  public async update({ request, params }: HttpContextContract) {
    const body = request.body();
    const experience = await Experience.findOrFail(params.id);
    experience.merge(body);
    await experience.save();
    return experience;
  }

  public async destroy({ params, response }: HttpContextContract) {
    const experience = await Experience.findOrFail(params.id);
    await experience.delete();
    response.status(204);
    return experience;
  }

}
