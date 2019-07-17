'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let i = 1;
        const [
            _status1,
            _status2,
            _status3,
        ] = await Promise.all([
            /** work around of https://github.com/sequelize/sequelize/issues/11175 to make fixture work on SQLite/MySQL/PostreSQL */
            queryInterface.bulkInsert(
                'statuses',
                [
                    {
                        name: `status ${i++}`,
                    },
                ],
                {
                    returning: true,
                }
            ),
            /** work around of https://github.com/sequelize/sequelize/issues/11175 to make fixture work on SQLite/MySQL/PostreSQL */
            queryInterface.bulkInsert(
                'statuses',
                [
                    {
                        name: `status ${i++}`,
                    },
                ],
                {
                    returning: true,
                }
            ),
            /** work around of https://github.com/sequelize/sequelize/issues/11175 to make fixture work on SQLite/MySQL/PostreSQL */
            queryInterface.bulkInsert(
                'statuses',
                [
                    {
                        name: `status ${i++}`,
                    },
                ],
                {
                    returning: true,
                }
            ),
        ]);

        /** work around of https://github.com/sequelize/sequelize/issues/11175 to make fixture work on SQLite/MySQL/PostreSQL */
        const status1 = Array.isArray(status1) ? _status1[0].id : _status1;
        /** work around of https://github.com/sequelize/sequelize/issues/11175 to make fixture work on SQLite/MySQL/PostreSQL */
        const status2 = Array.isArray(status2) ? _status2[0].id : _status2;
        /** work around of https://github.com/sequelize/sequelize/issues/11175 to make fixture work on SQLite/MySQL/PostreSQL */
        const status3 = Array.isArray(status3) ? _status3[0].id : _status3;

        for ( const [parent, children] of [
            [status1, 1],
            [status2, 2],
            [status3, 3],
        ]) {
            const statuses = (new Array(children)).fill(1).map((v, i) => ({
                name: `{status ${parent} children: ${i}}`,
                parent, 
            }));

            await queryInterface.bulkInsert(
                'statuses',
                statuses,
                {}
            );
        }
        
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete(
            'statuses',
            {},
            {}
        );
    },
};
