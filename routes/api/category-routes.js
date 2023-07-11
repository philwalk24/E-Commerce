const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const allCats = await Category.findAll({
      include: {
        model: Product,
        as: 'products'
      }
    });

    res.json(allCats);
  } catch(err){
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  try{
    const catID = req.params.id;
    const theCat = await Category.findByPk(catID,{
      include: {
        model: Product,
        as: 'products'
      }
    });
    if(!theCat){
      return res.status(404).json({message: 'Category DNE'});
    }

    // filtered so only those products appear
    const onlyCat = theCat.products;
    res.json(onlyCat);
  }catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{
      const newCat = await Category.create(req.body);
      res.status(200).json(newCat);
  }catch(err){
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value

  try{
    const id = req.params.id;
    //const CategoryProd
  }catch(err){

  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
      const deletedID = req.params.id;
      const deletedCat = await Category.destroy({
        where: {
          id: deletedID
        }
      });
      if (!deletedCat) {
        res.status(404).json({ message: 'No Category found with this id!' });
        return;
      }
      res.status(200).json(deletedCat);
  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
