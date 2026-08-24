// lib/email/templates/dynamic-email.tsx
import { Html, Head, Body, Container, Section, Text, Hr, Preview } from "react-email";

interface DynamicEmailProps {
  name: string;
  company?: string;
  email: string;
  interest: string;
  message: string;
}

export default function DynamicEmail({ name, company, email, interest, message }: DynamicEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New {interest} from {name}</Preview>
      <Body style={{ backgroundColor: "#f6f9fc", padding: "20px 0" }}>
        <Container style={{ backgroundColor: "#ffffff", padding: "24px", borderRadius: "8px", fontFamily: "sans-serif" }}>
          <Section>
            <Text style={{ fontSize: "20px", fontWeight: "bold" }}>New Submission: {interest}</Text>
            <Hr />
            <Text><strong>Name:</strong> {name}</Text>
            {company && <Text><strong>Company:</strong> {company}</Text>}
            <Text><strong>Email:</strong> {email}</Text>
            <Text><strong>Interest/Topic:</strong> {interest}</Text>
            <Hr />
            <Text><strong>Message:</strong></Text>
            <Text style={{ whiteSpace: "pre-wrap" }}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}