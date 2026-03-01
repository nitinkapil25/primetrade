export const healthCheck = async (_req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: 'Service is healthy',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return next(error);
  }
};

