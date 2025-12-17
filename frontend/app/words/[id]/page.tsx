"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Stack,
  Chip,
  Divider,
  TextField,
  Dialog,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import { GET_WORD, UPDATE_WORD, DELETE_WORD, SEARCH_WORDS } from "@/graphql/word";
import { WordResult, AddWordInput } from "@/types/word";

const toList = (value?: string) =>
  value
    ? value
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean)
    : [];

const fromList = (value?: string[]) =>
  value ? value.join(", ") : "";

interface WordQueryData {
  getWord: WordResult;
}

interface WordQueryVars {
  id: string;
}

export default function WordDetailPage() {
  const router = useRouter();
  const params = useParams();
  const wordId = params.id as string;

  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState<AddWordInput | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const { data, loading, error, refetch } = useQuery<WordQueryData, WordQueryVars>(
    GET_WORD,
    {
      variables: { id: wordId },
      onCompleted: (data) => {
        if (data.getWord && !editValues) {
          setEditValues({
            word: data.getWord.word,
            phonetic: data.getWord.phonetic || "",
            partOfSpeech: data.getWord.partOfSpeech,
            definitions: data.getWord.definitions,
            examples: data.getWord.examples || [],
            synonyms: data.getWord.synonyms || [],
            antonyms: data.getWord.antonyms || [],
          });
        }
      },
    }
  );

  const [updateWord, { loading: updating }] = useMutation<
    { updateWord: WordResult },
    { id: string; input: AddWordInput }
  >(UPDATE_WORD, {
    refetchQueries: [{ query: SEARCH_WORDS, variables: { query: data?.getWord.word || "" } }],
    onCompleted: () => {
      setIsEditing(false);
      refetch();
    },
  });

  const [deleteWord, { loading: deleting }] = useMutation<
    { deleteWord: boolean },
    { id: string }
  >(DELETE_WORD, {
    refetchQueries: [{ query: SEARCH_WORDS, variables: { query: data?.getWord.word || "" } }],
    onCompleted: () => {
      router.push("/");
    },
  });

  const word = data?.getWord;

  if (loading)
    return (
      <Container maxWidth="lg" sx={{ py: 8, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    );

  if (error)
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{ mb: 2 }}
        >
          Back
        </Button>
        <Alert severity="error">Error loading word: {error.message}</Alert>
      </Container>
    );

  if (!word)
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{ mb: 2 }}
        >
          Back
        </Button>
        <Alert severity="warning">Word not found</Alert>
      </Container>
    );

  const handleEditChange = (field: keyof AddWordInput) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!editValues) return;

      if (
        field === "definitions" ||
        field === "examples" ||
        field === "synonyms" ||
        field === "antonyms"
      ) {
        setEditValues((prev) =>
          prev
            ? {
                ...prev,
                [field]: toList(event.target.value),
              }
            : null
        );
        return;
      }

      setEditValues((prev) =>
        prev
          ? {
              ...prev,
              [field]: event.target.value,
            }
          : null
      );
    };

  const handleSave = async () => {
    setErrorMessage(null);

    if (!editValues) return;

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
      await updateWord({ variables: { id: wordId, input: editValues } });
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to update word");
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

  const handleDelete = async () => {
    try {
      await deleteWord({ variables: { id: wordId } });
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to delete word");
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          variant="outlined"
        >
          Back
        </Button>

        <Stack direction="row" spacing={1}>
          {isEditing ? (
            <>
              <Button
                startIcon={<SaveIcon />}
                variant="contained"
                color="success"
                onClick={handleSave}
                disabled={updating}
              >
                Save
              </Button>
              <Button
                startIcon={<CancelIcon />}
                variant="outlined"
                onClick={handleCancel}
                disabled={updating}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                startIcon={<EditIcon />}
                variant="contained"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
              <Button
                startIcon={<DeleteIcon />}
                variant="contained"
                color="error"
                onClick={() => setDeleteConfirm(true)}
              >
                Delete
              </Button>
            </>
          )}
        </Stack>
      </Box>

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}

      <Box sx={{ mb: 4 }}>
        {isEditing ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              label="Word"
              value={editValues?.word || ""}
              onChange={handleEditChange("word")}
              disabled={updating}
            />
            <TextField
              fullWidth
              label="Phonetic"
              value={editValues?.phonetic || ""}
              onChange={handleEditChange("phonetic")}
              disabled={updating}
            />
            <TextField
              fullWidth
              label="Part of Speech"
              value={editValues?.partOfSpeech || ""}
              onChange={handleEditChange("partOfSpeech")}
              disabled={updating}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Definitions (comma-separated)"
              value={fromList(editValues?.definitions)}
              onChange={handleEditChange("definitions")}
              disabled={updating}
            />
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Examples (comma-separated)"
              value={fromList(editValues?.examples)}
              onChange={handleEditChange("examples")}
              disabled={updating}
            />
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Synonyms (comma-separated)"
              value={fromList(editValues?.synonyms)}
              onChange={handleEditChange("synonyms")}
              disabled={updating}
            />
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Antonyms (comma-separated)"
              value={fromList(editValues?.antonyms)}
              onChange={handleEditChange("antonyms")}
              disabled={updating}
            />
          </Box>
        ) : (
          <>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
              {word.word}
            </Typography>
            {word.phonetic && (
              <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                {word.phonetic}
              </Typography>
            )}
            <Typography
              variant="h6"
              color="secondary"
              sx={{ textTransform: "capitalize", fontWeight: 600, mb: 3 }}
            >
              {word.partOfSpeech}
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Definitions
              </Typography>
              <Stack spacing={1} component="ol" sx={{ pl: 3 }}>
                {word.definitions.map((definition, index) => (
                  <Typography component="li" key={index}>
                    {definition}
                  </Typography>
                ))}
              </Stack>
            </Box>

            {word.examples && word.examples.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Examples
                </Typography>
                <Stack spacing={1}>
                  {word.examples.map((example) => (
                    <Typography key={example} variant="body2" color="text.secondary">
                      "{example}"
                    </Typography>
                  ))}
                </Stack>
              </Box>
            )}

            <Divider sx={{ my: 4 }} />

            {word.synonyms && word.synonyms.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Synonyms
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {word.synonyms.map((synonym) => (
                    <Chip
                      key={synonym}
                      label={synonym}
                      color="secondary"
                      variant="outlined"
                    />
                  ))}
                </Stack>
              </Box>
            )}

            {word.antonyms && word.antonyms.length > 0 && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Antonyms
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {word.antonyms.map((antonym) => (
                    <Chip
                      key={antonym}
                      label={antonym}
                      color="secondary"
                      variant="outlined"
                    />
                  ))}
                </Stack>
              </Box>
            )}
          </>
        )}
      </Box>

      <Dialog
        open={deleteConfirm}
        onClose={() => setDeleteConfirm(false)}
      >
        <Box sx={{ p: 3, minWidth: 300 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Are you sure you want to delete "{word.word}"?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            This action cannot be undone.
          </Typography>
          <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              onClick={() => setDeleteConfirm(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              disabled={deleting}
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </Dialog>
    </Container>
  );
}
