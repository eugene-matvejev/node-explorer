const fs = require('fs');
const Sequelize = require('sequelize');
const conf = require('../config/config');

const c = conf[process.env.NODE_ENV];
/** Heroku way, of DATABASE_URL, because heroku rotate credentials */
const p = process.env.DATABASE_URL
    ? [process.env.DATABASE_URL]
    : [c.database, c.username, c.password, c];
const sequelize = new Sequelize(...p);

const context = fs
    .readdirSync(`${__dirname}/models`)
    .reduce(
        (acc, file) => {
            if ((file.indexOf('.') !== 0) && (file.slice(-3) === '.js')) {
                const model = sequelize['import'](`${__dirname}/models/${file}`);
                acc[model.name] = model;
            }

            return acc;
        },
        {}
    );

for (const name in context) {
    const model = context[name];

    if (model.associate) {
        model.associate(context);
    }
}

context.sequelize = sequelize;
context.Sequelize = Sequelize;

module.exports = context;
