describe('GraphQL Type: Status', () => {
    describe('query', () => {
        it(`fetch all statuses' only scalar values`, async () => {
            const { data } = await query({
                query: `
                {
                    statuses {
                        id
                        name
                    }
                }`
            });

            expect(data).toMatchSnapshot();
        });

        it(`fetch only scalar values`, async () => {
            const { data } = await query({
                query: `
                {
                    status(id: 1) {
                        id
                        name
                    }
                }`
            });

            expect(data).toMatchSnapshot();
        });

        it(`fetch parent's scalar values`, async () => {
            const { data } = await query({
                query: `
                {
                    status(id: 2) {
                        parent {
                            id
                            name
                        }
                    }
                }`
            });

            expect(data).toMatchSnapshot();
        });

        describe('search by pattern', () => {
            it(`by pattern only`, async () => {
                const { data } = await query({
                    query: `
                    {
                        searchStatus(pattern: "children") {
                            name
                        }
                    }`
                });

                expect(data).toMatchSnapshot();
            });

            it(`by pattern and enforced perPage/page variables`, async () => {
                const { data } = await query({
                    query: `
                    {
                        searchStatus(pattern: "children", perPage: 1, page: 1) {
                            name
                        }
                    }`
                });

                expect(data).toMatchSnapshot();
            });
        });
    });

    describe('mutation', () => {
        it(`should create new status, as status with same name do NOT exists yet`, async () => {
            const { data } = await query({
                query: `
                mutation {
                    addStatus(
                        input: {
                            name: "root"
                        }
                    ) {
                        id
                        name
                    }
                }`
            });

            expect(data).toMatchSnapshot();
        });

        it(`should NOT create new status, as status with silimar name already exists`, async () => {
            const { errors } = await query({
                query: `
                mutation {
                    addStatus(
                        input: {
                            name: "status which exists"
                        }
                    ) {
                        id
                        name
                    }
                }`
            });

            expect(errors).toHaveLength(1);
        });


        it(`should update status, as such name do NOT exists yet`, async () => {
            const { data } = await query({
                query: `
                mutation {
                    updateStatus(
                        input: {
                            id: 1
                            name: "update status 1 name"
                        }
                    ) {
                        id
                        name
                    }
                }`
            });

            expect(data).toMatchSnapshot();
        });


        it(`should NOT update status name, as status with silimar name already exists`, async () => {
            const { errors } = await query({
                query: `
                mutation {
                    addStatus(
                        input: {
                            id: 2
                            name: "status 1"
                        }
                    ) {
                        id
                        name
                    }
                }`
            });

            expect(errors).toHaveLength(1);
        });
    });
});
