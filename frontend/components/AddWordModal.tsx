"use client";

import { useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { ADD_WORD, SEARCH_WORDS } from "@/graphql/word";
import { AddWordInput, WordResult } from "@/types/word";

interface AddWordModalProps {
  open: boolean;
  onClose: () => void;
}

const defaultFormValues: AddWordInput = {
  word: "",
  phonetic: "",
  partOfSpeech: "",
  definitions: [],
  examples: [],
  synonyms: [],
  antonyms: [],
};

const toList = (value?: string) =>
  value
    ? value
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean)
    : [];

export default function AddWordModal({ open, onClose }: AddWordModalProps) {
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [addWord, { loading }] = useMutation<{ addWord: WordResult }, { input: AddWordInput }>(ADD_WORD, {
    refetchQueries: [{ query: SEARCH_WORDS, variables: { query: formValues.word } }],
    awaitRefetchQueries: true,
  });

  const handleChange = (field: keyof AddWordInput) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (field === "definitions") {
        setFormValues((prev) => ({
          ...prev,
          definitions: toList(event.target.value),
        }));
        return;
      }

      if (field === "examples" || field === "synonyms" || field === "antonyms") {
        setFormValues((prev) => ({
          ...prev,
          [field]: toList(event.target.value),
        }));
        return;
      }

      setFormValues((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const resetState = () => {
    setFormValues(defaultFormValues);
    setFeedback(null);
    setErrorMessage(null);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);
    setErrorMessage(null);

    if (!formValues.word || !formValues.partOfSpeech || formValues.definitions.length === 0) {
      setErrorMessage("Word, part of speech, and at least one definition are required.");
      return;
    }

    try {
      await addWord({ variables: { input: formValues } });
      setFeedback(`${formValues.word} added successfully.`);
      resetState();
    } catch (mutationError) {
      setErrorMessage((mutationError as Error).message);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add a new word</DialogTitle>
      <DialogContent>
        {feedback && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {feedback}
          </Alert>
        )}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <form id="add-word-form" onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Word"
                fullWidth
                value={formValues.word}
                onChange={handleChange("word")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phonetic"
                fullWidth
                value={formValues.phonetic}
                onChange={handleChange("phonetic")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Part of Speech"
                fullWidth
                value={formValues.partOfSpeech}
                onChange={handleChange("partOfSpeech")}
                placeholder="noun, verb, adjective..."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Definitions"
                fullWidth
                multiline
                helperText="Separate multiple definitions with commas"
                onChange={handleChange("definitions")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Examples"
                fullWidth
                multiline
                helperText="Separate examples with commas"
                onChange={handleChange("examples")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Synonyms"
                fullWidth
                multiline
                helperText="Comma separated"
                onChange={handleChange("synonyms")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Antonyms"
                fullWidth
                multiline
                helperText="Comma separated"
                onChange={handleChange("antonyms")}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button type="submit" form="add-word-form" variant="contained" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
