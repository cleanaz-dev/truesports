// lib/email/styles.ts

export const emailStyles = {
  main: {
    backgroundColor: "#f4f4f5", // Zinc 100
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  },
  container: {
    backgroundColor: "#ffffff",
    margin: "40px auto",
    padding: "20px 0 48px",
    borderRadius: "12px",
    border: "1px solid #e4e4e7", // Zinc 200
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
  },
  box: {
    padding: "0 48px",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "900",
    textTransform: "uppercase" as const,
    letterSpacing: "-0.05em",
    color: "#111111",
    margin: "0 0 20px",
  },
  logoAccent: {
    color: "#3b82f6", // Primary blue, adjust to your theme
  },
  h1: {
    color: "#111111",
    fontSize: "20px",
    fontWeight: "bold",
    margin: "0 0 24px",
    padding: "0",
  },
  text: {
    color: "#3f3f46", // Zinc 700
    fontSize: "15px",
    lineHeight: "24px",
    textAlign: "left" as const,
    margin: "12px 0",
  },
  label: {
    fontWeight: "bold",
    color: "#111111",
    textTransform: "uppercase" as const,
    fontSize: "12px",
    letterSpacing: "0.05em",
  },
  hr: {
    borderColor: "#e4e4e7",
    margin: "24px 0",
  },
  footer: {
    color: "#71717a", // Zinc 500
    fontSize: "12px",
    lineHeight: "16px",
    textAlign: "center" as const,
    marginTop: "24px",
  },
};