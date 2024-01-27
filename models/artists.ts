import { Artist, ArtistWithoutId } from "../types/artist";
import * as db from "../db";
import { ObjectId } from "mongodb";

export const all = (): Promise<Artist[]> => {
  return db.get().collection("artists").find<Artist>({}).toArray();
};

export const findById = (id: string): Promise<Artist | null> => {
  return db
    .get()
    .collection("artists")
    .findOne<Artist>({ _id: new ObjectId(id) });
};
export const create = async (artist: ArtistWithoutId): Promise<Artist> => {
  await db.get().collection("artists").insertOne(artist);
  return artist as Artist;
};

export const updateById = async (
  id: string,
  artist: ArtistWithoutId
): Promise<Artist> => {
  await db
    .get()
    .collection("artists")
    .updateOne({ _id: new ObjectId(id) }, { $set: artist });
  console.log("model", artist);
  return { ...artist, _id: id };
};

export const deleteById = async (id: string): Promise<boolean> => {
  const result = await db
    .get()
    .collection("artists")
    .deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
};
