const notFound = (req, res) => {
  res.status(404).json({ error: "Not found", path: req.path });
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Misadventure has occurred!" });
};

export { notFound, errorHandler };
