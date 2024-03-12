import admin from "firebase-admin";
import { db } from "../db/Firebase";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { apiResponse } from "./../helper/Response";

export class volunteersHandler {
  static createHandler: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //
    try {
      const userJson = {
        batasKodeReferal: req.body.batasKodeReferal,
        created_time: admin.firestore.Timestamp.now(),
        dataSubmitted: req.body.dataSubmitted,
        display_name: req.body.display_name,
        email: req.body.email,
        isAdmin: req.body.isAdmin,
        kode_referal: req.body.kode_referal,
      };
      console.log(userJson);
      const dataRef = (await db.collection("volunteers").add(userJson)).get();
      const data = (await dataRef).data();
      console.log(data);
      res.status(201).json({
        status: "201",
        message: "successfully CREATE document",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };

  static getHandler: RequestHandler = async (req: Request, res: Response) => {
    try {
      const volunteersRef = db.collection("volunteers");
      const response = await volunteersRef.get();
      let dataArray: admin.firestore.DocumentData[] = [];
      response.forEach((doc) => {
        dataArray.push(doc.data());
      });
      res.status(200).send({
        status: "200",
        message: "Berhasil GET data from Firestore",
        data: dataArray,
      });
    } catch (error) {
      res.send(error);
    }
  };

  static getByIDHandler: RequestHandler = async (req: Request, res: Response) => {
    try {
      const volunteersRef = db.collection("volunteers").doc(req.params.id);
      const data = await volunteersRef.get();

      if (!data.exists) {
        return res.status(404).send({
          status: "404 Not Found",
          message: "data with the given ID is not exist",
        });
      } else {
        return res.status(200).send({
          status: "200 Ok",
          message: `succesfully GET data with ID ${req.params.id}`,
          data: data.data(),
        });
      }
    } catch (error) {
      res.send(error);
    }
  };

  static updateHandler: RequestHandler = async (req: Request, res: Response) => {
    try {
      const userJson = {
        batasKodeReferal: req.body.batasKodeReferal,
        created_time: admin.firestore.Timestamp.now(),
        dataSubmitted: req.body.dataSubmitted,
        display_name: req.body.display_name,
        email: req.body.email,
        isAdmin: req.body.isAdmin,
        kode_referal: req.body.kode_referal,
      };
      const volunteersRef = db.collection("volunteers").doc(req.params.id);
      const data = await volunteersRef.get();

      if (!data.exists) {
        return res.status(404).send({
          status: "404 Not Found",
          message: "data with the given ID not exist",
        });
      } else {
        volunteersRef.set(userJson);
        return res.status(200).send({
          status: "200 Ok",
          message: `succesfully UPDATE data with ID ${req.params.id}`,
          data: data.data(),
        });
      }
    } catch (error) {
      res.send(error);
    }
  };

  static deleteHandler: RequestHandler = async (req: Request, res: Response) => {
    try {
      const volunteersRef = db.collection("volunteers").doc(req.params.id);

      const data = await volunteersRef.get();

      if (!data.exists) {
        return res.status(404).send({
          status: "404 Not Found",
          message: "data with the given ID not exist",
        });
      } else {
        volunteersRef.delete();
        return res.status(200).send({
          status: "200 Ok",
          message: `succesfully DELETE data with ID ${req.params.id}`,
          data: data.data(),
        });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  };
}
