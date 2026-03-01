export const validate = (schema) => async (req, _res, next) => {
  try {
    await schema.parseAsync({
      body: req.body,
      params: req.params,
      query: req.query
    });

    return next();
  } catch (error) {
    const message =
      error?.issues?.map((issue) => issue.message).join(', ') ||
      'Validation failed';

    return next(
      Object.assign(new Error(message), {
        statusCode: 400
      })
    );
  }
};
