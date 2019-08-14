import { processSQLResult } from './utils';

describe('dataloader utils', () => {
    describe('processSQLResult', () => {
        it('should return Array<Object>, ordered by key value, and injecting NULL in absense of/falsy value', () => {
            const keys = [1, 2, 3, 4];
            const values = [
                { v: 1 },
                { v: 3 }, /** should be returned as 3rd */
                { v: 2 }, /** should be returned as 2nd */
                { v: null },
            ];

            expect(processSQLResult(keys, 'v', values)).toMatchSnapshot();
        });

        it('should return Array<Array<Object>>, ordered by key value, and injecting NULL in absense/falsy value', () => {
            const keys = [1, 2, 3];
            const values = [
                { v: 1 },
                { v: 3 }, /** should be returned in 3rd array */
                { v: 3 }, /** should be returned in 3rd array */
            ];

            expect(processSQLResult(keys, 'v', values, true)).toMatchSnapshot();
        });

        it('should return Array<Array<Object>>, ordered by key value, and injecting NULL in absense of a value [2nd and 3rd values should duplicated, because of key value]', () => {
            const keys = [1, 3, 3];
            const values = [
                { v: 1 },
                { v: 3 }, /** should be returned in 2nd and 3rd array */
                { v: 3 }, /** should be returned in 2nd and 3rd array */
            ];

            expect(processSQLResult(keys, 'v', values, true)).toMatchSnapshot();
        });
    });
});
