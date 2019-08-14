import status from './status.dataloader';

export default (orm) => ({
    ...status(orm),
})
