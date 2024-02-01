import jwt from "jsonwebtoken";
export const getUserByToken = function (res, token) {
   if (!token) {
      return res.status(401).json({ message: "Acesso negado" });
   }

   const decodedUser = jwt.verify(token, process.env.SECRET);
   return decodedUser.id;
};
