const authorize = (req, arr) => {
  console.log(req.session.get("user"));
  return (arr.find(val => req.session.get("user").type === val));
}

export default authorize;