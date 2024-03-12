import admin from "firebase-admin"
import { db } from "../db/Firebase"; 
import { Request, Response, NextFunction, RequestHandler } from "express";
import { apiResponse } from "./../helper/Response";


export class votersHandler {
    
    static createHandler: RequestHandler = async (req: Request, res: Response) => {
        try {
            
            const userJson = req.body
            const dataRef = (await db.collection("voters").add(userJson)).get();
            const data = (await dataRef).data()
            console.log("berhasil tambah Voters collection ke firestore");
            res.status(201).json({
                status: '201',
                message: 'Successfully CREATE document',
                data: data
            });
        } catch (error) {
            res.send(error)
        }
    }

    static getHandler: RequestHandler = async (req: Request, res: Response) => {
        //
        try {
            const dataRef = db.collection("voters")
            const data = await dataRef.get()
            let dataArray: admin.firestore.DocumentData[] = []
            data.forEach(doc => {dataArray.push(doc.data())})
            res.status(200).send({
                status: "ok",
                message: "Berhasil GET data",
                data: dataArray
            });
        } catch (error) {
            res.send(error)
        }
    }

    static getByIDHandler: RequestHandler = async (req: Request, res: Response) => {
        try {
            const dataRef = db.collection("voters").doc(req.params.id);
            const data = await dataRef.get();
    
            if (!data.exists) {
                return res.status(404).send({
                    status: '404 Not Found',
                    message: 'data with the given ID is not exist',
                })
            } else {
                return res.status(200).send({
                    status: '200 Ok',
                    message: `succesfully GET data with ID ${req.params.id}`,
                    data: data.data()
                })
            }
        } catch (error) {
            res.send(error)
        }
    }

    static updateHandler: RequestHandler = async (req: Request, res: Response) => {
        try {
            const userJson = {
                desa: req.body.desa,
                jenis_kelamin: req.body.jenis_kelamin,
                kecamatan: req.body.kecamatan,
                nama: req.body.nama,
                rt: req.body.rt,
                rw : req.body.rw,
                tps : req.body.tps,
                usia : req.body.usia,
                nomor : req.body.nomor
            }
            const dataRef = db.collection("voters").doc(req.params.id);
            const data = await dataRef.get();
    
            if (!data.exists) {
                return res.status(404).send({
                    status: '404 Not Found',
                    message: 'data with the given ID not exist',
                })
            } else {
                dataRef.set(userJson);
                return res.status(200).send({
                    status: '200 Ok',
                    message: `succesfully UPDATE data with ID ${req.params.id}`,
                    data: data.data()
                })
            } 
        } catch (error) {
            res.send(error);
        }
    }

    static deleteHandler: RequestHandler = async (req: Request, res: Response) => {
        try {
            const dataRef = db.collection("voters").doc(req.params.id);
    
            const data = await dataRef.get()
    
            if (!data.exists) {
                return res.status(404).send({
                    status: '404 Not Found',
                    message: 'data with the given ID not exist',
                })
            } else {
                dataRef.delete()
                return res.status(200).send({
                    status: '200 Ok',
                    message: `succesfully DELETE data with ID ${req.params.id}`,
                    data: data.data()
                })
            }
        } catch (error) {
            res.status(400).send(error)
        }
    }

}
