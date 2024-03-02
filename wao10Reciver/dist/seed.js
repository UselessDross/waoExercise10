import { readFile } from 'fs/promises';
import { model } from './endpoints';
export const seed = async (req, res) => {
    let data = await readFile('./assets/MOCK_DATA_MATERIALS.json', 'utf-8');
    let orders = JSON.parse(data);
    await model.deleteMany({}).exec();
    await model.insertMany(orders);
    res.json({
        count: orders.length,
    });
};
