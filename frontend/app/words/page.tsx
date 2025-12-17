"use client";

import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Paper,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useQuery } from "@apollo/client";
import { GET_ALL_WORDS } from "@/graphql/word";
import { WordResult } from "@/types/word";
import WordDetailModal from "@/components/WordDetailModal";

interface GetAllWordsData {
  getAllWords: WordResult[];
}

export default function WordsPage() {
  const [selectedWord, setSelectedWord] = useState<WordResult | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Filter words based on search term
  const filteredWords = data?.getAllWords.filter((word) =>
    word.word.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      {/* Purple Header */}
      <Box
        sx={{
          bgcolor: "#1e40af",
          color: "white",
          p: 2,
          mb: 0,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, flex: 1 }}>
              Vocab
            </Typography>
            <SearchIcon sx={{ fontSize: 24 }} />
          </Box>

          {/* Search Bar */}
          <TextField
            fullWidth
            placeholder="Search words..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              bgcolor: "white",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                color: "black",
                "& fieldset": {
                  borderColor: "transparent",
                },
              },
              "& .MuiOutlinedInput-input::placeholder": {
                color: "#999",
                opacity: 1,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#999", mr: 1 }} />
                </InputAdornment>
              ),
            }}
          />
        </Container>
      </Box>

      {/* Content Area */}
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "black", mb: 2, pl: 1 }}
        >
          Words List
        </Typography>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress sx={{ color: "#7c3aed" }} />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            Error loading words: {error.message}
          </Alert>
        )}

        {!loading && !error && filteredWords.length === 0 && (
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            {data?.getAllWords.length === 0
              ? "No words in your dictionary yet."
              : "No words match your search."}
          </Alert>
        )}

        {!loading && !error && filteredWords.length > 0 && (
          <Stack spacing={2}>
            {filteredWords.map((word) => (
              <Paper
                key={word.id}
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  bgcolor: "white",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  border: "1px solid #e0e0e0",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(124, 58, 237, 0.1)",
                    transform: "translateY(-2px)",
                  },
                }}
                onClick={() => handleWordClick(word)}
              >
                {/* Word and Part of Speech */}
                <Box sx={{ mb: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#1f2937",
                      mb: 0.5,
                    }}
                  >
                    {word.word}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#6b7280",
                      fontStyle: "italic",
                    }}
                  >
                    ({word.partOfSpeech})
                    {word.phonetic && ` ${word.phonetic}`}
                  </Typography>
                </Box>

                {/* Definition */}
                <Typography
                  variant="body2"
                  sx={{
                    color: "#374151",
                    lineHeight: 1.6,
                    mb: 1,
                  }}
                >
                  {word.definitions[0]}
                </Typography>

                {/* Examples */}
                {word.examples && word.examples.length > 0 && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#9ca3af",
                      display: "block",
                      fontStyle: "italic",
                      mt: 1,
                    }}
                  >
                    "{word.examples[0]}"
                  </Typography>
                )}
              </Paper>
            ))}
          </Stack>
        )}
      </Container>

      {selectedWord && (
        <WordDetailModal
          word={selectedWord}
          open={!!selectedWord}
          onClose={handleCloseDetail}
          onWordDeleted={handleWordDeleted}
        />
      )}
    </Box>
  );
}