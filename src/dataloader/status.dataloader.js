import DataLoader from 'dataloader';
import { processSQLResult } from './utils';

export default (orm) => ({
    getStatusByChildrenId: new DataLoader(
        (id) => orm.Status.findAll({
            include: [
                {
                    attributes: ['id'],
                    model: orm.Status,
                    as: 'children',
                    where: {
                        id,
                    },
                },
            ],
            raw: true,
        })
            .then((v) => processSQLResult(id, 'children.id', v))
    ),
})
