const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
router.get("/", async (req, res) => {
  // find all products
  try {
    const ProductData = await Product.findAll();
    res.status(200).json(ProductData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    const ProductData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }]
    });

    if (!ProductData) {
      res.status(404).json({ message: 'No Product found with this id!' });
      return;
    }

    res.status(200).json(ProductData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// create new product
router.post("/", async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
    try {
      const ProductData = await Product.create(req.body);
      res.status(200).json(ProductData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// update product
router.put("/:id", async (req, res) => {
  try {
    const ProductData = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!ProductData[0]) {
      res.status(404).json({ message: 'No Product with this id!' });
      return;
    }
    res.status(200).json(ProductData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete one product by its `id` value
  try {
    const ProductData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!ProductData) {
      res.status(404).json({ message: 'No Product found with that id!' });
      return;
    }

    res.status(200).json(ProductData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;