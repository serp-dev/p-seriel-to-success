# p-series-to-success

Runs an asynchronous handler sequentially for each item until a successful result is obtained. If the result is not received, function throw last error.

## Install

```
$ npm install p-series
```

## API

### pSeriesToSuccess(items, handler);

Returns a `Promise` that is fulfilled when handler function return success result for item. The fulfilled value is is the successful result of executing the handler function.

#### items

Type: `Iterable|Array`

#### options

Type: `Function`

## Usage

Successful example, get the result of the handler function:

```js
const pSeriesToSuccess = require('p-series-to-success');

await pSeriesToSuccess([
	{value: 1},
	{value: 2},
	{value: 3}
], async (item) => {
	if (item.value === 2) {
		return {
			updatedValue: item.value
		};
	} else {
		throw new Error(`Error with value=${item.value}`);
	}
}); // return {updateValue: 2}
```


Not a successful example, get the error of the last call of the handler:

```js
const pSeriesToSuccess = require('p-series-to-success');

await pSeriesToSuccess([
	{value: 1},
	{value: 2},
	{value: 3}
], async (item) => {
	if (item.value === 4) {
		return {
			updatedValue: item.value
		};
	} else {
		throw new Error(`Error with value=${item.value}`);
	}
}); // throw error with message 'Error with value=3'
```
