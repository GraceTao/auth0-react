import express from "express";
import { Storage } from "@google-cloud/storage";
const imagesAPI = express.Router();

const storage = new Storage();
const bucketName = "moco-map-bucket";

imagesAPI.get("/hotspots", async (req, res) => {
   const { folderName } = req.query;
   console.log(`received query: ${folderName}`);
   try {
      const [files] = await storage.bucket(bucketName).getFiles({
         prefix: `${folderName}/`,
         autoPaginate: true,
      });

      // console.log("Files found:", files.map((file) => file.name));

      const imageFiles = files.filter(
         (file) => !file.name.endsWith("/") && file.name.endsWith(".png")
      );

      const imageUrls = imageFiles.map((file) => {
         return {
            name: file.name.slice(folderName.length+1, folderName.length+11),
            url: `https://storage.googleapis.com/${bucketName}/${file.name}`,
            // url: 'https://storage.googleapis.com/moco-map-bucket/Base/2022-03-01.png'
         };
      });
      // console.log(imageUrls);

      res.json(imageUrls);
   } catch (error) {
      console.error("Error fetching images:", error);
      res.status(500).send("Error fetching images");
   }
});



export default imagesAPI;