module.exports = async (items, handler) => {
	if (!items || typeof items !== 'object') {
		throw new Error('items should be array or iterator');
	}

	let itemsIterator = items;
	if (itemsIterator.entries) {
		itemsIterator = itemsIterator.entries();
	}

	let lastError;
	for (const [, item] of itemsIterator) {
		try {
			return await handler(item);
		} catch (err) {
			lastError = err;
		}
	}

	throw lastError;
};
