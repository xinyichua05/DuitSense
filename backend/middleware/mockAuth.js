// Mock Auth Middleware
// Injects a dummy user since auth flow is excluded for now
const mockAuth = (req, res, next) => {
  // We can simulate different users by passing a header, otherwise default to user 1
  const userId = req.headers['x-mock-user-id'] || 1;
  const personaType = req.headers['x-mock-persona'] || 'The YOLO Spender';
  
  req.user = {
    id: parseInt(userId, 10),
    persona_type: personaType
  };
  
  next();
};

module.exports = { mockAuth };
