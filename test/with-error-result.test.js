const expect = require('expect.js');

const pSeriesToSuccess = require('../lib');

describe('run lib with error result', () => {
	const handler = async (item) => {
		if (item.value === 4) {
			return {
				updatedValue: item
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

	it('should throw handler error', async () => {
		let error;

		try {
			await pSeriesToSuccess(items, handler);
		} catch (err) {
			error = err;

			expect(err).ok();
			expect(err.message).equal('Error with value=3');
		}

		expect(error).ok();
	});

	it('should throw items error', async () => {
		let error;

		try {
			await pSeriesToSuccess(null, handler);
		} catch (err) {
			error = err;

			expect(err).ok();
			expect(err.message).equal('items should be array or iterator');
		}

		expect(error).ok();
	});
});
