// build your `Resource` model here
const db = require('../../data/dbConfig')

const getResources = () => {
    //response body shoule be: 
    //[{"resource_id":1,"resource_name":"foo","resource_description":null}]
    return db('resources')
        .select('resource_id', 'resource_name', 'resource_description')
}

const createResource = async (resource) => {
    //response body shoule be:
    //{"resource_id":1,"resource_name":"foo","resource_description":null}
    const [newResource] = await db('resources')
        .insert(resource, ['resource_id', 'resource_name', 'resource_description'])
    return newResource;
}

module.exports = {
    getResources,
    createResource,
}