import { Typography, Link, Box } from "@mui/material";
import gridlines from "../../assets/gridlines.png";
import gridlineshotspots from "../../assets/gridlineshotspots.png";
import censuslines from "../../assets/censuslines.png";
import EnlargeableImage from "./EnlargeableImage";

export default function ModelInfo() {
   return (
      <>
         <Typography>
            <Link
               href="https://en.wikipedia.org/wiki/Geolitica"
               target="_blank"
               rel="noreferrer"
            >
               <b>PredPol (now Geolitica)</b>
            </Link>{" "}
            is a leading predictive policing algorithm, using an epidemic type
            aftershock model to predict crime rates. However, PredPol often
            leads to positive feedback loops and reinforces historical bias.
         </Typography>
         <Typography
            sx={{
               fontSize: {
                  xs: "0.95rem !important",
                  sm: "1rem !important",
                  md: "1.1rem !important",
               },
               fontWeight: "bold",
            }}
         >
            Team GAHSP's Solution: A Fairer Crime Prediction Model
         </Typography>
         <Typography>
            As an improvement to the flawed PredPol,{" "}
            <Link
               href="https://auto.gluon.ai/stable/index.html"
               target="_blank"
               rel="noreferrer"
            >
               AutoGluon
            </Link>{" "}
            was used to train multiple models and select the best-performing one
            based on fairness and bias-reduction metrics. The model uses data
            from the{" "}
            <Link
               href="https://data.montgomerycountymd.gov/Public-Safety/Crime/icn6-v9z3/about_data"
               target="_blank"
               rel="noreferrer"
            >
               Montgomery County Crime Portal
            </Link>
            . This page displays a slideshow of the top 100 predicted hotspots
            in Montgomery County over a period of 360 days using this improved
            model.
         </Typography>
         <Typography>
            To determine hotspots, Montgomery County was first divided into 400m
            by 400m cells, each with a cell id:
         </Typography>

         <EnlargeableImage
            src={gridlines}
            alt={"Gridlines overlay on MoCo boundaries"}
            zoomedAlt={"Zoomed Gridlines overlay on MoCo boundaries"}
         />

         <Typography>
            The AutoGluon model outputs predicted future crime rates for each
            cell, and the 100 cells with the highest predicted crime rates are
            designated as hotspots. For each of the 360 prediction days, the
            hotspots were plotted:
         </Typography>
         <EnlargeableImage
            src={gridlineshotspots}
            alt={"Gridlines overlay on MoCo boundaries with hotspots"}
            zoomedAlt={
               "Zoomed Gridlines overlay on MoCo boundaries with hotspots"
            }
         />
         <Typography>
            The predicted hotspots were then overlaid onto a GIS census blocks
            map, which contains demographic features to filter on.
         </Typography>

         <EnlargeableImage
            src={censuslines}
            alt={"Census overlay on MoCo boundaries"}
            zoomedAlt={"Zoomed Census overlay on MoCo boundaries"}
         />
         <Typography
            sx={{
               fontSize: {
                  xs: "0.95rem !important",
                  sm: "1rem !important",
                  md: "1.1rem !important",
               },
               fontWeight: "bold",
            }}
         >
            What's Next?
         </Typography>
         <Typography>
            We're expanding our model to other cities with open data, including
            Chicago. Future improvements include incorporating further
            demographic context (income levels, etc.), displaying live-updating
            predicted hotspots maps, and enabling user-uploaded training data.
         </Typography>
         <Typography>
            To explore the technical details—including model evaluation, loss
            functions, and a full comparison with PredPol—read the full{" "}
            <Link href="/model" target="_blank" rel="noreferrer">
               <b>GAHSP Thesis</b>
            </Link>.
         </Typography>
      </>
   );
}
