import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Candidate from 'App/Models/Candidate';
export default class CandidatesController {

  public async index() {
    return Candidate.all();
  }

  public async show({ request, response}: HttpContextContract) {
    //return Candidate.findOrFail(params.id);
    request.input('salary')
    //const candidate = await Database.from('candidates').where('location', request.input('location')).firstOrFail();
    const candidate = await Database.from('candidates').where('salary', '<', request.input('salary')).firstOrFail();
    return response.json({ candidate });
  }

  public async store({ request, response }: HttpContextContract) {

    const body = request.body();
  
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
