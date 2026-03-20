# api-response-normalizer

Standardize API responses across your Node.js applications with a consistent shape for success, error, and paginated payloads.

## Features

- Consistent success response format
- Standardized error response format
- Built-in pagination response helper
- Automatic ISO timestamp metadata
- Lightweight and framework-agnostic

## Installation

```bash
npm install api-response-normalizer
```

## Usage

```js
const { success, error, paginate } = require("api-response-normalizer");
```

### `success(data, message = "Success", meta = {})`

Creates a standardized success response.

```js
const response = success(
	{ id: 1, name: "Ada" },
	"User fetched successfully",
	{ requestId: "abc-123" }
);

console.log(response);
```

Output:

```json
{
	"status": "success",
	"message": "User fetched successfully",
	"data": { "id": 1, "name": "Ada" },
	"meta": {
		"timestamp": "2026-03-20T10:30:00.000Z",
	}
}
```

### `error(message = "Something went wrong somewhere, check", code = 500, details = null)`

Creates a standardized error response.

```js
const response = error(
	"Validation failed",
	400,
	{ field: "email", reason: "Invalid format" }
);

console.log(response);
```

Output:

```json
{
	"status": "error",
	"message": "Validation failed",
	"code": 400,
	"details": { "field": "email", "reason": "Invalid format" },
	"meta": {
		"timestamp": "2026-03-20T10:30:00.000Z"
	}
}
```

### `paginate(data, { page, limit, total })`

Creates a standardized paginated success response.

```js
const users = [
	{ id: 1, name: "Ada" },
	{ id: 2, name: "Grace" }
];

const response = paginate(users, { page: 1, limit: 2, total: 10 });

console.log(response);
```

Output:

```json
{
	"status": "success",
	"data": [
		{ "id": 1, "name": "Ada" },
		{ "id": 2, "name": "Grace" }
	],
	"pagination": {
		"page": 1,
		"limit": 2,
		"total": 10,
		"pages": 5
	},
	"meta": {
		"timestamp": "2026-03-20T10:30:00.000Z"
	}
}
```

## Example with Express

```js
const express = require("express");
const { success, error, paginate } = require("api-response-normalizer");

const app = express();

app.get("/health", (req, res) => {
	res.json(success({ uptime: process.uptime() }, "Service is healthy"));
});

app.get("/users", (req, res) => {
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const total = 42;
	const users = [{ id: 1, name: "Ada" }];

	res.json(paginate(users, { page, limit, total }));
});

app.use((err, req, res, next) => {
	res.status(500).json(error(err.message));
});

app.listen(3000, () => {
	console.log("Server running on http://localhost:3000");
});
```

## API Summary

| Function | Purpose |
| --- | --- |
| `success(data, message?, meta?)` | Create successful response payload |
| `error(message?, code?, details?)` | Create error response payload |
| `paginate(data, { page, limit, total })` | Create paginated response payload |

## License

ISC
