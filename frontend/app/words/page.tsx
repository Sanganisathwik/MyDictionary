"use client";

import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_ALL_WORDS } from "@/graphql/word";
import { WordResult } from "@/types/word";
import WordDetailModal from "@/components/WordDetailModal";

interface GetAllWordsData {
  getAllWords: WordResult[];
}

export default function WordsPage() {
  const [selectedWord, setSelectedWord] = useState<WordResult | null>(null);

  const { data, loading, error, refetch } = useQuery<GetAllWordsData>(GET_ALL_WORDS);

  const handleWordClick = (word: WordResult) => {
    setSelectedWord(word);
  };

  const handleCloseDetail = () => {
    setSelectedWord(null);
  };

  const handleWordDeleted = () => {
    refetch();
    setSelectedWord(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{ fontWeight: 700, color: "primary.main", mb: 1 }}
        >
          All Words
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {data?.getAllWords.length || 0} words in your dictionary
        </Typography>
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Error loading words: {error.message}
        </Alert>
      )}

      {!loading && !error && data?.getAllWords.length === 0 && (
        <Alert severity="info">
          No words in your dictionary yet. Add some words from the search page!
        </Alert>
      )}

      {!loading && !error && data && data.getAllWords.length > 0 && (
        <Grid container spacing={3}>
          {data.getAllWords.map((word) => (
            <Grid item xs={12} sm={6} md={4} key={word.id}>
              <Card
                sx={{
                  cursor: "pointer",
                  transition: "all 0.2s",
                  height: "100%",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                  },
                }}
                onClick={() => handleWordClick(word)}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      fontWeight: 600,
                      color: "primary.main",
                      mb: 1,
                    }}
                  >
                    {word.word}
                  </Typography>
                  {word.phonetic && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1, fontStyle: "italic" }}
                    >
                      {word.phonetic}
                    </Typography>
                  )}
                  <Chip
                    label={word.partOfSpeech}
                    size="small"
                    color="secondary"
                    sx={{ mb: 1.5 }}
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {word.definitions[0]}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {selectedWord && (
        <WordDetailModal
          word={selectedWord}
          open={!!selectedWord}
          onClose={handleCloseDetail}
          onWordDeleted={handleWordDeleted}
        />
      )}
    </Container>
  );
}