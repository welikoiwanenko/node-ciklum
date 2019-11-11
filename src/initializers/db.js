const fs   = require('fs');
const path = require('path');
const util = require('util');
const uuid = require('uuid/v4');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class DB {
    constructor() {
        const dirPath = path.join(__dirname, '../..', 'assets');
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }

        this.filePath = path.join(dirPath, 'db.json');
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([]));
        }
    }

    async getItems() {
        const data = await readFileAsync(this.filePath);
        return JSON.parse(data.toString());
    }

    async createItem({ price, name }) {
        const data = await this.getItems();
        const id = uuid();

        data.push({
            id,
            price,
            name,
        });
        await writeFileAsync(this.filePath, JSON.stringify(data));
        return id;
    }

    async deleteItem(id) {
        const data = await this.getItems();
        const filteredData = data.filter(item => item.id !== id);
        await writeFileAsync(this.filePath, JSON.stringify(filteredData));
    }
}

module.exports = DB;
