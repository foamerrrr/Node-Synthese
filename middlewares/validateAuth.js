export const validateAuth = (req, res, next) => {
  const { email, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return res.status(422).json({ error: "Invalid email" });
  }

  if (!password || password.length < 6) {
    return res.status(422).json({ error: "Password too short" });
  }

  next();
};