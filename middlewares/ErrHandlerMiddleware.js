export const errHandler = () => {
  console.error(`Error: ${err.message}`);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
    stack: err.stack,
  });
};
