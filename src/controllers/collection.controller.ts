import { Request, Response } from "express";
import {
  createCollection,
  deleteCollection,
  getCollections,
  findHomeCollection,
  updateHomeCollection,
  updateCollection,
} from "../db/collection.database";
import { findProductsByCollection } from "../db/products.database";
import { IImage } from "../interfaces/collection.interface";

export async function handleGetCollections(req: Request, res: Response) {
  try {
    const collections = await getCollections();

    return res.status(200).json(collections);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function handleCreateCollection(req: Request, res: Response) {
  const { name, description, season, author, lookbook } = req.body as {
    name: string;
    description: string;
    season: string;
    author: string;
    lookbook: IImage[];
  };

  try {
    if (!name || !description || !season || !author || lookbook.length === 0) {
      return res.sendStatus(400);
    }
    if (lookbook.length < 3) {
      return res.sendStatus(400);
    }

    const cover = [lookbook[0].url, lookbook[1].url, lookbook[2].url];

    const newCollection = await createCollection({
      name,
      description,
      season,
      author,
      lookbook,
      cover,
    });

    return res.status(201).json(newCollection);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function handleUpdateCollection(req: Request, res: Response) {
  const { id } = req.params;
  const { name, description, season, author, cover, homePage } = req.body as {
    name: string;
    description: string;
    season: string;
    author: string;
    cover: string[];
    homePage: boolean;
  }; //sempre mandar valores, nunca empty

  try {
    //find collection that homePage === true
    const collection = await findHomeCollection();

    if (!collection && homePage === false) {
      return res
        .status(400)
        .json("Você precisa de pelomenos um produto na home page.");
    }

    if (collection && homePage === false && String(collection._id) === id) {
      return res
        .status(400)
        .json("Você precisa de pelomenos um produto na home page.");
    }

    if (collection && homePage === true && String(collection._id) !== id) {
      await updateHomeCollection(String(collection._id));
    }

    const updatedCollection = await updateCollection(
      { name, description, season, author, cover, homePage },
      id
    );

    return res.status(200).json(updatedCollection);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function handleDeleteCollection(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const products = await findProductsByCollection(id);

    if (products.length > 0) {
      return res
        .status(405)
        .json(
          "Existem produtos com essa coleção. Delete eles ou apenas atualize as informações sobre esta coleção."
        );
    }

    const response = await deleteCollection(id);

    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
}
