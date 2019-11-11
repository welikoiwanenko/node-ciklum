let items = [
    {
        id: 1,
        price: 100,
        name: 'Water',
    },
    {
        id: 2,
        price: 150,
        name: 'Bread'
    },
];

function writeItem(data) {
    const latestId = items[items.length - 1].id + 1;

    items.push({
        ...data,
        id: latestId
    });
}

function getItems() {
    return items;
}

function deleteItem(id) {
    items = items.filter(item => item.id !== id);
}

function updateItem(id, data) {
    let updatedItem = null;

    items = items.map(item => {
        if (item.id === id) {
            updatedItem = {
                id,
                ...data
            };

            return updatedItem;
        } else {
            return item;
        }
    });

    return updatedItem;
}

module.exports = {
    writeItem,
    getItems,
    deleteItem,
    updateItem,
};
