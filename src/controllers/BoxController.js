const Box = require('../models/Box');

class BoxController {

    async store(req, res) {
        const box = await Box.create({ title: req.body.title });

        return res.json(box);
    }

    async getBox(req, res) {
        const boxes = await Box.find({});
        return res.json(boxes);

    }

    async getBoxById(req, res) {
        const box = await Box.findById(req.params.id);
        return res.json(box);
    }

    async show(req, res) {
        const box = await Box.findById(req.params.id).populate({
            path: 'files',
            options: {
                sort: { CreatedAt: -1 }
            }
        });


        return res.json(box);
    }
}

module.exports = new BoxController();