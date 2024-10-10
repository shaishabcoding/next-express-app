import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";

const notFound: RequestHandler = (req, res, next): any => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API Not Found !!",
    error: "",
  });
};

export default notFound;
