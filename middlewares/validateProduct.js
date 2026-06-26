export const validateProduct = (req, res, next) => {
  const { name, quantity } = req.body;

  if (!name || name.length < 3 || name.length > 40) {
    return res.status(422).json({
      error: "Name must be between 3 and 40 characters"
    });
  }

  if (quantity === undefined || isNaN(quantity) || Number(quantity) < 0) {
    return res.status(422).json({
      error: "Quantity must be a number >= 0"
    });
  }

  next();
};