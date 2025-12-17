"use client";

import { useState } from "react";
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
  Alert,
  TextField,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useMutation } from "@apollo/client";
import { WordResult, AddWordInput } from "@/types/word";
import { UPDATE_WORD, DELETE_WORD, SEARCH_WORDS } from "@/graphql/word";

interface WordDetailModalProps {
  open: boolean;
  word: WordResult;
  onClose: () => void;
  onWordDeleted?: () => void;
}

const renderList = (items?: string[]) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      {items.map((item) => (
        <Chip key={item} label={item} color="secondary" variant="outlined" />
      ))}
    </Stack>
  );
};

const toList = (value?: string) =>
  value
    ? value
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean)
    : [];

const fromList = (value?: string[]) =>
  value ? value.join(", ") : "";

export default function WordDetailModal({
  open,
  word,
  onClose,
  onWordDeleted,
}: WordDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState<AddWordInput>({
    word: word.word,
    phonetic: word.phonetic || "",
    partOfSpeech: word.partOfSpeech,
    definitions: word.definitions,
    examples: word.examples || [],
    synonyms: word.synonyms || [],
    antonyms: word.antonyms || [],
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [updateWord, { loading: updating }] = useMutation<
    { updateWord: WordResult },
    { id: string; input: AddWordInput }
  >(UPDATE_WORD, {
    refetchQueries: [{ query: SEARCH_WORDS, variables: { query: word.word } }],
  });

  const [deleteWord, { loading: deleting }] = useMutation<
    { deleteWord: boolean },
    { id: string }
  >(DELETE_WORD, {
    refetchQueries: [{ query: SEARCH_WORDS, variables: { query: word.word } }],
  });

  const handleEditChange = (field: keyof AddWordInput) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (
        field === "definitions" ||
        field === "examples" ||
        field === "synonyms" ||
        field === "antonyms"
      ) {
        setEditValues((prev) => ({
          ...prev,
          [field]: toList(event.target.value),
        }));
        return;
      }

      setEditValues((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSave = async () => {
    setErrorMessage(null);

    if (
      !editValues.word ||
      !editValues.partOfSpeech ||
      editValues.definitions.length === 0
    ) {
      setErrorMessage(
        "Word, part of speech, and at least one definition are required."
      );
      return;
    }

    try {
      await updateWord({ variables: { id: word.id, input: editValues } });
      setIsEditing(false);
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to update word");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${word.word}"?`)) {
      return;
    }

    try {
      await deleteWord({ variables: { id: word.id } });
      onWordDeleted?.();
      onClose();
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to delete word");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrorMessage(null);
    setEditValues({
      word: word.word,
      phonetic: word.phonetic || "",
      partOfSpeech: word.partOfSpeech,
      definitions: word.definitions,
      examples: word.examples || [],
      synonyms: word.synonyms || [],
      antonyms: word.antonyms || [],
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          {isEditing ? (
            <>
              <TextField
                fullWidth
                size="small"
                label="Word"
                value={editValues.word}
                onChange={handleEditChange("word")}
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                size="small"
                label="Phonetic"
                value={editValues.phonetic}
                onChange={handleEditChange("phonetic")}
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                size="small"
                label="Part of Speech"
                value={editValues.partOfSpeech}
                onChange={handleEditChange("partOfSpeech")}
              />
            </>
          ) : (
            <>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
                {word.word}
              </Typography>
              {word.phonetic && (
                <Typography variant="subtitle1" color="text.secondary">
                  {word.phonetic}
                </Typography>
              )}
              <Typography
                variant="subtitle2"
                color="secondary"
                sx={{ textTransform: "capitalize", fontWeight: 600 }}
              >
                {word.partOfSpeech}
              </Typography>
            </>
          )}
        </Box>
        <Stack direction="row" spacing={0.5}>
          {isEditing ? (
            <>
              <Tooltip title="Save">
                <IconButton
                  aria-label="Save"
                  onClick={handleSave}
                  disabled={updating}
                  color="success"
                >
                  <SaveIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Cancel">
                <IconButton
                  aria-label="Cancel"
                  onClick={handleCancel}
                  disabled={updating}
                >
                  <CancelIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Edit">
                <IconButton
                  aria-label="Edit"
                  onClick={() => setIsEditing(true)}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  aria-label="Delete"
                  onClick={handleDelete}
                  disabled={deleting}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
          <Tooltip title="Close">
            <IconButton
              aria-label="Close"
              onClick={onClose}
              disabled={updating || deleting}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        {isEditing ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Definitions (comma-separated)"
              value={fromList(editValues.definitions)}
              onChange={handleEditChange("definitions")}
            />
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Examples (comma-separated)"
              value={fromList(editValues.examples)}
              onChange={handleEditChange("examples")}
            />
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Synonyms (comma-separated)"
              value={fromList(editValues.synonyms)}
              onChange={handleEditChange("synonyms")}
            />
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Antonyms (comma-separated)"
              value={fromList(editValues.antonyms)}
              onChange={handleEditChange("antonyms")}
            />
          </Box>
        ) : (
          <>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Definitions
              </Typography>
              <Stack spacing={1} component="ol" sx={{ pl: 3 }}>
                {word.definitions.map((definition, index) => (
                  <Typography
                    component="li"
                    key={index}
                    sx={{ listStyle: "decimal" }}
                  >
                    {definition}
                  </Typography>
                ))}
              </Stack>
            </Box>

            {word.examples && word.examples.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Examples
                </Typography>
                <Stack spacing={1}>
                  {word.examples.map((example) => (
                    <Typography
                      key={example}
                      variant="body2"
                      color="text.secondary"
                    >
                      "{example}"
                    </Typography>
                  ))}
                </Stack>
              </Box>
            )}

            <Divider sx={{ my: 3 }} />

            {renderList(word.synonyms) && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Synonyms
                </Typography>
                {renderList(word.synonyms)}
              </Box>
            )}

            {renderList(word.antonyms) && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Antonyms
                </Typography>
                {renderList(word.antonyms)}
              </Box>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
