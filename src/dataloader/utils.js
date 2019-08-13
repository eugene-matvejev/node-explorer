/**
 * @param {Number[]|String[]} keys
 * @param {Number|String} key
 * @param {Boolean} aggregateInArray
 * @param {Object[]} values
 *
 * @returns {Object[]|Object[][]}
 *
 * examples:
 *  - processSQLResult(
 *      [1, 3, 2 ],
 *      'id',
 *      [
 *          { id: 1 },
 *          { id: 2 },
 *      ]
 *  )
 *  will return ->
 *  [
 *      { id: 1 },
 *      null,
 *      { id: 2 }
 *  ]
 *
 *  - processSQLResult(
 *      [1, 3, 2 ],
 *      'id',
 *      [
 *          { id: 1 },
 *          { id: 2 },
 *          { id: 2 },
 *      ]
 *  )
 *  will return ->
 *  [
 *      [
 *          { id: 1 },
 *      ],
 *      null,
 *      [
 *          { id: 2 },
 *          { id: 2 },
 *      ],
 *  ]
 *
 */
export const processSQLResult = (keys, key, values, aggregateInArray) => {
    const acc = {};

    for (const v of values) {
        if (!v[key]) {
            continue;
        }

        if (aggregateInArray) {
            !acc[v[key]]
                ? acc[v[key]] = [v]
                : acc[v[key]].push(v);
        } else acc[v[key]] = v;
    }
    debugger;

    return keys.map((v) => acc[v] || null);
}
