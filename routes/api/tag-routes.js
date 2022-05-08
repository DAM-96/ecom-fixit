const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
    try {
      const tagsResults = await Tag.findAll({
        include: [{ model: Product}]
      });
      res.status(200).json(tagsResults);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagsResults = await Tag.findByPk(req.params.id, {
      include: { model: Product },
    });
    if (!tagsResults) {
      res.status(404).json({ message: "No Tag found with that id" });
      return;
    }
    res.status(200).json(tagsResults);
  } catch {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagsResults = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json({tagsResults, message: "New tag has been created"});
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagsResults = await Tag.update({
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id,
      }
    });
    if (!tagsResults) {
      res.status(404).json({ message: "Unable to find a tag with the specified ID" });
      return;
    }
    res.status(200).json({tagsResults, message: "Tag name successfully updated"});
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: "Unable to find a tag with the specified ID. Nothing was deleted" });
      return;
    }
    res.status(200).json({tagData, message: "Tag successfully deleted"});
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
