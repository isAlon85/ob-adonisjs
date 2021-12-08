import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Candidate from 'App/Models/Candidate';
export default class CandidatesController {

  public async index({ request, response }) {
     if (request.input('location')) {
      const candidate = await Candidate.query().where('location', request.input('location'))
        .orWhere('remote', true)
        .andWhere('active', true).firstOrFail();
      return response.json({ candidate });
    } else if (request.input('country')) {
      const candidate = await Candidate.query().where('country', request.input('country'))
        .andWhere('active', true).firstOrFail();
      return response.json({ candidate });
    } else if (request.input('remote')) {
      const candidate = await Candidate.query().where('remote', true)
        .andWhere('active', true).firstOrFail();
      return response.json({ candidate });
    } else if (request.input('salary_desired')) {
      const candidate = await Candidate.query().where('salary_desired', '<=', request.input('salary_desired'))
        .andWhere('active', true).firstOrFail();
      return response.json({ candidate });
    } else {
       const candidate = await Candidate.query().where('active', false).firstOrFail();
      return response.json({ candidate });
    }
  }

  public async show({params}: HttpContextContract) {
    return Candidate.findOrFail(params.id);
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
