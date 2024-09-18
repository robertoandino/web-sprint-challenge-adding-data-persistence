// build your `Task` model here
const db = require('../../data/dbConfig')

const getTasks = () => {
    //response body shoule be: 
    //[{"task_id":1,"task_description":"baz","task_notes":null,"task_completed":false,
    //"project_name:"bar","project_description":null}]
    return db('tasks as t')
        .join('projects as p', 't.project_id', 'p.project_id')
        .select(
            't.task_id', 
            't.task_description', 
            't.task_notes', 
            't.task_completed', 
            'p.project_name',
            'p.project_description'
        )
        .then(tasks => tasks.map(task => ({
            ...task,
            task_completed: Boolean(task.task_completed)
        }))
    )
}

const createTask = async (task) => {
    //response body shoule be:
    //{"task_id":1,"task_description":"baz","task_notes":null,"task_completed":false,"project_id:1}
    const [newTask] = await db('tasks')
        .insert(task, ['task_id', 'task_description', 'task_notes', 'task_completed', 'project_id'])
    
    return {
        ...newTask,
        task_completed: Boolean(newTask.task_completed)
    }
}

module.exports = {
    getTasks,
    createTask,
}