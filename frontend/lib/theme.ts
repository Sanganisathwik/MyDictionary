import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#1D4ED8",
		},
		secondary: {
			main: "#F97316",
		},
		background: {
			default: "#F8FAFC",
			paper: "#FFFFFF",
		},
	},
	typography: {
		fontFamily: "var(--font-kumbh-sans), 'Inter', sans-serif",
	},
	shape: {
		borderRadius: 12,
	},
});
