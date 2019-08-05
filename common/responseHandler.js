const ResponseHandler = (() => {
    const handleError = (res, err) => {
        if (typeof err.code !== "undefined") {
            return res.status(err.code).send(err.message);
        }

        return res.status(500).send();
    };

    return {
        handleError: handleError
    };
})();

module.exports = ResponseHandler;