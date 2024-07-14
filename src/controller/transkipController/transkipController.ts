import { Request, Response } from "express";
import { transkripService } from "../../service/transkrip.service";
import { ResponseController } from "../response.controller";
import { ErrorHandler } from "../../error.handler";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class transkripController {
  static async get(req: Request, res: Response) {
    try {
      const result = await transkripService.get(req);
      return res.status(200).send(ResponseController.response(res, result));
    } catch (error: any) {
      return ErrorHandler.catch(res, error);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const result = await transkripService.getById(req);
      return res.status(200).send(ResponseController.response(res, result));
    } catch (error: any) {
      return ErrorHandler.catch(res, error);
    }
  }

  static async getByIdMahasiswa(req: Request, res: Response) {
    try {
      const result = await transkripService.getByIdMahasiswa(req);
      return res.status(200).send(ResponseController.response(res, result));
    } catch (error: any) {
      return ErrorHandler.catch(res, error);
    }
  }

  static async post(req: Request, res: Response) {
    try {
      const result = await transkripService.post(req);
      return res.status(201).send(ResponseController.response(res, result));
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError && error.code == "P2002") {
        return ErrorHandler.catch(res, error, "data already exist", 400);
      }
      return ErrorHandler.catch(res, error);
    }
  }

  static async put(req: Request, res: Response) {
    try {
      const result = await transkripService.put(req);
      return res.status(200).send(ResponseController.response(res, result));
    } catch (error: any) {
      return ErrorHandler.catch(res, error);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const result = await transkripService.delete(req);
      return res.status(200).send(ResponseController.response(res, result));
    } catch (error: any) {
      return ErrorHandler.catch(res, error);
    }
  }
}
