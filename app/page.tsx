/* eslint-disable jsx-a11y/alt-text */
"use client";

import { scrape } from "@/actions/scrape";
import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import TextField from "@mui/material/TextField";

interface ScrapedData {
  name: string | null;
  tagline: string | null;
  location: string | null;
  profilePic: string | null;
  experience: {
    logo: string | null | undefined;
    details: (string | null)[];
  }[];
}

Font.register({
  family: "Oswald",
  src: "http://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#E4E4E4",
    fontFamily: "Oswald",
  },
  section: {
    marginHorizontal: "10px",
    padding: "10px",
    flexGrow: 1,
  },
  fixed: {
    bottom: 0,
    left: 0,
    width: "100%",
    padding: "10px",
    position: "absolute",
    color: "#564f4f",
  },
  textField: {
    margin: "10px",
  },
  button: {
    margin: "20px",
  },
  heading: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  name: { fontSize: "30px" },
  profile: {
    fontSize: "20px",
    color: "#564f4f",
    maxWidth: "390px",
  },
  profilePic: {
    height: "100px",
    width: "100px",
    borderRadius: "50%",
  },
  profilePicContainer: { marginHorizontal: "10px" },
  profileDetails: {
    marginHorizontal: "30px",
  },
  experience: {
    marginVertical: "30px",
    display: "flex",
    flexDirection: "row",
    marginRight: "40px",
    fontSize: "15px",
  },
  logo: {
    height: "50px",
    width: "50px",
    marginRight: "10px",
  },
  experienceHeader: { marginTop: "20px", marginHorizontal: "55px" },
  experienceHeaderText: {
    fontSize: "22px",
    borderBottom: "solid",
    borderBottomWidth: "1px",
    borderBottomColor: "#564f4f",
  },
  experienceHeadline: { color: "#262424", fontSize: "18px" },
  experienceDetails: {
    marginRight: "50px",
    color: "#564f4f",
  },
});

const LinkedInPDF = ({ scrapedData }: { scrapedData: ScrapedData }) => (
  <PDFViewer width={"100%"} height={"1200"}>
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.heading}>
            <View style={styles.profilePicContainer}>
              <Image
                style={styles.profilePic}
                src={
                  scrapedData.profilePic ||
                  "https://static-00.iconduck.com/assets.00/profile-icon-2048x2048-yj5zf8da.png"
                }
              ></Image>
            </View>
            <View style={styles.profileDetails}>
              <View style={styles.name}>
                <Text>{scrapedData.name}</Text>
              </View>
              <View style={styles.profile}>
                {scrapedData.tagline && (
                  <Text>{scrapedData.tagline.trim()}</Text>
                )}
                {scrapedData.location && (
                  <Text>{scrapedData.location.trim()}</Text>
                )}
              </View>
            </View>
          </View>
          <View style={styles.experienceHeader}>
            <Text style={styles.experienceHeaderText}>Experience</Text>
          </View>
          {scrapedData.experience.map((ex, index) => {
            return (
              <View
                style={styles.experience}
                wrap={false}
                key={`experience-${index}`}
              >
                <View style={styles.logo}>
                  <Image
                    src={
                      ex.logo ||
                      "https://cdn.pixabay.com/photo/2017/08/30/11/45/building-2696768_1280.png"
                    }
                    key={`logo-${index}`}
                  ></Image>
                </View>
                <View style={styles.experienceDetails}>
                  <Text
                    style={styles.experienceHeadline}
                    key={`details-${index}-0`}
                  >
                    {ex.details[0]?.trim()}
                  </Text>
                  {ex.details.slice(1).map((deets, deetIndex) => (
                    <Text key={`details-${index}-${deetIndex}`}>
                      {deets?.trim()}
                    </Text>
                  ))}
                </View>
              </View>
            );
          })}
        </View>
        <Text style={styles.fixed} fixed>
          {scrapedData.name}
        </Text>
      </Page>
    </Document>
  </PDFViewer>
);

export default function Home() {
  const [chromeSocket, setChromeSocket] = useState("");
  const [linkedInURL, setLinkedInURL] = useState("");
  const [scrapedData, setScrapedData] = useState<ScrapedData | undefined>(
    undefined
  );
  const handleSubmit = async () => {
    try {
      const data = await scrape(chromeSocket, linkedInURL);
      setScrapedData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="lg">
      <AppBar>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            LinkedIn Profile PDF Maker
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Toolbar />
        <div>
          <TextField
            id="chrome-socket"
            label="Chrome Dev Socket"
            variant="standard"
            value={chromeSocket}
            onChange={(e) => setChromeSocket(e.target.value)}
            style={styles.textField}
          />
          <TextField
            id="linkedin-url"
            label="LinkedIn URL"
            variant="standard"
            value={linkedInURL}
            onChange={(e) => setLinkedInURL(e.target.value)}
            style={styles.textField}
          />
          <Button onClick={async () => handleSubmit()} style={styles.button}>
            click me
          </Button>
        </div>
        {scrapedData && scrapedData.name && (
          <>
            <h1>Profile of {scrapedData.name} has been generated</h1>
            <LinkedInPDF scrapedData={scrapedData} />
          </>
        )}
      </Box>
    </Container>
  );
}
