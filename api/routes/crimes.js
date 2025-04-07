import express from "express";
import axios from "axios";

const crimesAPI = express.Router();

const URL = "https://data.montgomerycountymd.gov/resource/icn6-v9z3.json";
const SODA_API_TOKEN = "qBrdfukFeTG5upnBLdCNnmuYb";

const getDateNDaysAgo = (days) => {
   const date = new Date();
   date.setDate(date.getDate() - days);
   return date.toISOString().split("T")[0];
};

function convertToGeoJson(data) {
   return {
      type: "FeatureCollection",
      features: data
         .filter((item) => item.latitude && item.longitude)
         .map((item) => ({
            type: "Feature",
            geometry: {
               type: "Point",
               coordinates: [
                  parseFloat(item.longitude),
                  parseFloat(item.latitude),
               ],
            },
            properties: {
               start_date: item.start_date?.split("T")[0] || "",
               start_time: item.start_date?.includes("T")
                  ? item.start_date.split("T")[1].split(".")[0]
                  : "",
               Crime_Against: item.crimename1,
               NIBRS_CrimeName: item.crimename2,
               Offense_Name: item.crimename3,
               place: item.place,
               weight: item.weight,
            },
         })),
   };
}

crimesAPI.get("/filter", async (req, res) => {
   console.log("Received query:", req.query); // Debugging log

   const {
      days = 30,
      crimes_against,
      crime_categories,
      start_date,
      end_date,
      police_district,
   } = req.query;

   try {
      const whereClauses = [];

      const startDateFilter = start_date
         ? `start_date >= '${start_date}'`
         : `start_date >= '${getDateNDaysAgo(days)}'`;

      whereClauses.push(startDateFilter);

      if (end_date) {   
         whereClauses.push(`start_date <= '${end_date}'`)
      }
      
      if (crimes_against && crimes_against !== "null") {
         whereClauses.push(`crimename1 IN ('${crimes_against.split(",").join("','")}')`);
      }

      if (crime_categories && crime_categories !== "null") {
         whereClauses.push(`category IN ('${crime_categories.split(",").join("','")}')`);
      }

      if (police_district && police_district !== "null") {
         whereClauses.push(`district IN ('${police_district.split(",").join("','")}')`);
      }

      console.log(whereClauses.join(" AND "));

      const { data } = await axios.get(URL, {
         params: {
            $limit: 1000,
            $order: "start_date DESC",
            $select:
               "nibrs_code,start_date,crimename1,crimename2,crimename3,latitude,longitude,place",
            $where: whereClauses.join(" AND "),
            $$app_token: SODA_API_TOKEN,
         },
      });

      // console.log(convertToGeoJson(data));

      res.json(convertToGeoJson(data));
   } catch (error) {
      console.error("Error fetching crime data:", error);
      res.status(500).json({ error: "Failed to fetch crime data" });
   }
});


export default crimesAPI;
