/** maintained as separate file, because of Sequlize CLI way of including config */
const orm = {
    host: process.env.DB_HOSTNAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    storage: `${__dirname}/../var/database.sqlite`,
};
const test = {
    ...orm,
    dialect: 'sqlite',
    storage: `${__dirname}/../var/database-${process.pid}.sqlite`,
};
module.exports = {
    development: orm,
    production: orm,
    'undefined': orm,
    test,
}
