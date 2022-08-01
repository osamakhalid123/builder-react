import {
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  Tab,
  Typography,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React, { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import { ProfileSettings } from "./ProfileSettings";
import { AccountSettings } from "./AccountSettings";
import { PagesSettings } from "./PagesSettings";

export const Settings = () => {
  const [tabValue, setTabValue] = useState("1");

  const {
    userUid,
    userName,
    userEmail,
    userPhone,
    avatar,
    userAddress,
    pageState,
  } = useOutletContext();

  return (
    <Box sx={{ backgroundColor: "white" }}>
      <Container>
        <Stack
          direction={{ sm: "row", xs: "column" }}
          mt={2}
          mb={2}
          pt={2}
          justifyContent={{ sm: "space-between", xs: "flex-start" }}
          alignItems="flex-start"
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ mb: { sm: 0, xs: 2 } }}
          >
            <Avatar
              src={avatar}
              alt="avatar"
              sx={{ width: 52, height: 52, mr: 2 }}
            />
            <Stack>
              <Typography variant="h6">{userName}</Typography>
              <Typography variant="body2" color="text.secondary">
                Your personal account
              </Typography>
            </Stack>
          </Box>
          <Button
            variant="contained"
            disableElevation
            href="/dashboard/profile"
          >
            Go to your profile
          </Button>
        </Stack>

        <Stack pb={2}>
          <TabContext value={tabValue}>
            <Stack direction={{ md: "row", xs: "column" }} mt={2}>
              <Stack>
                <TabList
                  orientation="vertical"
                  onChange={(e, newValue) => setTabValue(newValue)}
                  sx={{
                    ".MuiTabs-indicator": {
                      left: 0,
                    },
                  }}
                >
                  <Tab
                    label="Profile"
                    value="1"
                    icon={<PersonIcon />}
                    iconPosition="start"
                    component={Link}
                    to="profile"
                    sx={{
                      justifyContent: "flex-start",
                      minHeight: "fit-content",
                    }}
                  />
                  <Tab
                    label="Account"
                    value="2"
                    icon={<SettingsIcon />}
                    iconPosition="start"
                    component={Link}
                    to="account"
                    sx={{
                      justifyContent: "flex-start",
                      minHeight: "fit-content",
                    }}
                  />
                  <Tab
                    label="Pages"
                    value="3"
                    icon={<BrushOutlinedIcon />}
                    iconPosition="start"
                    component={Link}
                    to="pages"
                    sx={{
                      justifyContent: "flex-start",
                      minHeight: "fit-content",
                    }}
                  />
                </TabList>
              </Stack>
              <Stack sx={{ flexGrow: 1 }}>
                <TabPanel
                  value="1"
                  sx={{ padding: { md: "0 0 0 24px", xs: "24px 0 0 0" } }}
                >
                  <ProfileSettings
                    avatar={avatar}
                    userAddress={userAddress}
                    userUid={userUid}
                  />
                </TabPanel>

                <TabPanel
                  value="2"
                  sx={{ padding: { sm: "0 0 0 24px", xs: "24px 0 0 0" } }}
                >
                  <AccountSettings
                    userEmail={userEmail}
                    userPhone={userPhone}
                    userUid={userUid}
                  />
                </TabPanel>

                <TabPanel
                  value="3"
                  sx={{ padding: { sm: "0 0 0 24px", xs: "24px 0 0 0" } }}
                >
                  <PagesSettings userUid={userUid} pageState={pageState} />
                </TabPanel>
              </Stack>
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </Box>
  );
};
