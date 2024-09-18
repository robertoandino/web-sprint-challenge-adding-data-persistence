// build your `Project` model here
const db = require('../../data/dbConfig')

const getProjects = () => {
    //response body shoule be: 
    //[{"project_id":1,"project_name":"bar","project_description":null,"project_completed":false}]
    return db('projects')
        .select('project_id', 'project_name', 'project_description', 'project_completed')
        .then(projects => projects.map(project => ({
            ...project,
            project_completed: Boolean(project.project_completed)
        }))
    )
}

const createProject = async (project) => {
    //response body shoule be:
    //[{"project_id":1,"project_name":"bar","project_description":null,"project_completed":false}]
    const [newProject] = await db('projects')
        .insert(project, ['project_id', 'project_name', 'project_description', 'project_completed'])
    
    return { 
        ...newProject,
        project_completed: Boolean(newProject.project_completed)
    };
}

module.exports = {
    getProjects,
    createProject,
}