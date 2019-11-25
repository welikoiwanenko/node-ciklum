const fs   = require('fs');
const path = require('path');
const util = require('util');
const uuid = require('uuid/v4');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class DB {
    dbFilename = '';
    constructor() {
        const dbRootDir = path.join(__dirname, '../..', 'assets');
        if (!fs.existsSync(dbRootDir)) {
            fs.mkdirSync(dbRootDir);
        }

        const dbFilename = path.join(dbRootDir, process.env.TEST_MODE ? 'db_test.json' : 'db.json');
        if (!fs.existsSync(dbFilename)) {
            fs.writeFileSync(dbFilename, JSON.stringify([]));
        }
        this.dbFilename = dbFilename;
    }

    async readDb() {
        const content = await readFileAsync(this.dbFilename);
        return JSON.parse(content.toString());
    }

    async writeDb(items) {
        await writeFileAsync(this.dbFilename, JSON.stringify( items ));
    }

    async truncateDb() {
        await writeFileAsync(this.dbFilename, JSON.stringify( [] ));
    }

    async getItems() {
        return this.readDb();
    }

    async getItem(id) {
        const items = await this.readDb();

        return items.filter(product => product.id === id)[0];
    };

    async createItem({ price, name }) {
        const items = await this.readDb();
        const item = { id: uuid(), name, price };
        items.push(item);

        await this.writeDb(items);

        return item;
    }

    async updateItem(id, props) {
        const currentItems = await this.readDb();
        let updatedItem = [];
        const items = currentItems.map(item => {
            if (item.id === id) {
                updatedItem = { id, ...props };
                return updatedItem;
            }
            return item;
        });

        await this.writeDb(items);
        return updatedItem;
    };

    async deleteItem(id) {
        const currentItems = await this.readDb();
        let items = currentItems.filter(product => product.id !== id);

        await this.writeDb(items);
    }
}

module.exports = DB;
