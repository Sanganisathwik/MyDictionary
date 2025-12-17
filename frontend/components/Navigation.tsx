"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
} from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isWords = pathname.startsWith("/words");

  return (
    <AppBar position="static" sx={{ mb: 0 }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ gap: 2 }}>
          <MenuBookIcon sx={{ fontSize: 32 }} />
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: 700, cursor: "pointer" }}
            onClick={() => router.push("/")}
          >
            MyDictionary
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              color={isHome ? "secondary" : "inherit"}
              variant={isHome ? "outlined" : "text"}
              onClick={() => router.push("/")}
            >
              Search
            </Button>
            <Button
              color={isWords ? "secondary" : "inherit"}
              variant={isWords ? "outlined" : "text"}
              onClick={() => router.push("/words")}
            >
              Words
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
