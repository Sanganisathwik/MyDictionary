"use client";

import { Box, Container, Typography, Link, Stack } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#1e40af",
        color: "white",
        py: 3,
        mt: "auto",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {currentYear} MyDictionary. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "white",
                opacity: 0.8,
                transition: "opacity 0.2s",
                "&:hover": { opacity: 1 },
              }}
            >
              <GitHubIcon />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "white",
                opacity: 0.8,
                transition: "opacity 0.2s",
                "&:hover": { opacity: 1 },
              }}
            >
              <LinkedInIcon />
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
