class BaseModel {
    constructor(data, message, token) {
        if (typeof data == 'string') {
            this.message = data;
            data = null;
            message = null;
            token = null;
        }
        if (data) {
            this.data = data;
        }
        if (message) {
            this.message = message;
        }
        if (token) {
            this.token = token;
        }
    }
}

class SuccessModel extends BaseModel {
    constructor(data, message, token) {
        super(data, message, token);
        this.code = 1;
    }
}

class ErrorModel extends BaseModel {
    constructor(data, message, token) {
        super(data, message, token);
        this.code = -1;
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}