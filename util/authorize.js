const authorize = (req, arr) => {
  return req.session.get("user") && (arr.find(val => req.session.get("user").type === val));
}

export default authorize;