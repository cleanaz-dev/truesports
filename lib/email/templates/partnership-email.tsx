// components/emails/partnership-email.tsx
import { Html, Head, Body, Container, Section, Text, Hr, Preview } from "react-email";
import { emailStyles } from "@/lib/email/styles";

interface PartnershipEmailProps {
  name: string;
  company?: string;
  email: string;
  interest: string;
  message: string;
}

export default function PartnershipEmail({
  name,
  company,
  email,
  interest,
  message,
}: PartnershipEmailProps) {
  const previewText = `New partnership inquiry from ${name} (${company || "Independent"})`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={emailStyles.main}>
        <Container style={emailStyles.container}>
          <Section style={emailStyles.box}>
            {/* Clean True Sports Branding */}
            <Text style={emailStyles.logo}>
              True <span style={emailStyles.logoAccent}>Sports</span>
            </Text>
            
            <Text style={emailStyles.h1}>New Partnership Inquiry</Text>
            
            <Text style={emailStyles.text}>
              <span style={emailStyles.label}>Name:</span><br />
              {name}
            </Text>
            
            <Text style={emailStyles.text}>
              <span style={emailStyles.label}>Company:</span><br />
              {company || "N/A"}
            </Text>
            
            <Text style={emailStyles.text}>
              <span style={emailStyles.label}>Email Address:</span><br />
              {email}
            </Text>
            
            <Text style={emailStyles.text}>
              <span style={emailStyles.label}>Interest:</span><br />
              {interest}
            </Text>
            
            <Hr style={emailStyles.hr} />
            
            <Text style={emailStyles.text}>
              <span style={emailStyles.label}>Message:</span><br />
            </Text>
            {/* Split message by linebreaks for proper rendering */}
            {message.split("\n").map((line, i) => (
              <Text key={i} style={{ ...emailStyles.text, margin: "4px 0" }}>
                {line}
              </Text>
            ))}
            
            <Hr style={emailStyles.hr} />
            
            <Text style={emailStyles.footer}>
              &copy; {new Date().getFullYear()} True Sports Network. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}