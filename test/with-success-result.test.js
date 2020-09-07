const expect = require('expect.js');

const pSeriesToSuccess = require('../lib');

describe('run lib with success result', () => {
	const handler = async (item) => {
		if (item.value === 2) {
			return {
				updatedValue: item.value
			};
		} else {
			throw new Error(`Error with value=${item.value}`);
		}
	};

	const items = [
		{value: 1},
		{value: 2},
		{value: 3}
	];

	it('call with array, should return result', async () => {
		const result = await pSeriesToSuccess(items, handler);

		expect(result).eql({updatedValue: 2});
	});

	it('call with iterator, should return result', async () => {
		const result = await pSeriesToSuccess(items.entries(), handler);

		expect(result).eql({updatedValue: 2});
	});
});
