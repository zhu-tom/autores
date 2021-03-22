import { withIronSession } from 'next-iron-session'


const handler = (req,res) => {
  const { password, ...rest } = req.session.get("user");

  res.json(rest);
};

export default withIronSession(handler, {
  password: "complex_password_at_least_32_characters_long",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
  cookieName: "session"
});