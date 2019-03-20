import * as Project from './project';
import * as Specialization from './specialization';

export default {
  // project
  getProject: Project.getProject,
  getDefaultProject: Project.getDefault,

  // specialization
  getSpecialization: Specialization.getSpecialization,
  getDefaultTopic: project => Specialization.getTopic(project),
  getTopic: Specialization.getTopic,
};
