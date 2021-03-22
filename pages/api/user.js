import { withIronSession } from 'next-iron-session'


function handler(req,res) {
  const user = req.session.get("user");
  if (!user) res.status(401).send("unauthorized");
  else {
    const {password, ...rest} = user;
    res.json(rest);
  }
};

export default withIronSession(handler, {
  password: "complex_password_at_least_32_characters_long",
  cookieOptions: {
    secure: false,
  },
  cookieName: "session"
});