module.exports = (req, res, next) => {
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'Title is required and must be a string' });
    }
    next();
};