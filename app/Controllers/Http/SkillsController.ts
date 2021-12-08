import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Skill from 'App/Models/Skill';
import Experience from '../../Models/Experience';
export default class SkillsController {

  public async index({ request, response }) {
    const skill = await Skill.query().where('name', request.input('name')).firstOrFail();
      //  .andWhere('active', true);
    const experience = await Experience.query().where('skill_id', skill[0].id)
    return response.json({ experience });
  }

  public async show({ params }: HttpContextContract) {
    return Skill.findOrFail(params.id);
  }

  public async store({ request, response }: HttpContextContract) {
    const body = request.body();
    const skills = await Skill.create(body);
    response.status(201);
    return skills;
  }

  public async update({ request, params }: HttpContextContract) {
    const body = request.body();
    const skill = await Skill.findOrFail(params.id);
    skill.merge(body);
    await skill.save();
    return skill;
  }

  public async destroy({ params, response }: HttpContextContract) {
    const skill = await Skill.findOrFail(params.id);
    await skill.delete();
    response.status(204);
    return skill;
  }
}
