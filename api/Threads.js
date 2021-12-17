const express = require("express");
const mongoose = require("mongoose");
const Thread = require("../models/Thread");
const router = express.Router();
//const { connect } = require("http2");

let threads = [];

router.get("/", (req, res, next) => {
    Thread.find({}, (err, threads) => {

        if(err) return next(err);
        if(threads) {
            return res.json(threads);
        } else {
            return res.status(404).send("Not found");
        }
    })
})

router.get("/:id", (req, res, next) => {
    Thread.findById( req.params.id, (err, thread) => {
        if(err) {
            if (err.name === "CastError") {
                return res.status(404).send(`Thread id ${req.params.id} not found!`);
            }
            return next(err);
        }
        if(thread) {
            return res.send(thread);
        }
        else {
            return res.status(404).send(`Thread id ${req.params.id} not found!`);
        }
    })
})

router.get("/name/:thread", (req, res, next) => {
    const name = req.params.thread;
    Thread.find( {content: new RegExp(name, "i")}, (err, threads) => {
        if(err) return next(err);
        if(threads.length > 0) {
            return res.send(threads);
        } else {
            return res.status(404).send("There is no thread including " + name);
        }

    });

})



router.post("/", (req, res, next) => {
    Thread.findOne({ content: req.body.thread}, (err, thread) => {
        if(err) return next(err);
        if(!thread) {
            new Thread({
                content: req.body.thread,
                author: "timo",
                authorID: 322,
                edited: req.body.vip,
                date: Date.now()
            }).save((err) => {
                if(err) return next(err);
                return res.send(req.body);
            });

        } else {
            return res.status(403).send("Already has that thread!");

        }


    });
})



module.exports = router;
