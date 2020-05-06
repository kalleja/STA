const Validator = require("validator");
const { Record } = require("immutable");

const ErrorRecord = Record({
    name: null,
    password: null
});

module.exports = data => {
    const errors = new ErrorRecord({
        name: !Validator.isLength(String(data.name), { min: 5, max: 8 })
            ? "Name must be between 5 and 8 characters"
            : null,
        password: !Validator.isLength(String(data.password), {
            min: 5,
            max: 8
        })
            ? "Password must be between 5 and 8 characters"
            : null
    });

    return {
        errors: errors.toJS(),
        isValid: errors.equals(new ErrorRecord())
    };
};
