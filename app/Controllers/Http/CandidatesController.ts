import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Candidate from 'App/Models/Candidate';
export default class CandidatesController {

  public async index() {
    return Candidate.all();
  }

  public async show({ params }: HttpContextContract) {
    return Candidate.findOrFail(params.id);
  }

  public async store({ request, response }: HttpContextContract) {
    //validation
    const body = request.body();
    // Create instance and save to database
    const candidate = await Candidate.create(body);
    response.status(201);
    return candidate;
  }

  public async update({ request, params }: HttpContextContract) {
    const body = request.body();
    const candidate = await Candidate.findOrFail(params.id);
    candidate.merge(body);
    await candidate.save();
    return candidate;
  }

  public async destroy({ params, response }: HttpContextContract) {
    const candidate = await Candidate.findOrFail(params.id);
    await candidate.delete();
    response.status(204);
    return candidate;
  }

}
