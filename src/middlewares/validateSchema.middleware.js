export default function validateSchema(schema) {
  return (req, res, next) => {
    const validationResult = schema.validate(req.body, { abortEarly: false });

    if (validationResult.error) {
      const errors = validationResult.error.details.map(
        (detail) => detail.message
      );
      res.status(400).send(errors);
    }

    next();
  };
}
