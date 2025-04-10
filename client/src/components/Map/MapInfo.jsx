import { Typography, Link } from "@mui/material";

export default function MapInfo() {
   return (
      <>
         <Typography>
            Crime data is sourced from the{" "}
            <Link
               href="https://data.montgomerycountymd.gov/Public-Safety/Crime/icn6-v9z3/about_data"
               target="_blank"
               rel="noreferrer"
            >
               <b>Montgomery County Crime Portal</b>
            </Link>{" "}
            via its public API. Each map marker represents a reported police
            response or incident. Please note that{" "}
            <b>not all recorded incidents are classified as crimes</b>;
            incidents that are not criminal in nature are categorized under the
            broad label <b>"All Other Offenses"</b> in the NIBRS classification
            system.
         </Typography>

         <Typography>
            The "All Other Offenses" category includes administrative or
            non-criminal responses such as:
            <ul>
               <li>Welfare checks</li>
               <li>Sudden deaths</li>
               <li>Mental illness-related calls</li>
               <li>Missing persons</li>
               <li>Fugitive apprehensions</li>
               <li>Recovery of property</li>
               <li>Police information reports</li>
               <li>Other miscellaneous or uncategorized incidents</li>
            </ul>
            These incidents may require police attention but are not considered
            crimes under federal or local law.
         </Typography>

         <Typography>
            Offenses are categorized using the{" "}
            <Link
               href="https://en.wikipedia.org/wiki/National_Incident-Based_Reporting_System"
               target="_blank"
               rel="noreferrer"
            >
               <b>National Incident-Based Reporting System (NIBRS)</b>
            </Link>
            , a standardized framework developed by the FBI that classifies
            criminal offenses into 62 distinct categories. These include 52
            Group A offenses (which are generally more serious or frequently
            reported) and 10 Group B offenses (typically less severe), each
            falling under either the "Crimes Against Property", "Crimes Against
            Person", or "Crimes Against Society" umbrellas. To learn more about
            NIBRS offenses and groupings, please refer to the{" "}
            <Link
               href="https://bjs.ojp.gov/sites/g/files/xyckuh236/files/sarble/data_common/nibrs-user-manual-2021-1041521.pdf"
               target="_blank"
               rel="noreferrer"
            >
               user manual
            </Link>
            .
         </Typography>

         <Typography>
            Note that Montgomery County continues to log data for the "Crime
            Against Not a Crime" umbrella, which includes only the “Runaway”
            offense. Although still reported, runaways have no longer been part
            of the NIBRS codes since 2011.
         </Typography>
      </>
   );
}
