function success(data, message = "Success", meta={}) {
    return {
        status: "success",
        message,
        data,
        meta: {
            timestamp: new Date().toISOString(),
            ...meta,
        },
    };
}

function error(message = "Something went wrong somewhere, check", code = 500, details = null) {
    return {
        status: "error",
        message,
        code,
        details,
        meta: {
            timestamp: new Date().toISOString(),
        },
    };
}

function paginate(data, { page, limit, total }) {
    return {
        status: "success",
        data,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        meta: {
            timestamp: new Date().toISOString(),
        },
    };
}

module.exports = { success, error, paginate };