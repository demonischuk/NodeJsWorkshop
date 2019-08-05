const express = require("express");
const gamesRouter = express.Router();

const responseHandler = require("../common/responseHandler");
const GameEntity = require("../entities/gameEntity");

const create = (request) => {
    return new Promise((resolve, reject) => {
        let issues = [];

        if (!request.name) {
            issues.push("Name is required");
        }

        if (typeof request.rating === "undefined") {
            issues.push("Rating is required");
        } else {
            const rating = parseInt(request.rating);

            if (isNaN(rating) || rating < 1 || rating > 10) {
                issues.push("Rating must be a whole number between 1 and 10");
            }
        }

        if (issues.length) {
            reject({
                code: 400,
                message: issues.join(", ")
            });

            return;
        }
        
        let entity = new GameEntity({
            name: request.name,
            rating: request.rating
        });

        entity.save(err => {
            if (err) {
                console.log(err);
                reject(err);
            }

            resolve(entity);
        });
    });
};
const getAll = () => {
    return new Promise((resolve, reject) => {
        GameEntity.find((err, entities) => {
            if (err) {
                reject(err);
            } else {
                resolve(entities);
            }
        });
    });
};
const getById = (id) => {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject({
                code: 400,
                message: "Id is required"
            });

            return;
        }
        
        GameEntity.findById(id, (err, entity) => {
            if (err) {
                reject(err);
            } else {
                resolve(entity);
            }
        });
    });
};

gamesRouter.route("/games")
    .get((req, res) => {
        return getAll()
        .then(entities => {
            return res.status(200).json(entities);
        }, err => {
            return responseHandler.handleError(res, err);
        });
    })
    .post((req, res) => {
        return create(req.body)
            .then(createdEntity => {
                return res.status(201).json({
                    id: createdEntity.id
                });
            }, err => {
                return responseHandler.handleError(res, err);
            });
    });
gamesRouter.route("/games/:id")
    .get((req, res) => {
        return getById(req.params.id)
        .then(entity => {
            return res.status(200).json(entity);
        }, err => {
            return responseHandler.handleError(res, err);
        });
    });

module.exports = gamesRouter;