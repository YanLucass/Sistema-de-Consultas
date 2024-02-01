import { NextFunction } from "express";
//helper;
import getToken from "./get-token";
//jwt
import jwt from "jsonwebtoken";

//Function middleware to add user to request and check token validations
export const verifyToken = (req, res, next: NextFunction) => {
   // Checks if the Authorization header is present in the request.
   if (!req.headers.authorization) {
      return res.status(401).json({ message: "Access denied!" });
   }

   // Tries to get the token from the request using the getToken function.
   const token = getToken(req);

   // Checks if a token is present.
   if (!token) {
      return res.status(401).json({ message: "Access denied!" });
   }

   // Tries to decode the token to obtain user information.
   try {
      const decodedUser = jwt.verify(token, process.env.SECRET);

      // Adds user information to the request object (req).
      req.user = decodedUser;
      // Proceeds to the next middleware or route.
      next();
   } catch (error) {
      // Handles the case of an invalid token.
      console.log(error);
      return res.status(401).json({ message: "Invalid token!" });
   }
};
