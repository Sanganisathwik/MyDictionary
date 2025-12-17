"use client";

import { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Card,
  CardContent,
  Typography,
  Fab,
  Dialog,
  CircularProgress,
  Alert,
  Grid,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/lib/store/slices/searchSlice";
import { RootState } from "@/lib/store";
import WordDetailModal from "@/components/WordDetailModal";
import AddWordModal from "@/components/AddWordModal";
import { SEARCH_WORDS } from "@/graphql/word";
import { WordResult } from "@/types/word";

interface SearchWordsData {
  searchWords: WordResult[];
}

interface SearchWordsVars {
  query: string;
}

export default function HomePage() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.search.query);
  const [selectedWord, setSelectedWord] = useState<WordResult | null>(null);
  const [addWordOpen, setAddWordOpen] = useState(false);

  const trimmedQuery = searchQuery.trim();

  const { data, loading, error } = useQuery<SearchWordsData, SearchWordsVars>(
    SEARCH_WORDS,
    {
      variables: { query: trimmedQuery },
      skip: trimmedQuery.length < 2,
    }
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleWordClick = (word: WordResult) => {
    setSelectedWord(word);
  };

  const handleCloseDetail = () => {
    setSelectedWord(null);
  };

  const handleOpenAddWord = () => {
    setAddWordOpen(true);
  };

  const handleCloseAddWord = () => {
    setAddWordOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            mb: 3,
            fontWeight: 700,
            color: "primary.main",
          }}
        >
          Dictionary
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for a word..."
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          Error loading results: {error.message}
        </Alert>
      )}

      {!loading && !error && trimmedQuery.length >= 2 && (
        <>
          {data?.searchWords.length === 0 ? (
            <Alert severity="info" sx={{ borderRadius: 2 }}>
              No results found for "{trimmedQuery}"
            </Alert>
          ) : (
            <Grid container spacing={3}>
              {data?.searchWords.map((word) => (
                <Grid item xs={12} sm={6} md={4} key={word.id}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      cursor: "pointer",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 4,
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
                          sx={{ color: "text.secondary", mb: 1 }}
                        >
                          {word.phonetic}
                        </Typography>
                      )}
                      <Typography
                        variant="body2"
                        sx={{
                          color: "secondary.main",
                          fontWeight: 500,
                          textTransform: "capitalize",
                        }}
                      >
                        {word.partOfSpeech}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}

      {trimmedQuery.length < 2 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            Enter at least 2 characters to search
          </Typography>
        </Box>
      )}

      <Fab
        color="primary"
        aria-label="add word"
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
        }}
        onClick={handleOpenAddWord}
      >
        <AddIcon />
      </Fab>

      {selectedWord && (
        <WordDetailModal
          open={!!selectedWord}
          word={selectedWord}
          onClose={handleCloseDetail}
          onWordDeleted={handleCloseDetail}
        />
      )}

      <AddWordModal open={addWordOpen} onClose={handleCloseAddWord} />
    </Container>
  );
}