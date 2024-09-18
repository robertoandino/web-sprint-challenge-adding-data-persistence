/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema
    .createTable('projects', table => {
        //Project is what needs to be done and is stored in a projects table 
        //Columns needed:
        //project_id - primary key
        //project_name - required
        //project_description - optional
        //project_completed - the database defaults it to false (integer 0) if not provided
        table.increments('project_id')
        table.string('project_name', 200).notNullable()
        table.string('project_description', 200)
        table.boolean('project_completed').defaultTo(false)
    })
    .createTable('resources', table => {
        //Resource is anything neede to complete a project and is stored in a resources table
        //Columns needed: 
        //resource_id - primary key
        //resource_name - required and unique
        //resource_description - optional
        table.increments('resource_id')
        table.string('resource_name', 200).notNullable().unique()
        table.string('resource_description', 200)
    })
    .createTable('tasks', table => {
        //Task is on of the steps needed to complete a project and is stored in a tasks table
        //Columns needed:
        //task_id - primary key
        //task_description - required
        //task_notes - optional
        //task_completed - the database defaults it to false (integer 0) if not provided
        //project_id - required and points to an actual project_id in the projects table
        table.increments('task_id')
        table.string('task_description', 200).notNullable()
        table.string('task_notes', 200)
        table.boolean('task_completed').defaultTo(false)
        table.integer('project_id')
            .unsigned()
            .notNullable()
            .references('project_id')
            .inTable('projects')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT')
        
    })
    .createTable('project_resources', table => {
        //Resource assignment connects a resource and a project, and is stored in a project_resources table.
        //Columns needed:
        //You decide what columns to use
        table.increments('project_resources_id')
        table.integer('project_id')
            .unsigned()
            .notNullable()
            .references('project_id')
            .inTable('projects')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT')
        table.integer('resource_id')
            .unsigned()
            .notNullable()
            .references('resource_id')
            .inTable('resources')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema
    .dropTableIfExists('projects')
    .dropTableIfExists('resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('project_resources')
};
