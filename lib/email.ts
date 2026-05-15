export type OfferEmailInput = {
  shopperName: string;
  vehicle: string;
  structure: "lease" | "finance";
  targetMonthly?: number;
  targetDue?: number;
  targetSellingPrice?: number;
  targetAprOrMoneyFactor?: string;
  term?: number;
  mileage?: number;
  zipCode: string;
  customMessage?: string;
  oemBenchmark?: string;
  benchmarkAdvantage?: string;
};

export type EmailProvider = "mock" | "resend" | "sendgrid" | "mailgun" | "aws-ses";

export function buildOfferEmail(input: OfferEmailInput) {
  const terms = [
    input.targetMonthly ? `target monthly payment: $${input.targetMonthly}` : null,
    input.targetDue !== undefined ? `due at signing: $${input.targetDue}` : null,
    input.targetSellingPrice ? `target selling price: $${input.targetSellingPrice}` : null,
    input.targetAprOrMoneyFactor ? `APR/money factor: ${input.targetAprOrMoneyFactor}` : null,
    input.term ? `term: ${input.term} months` : null,
    input.mileage ? `mileage: ${input.mileage.toLocaleString()} miles/year` : null
  ].filter(Boolean);

  return [
    `Hello, I am ready to move forward on a ${input.vehicle} this week if you can match or beat the following ${input.structure} structure:`,
    "",
    input.oemBenchmark ? `Official manufacturer benchmark: ${input.oemBenchmark}` : null,
    input.benchmarkAdvantage ? `Requested advantage vs manufacturer: ${input.benchmarkAdvantage}` : null,
    input.oemBenchmark || input.benchmarkAdvantage ? "" : null,
    terms.map((term) => `- ${term}`).join("\n"),
    "",
    `I am shopping from ZIP ${input.zipCode}. Please send a full written worksheet with all taxes, fees, incentives, residual value, APR or money factor, and any dealer add-ons included.`,
    input.customMessage ? `\n${input.customMessage}` : "",
    "",
    `Thank you,\n${input.shopperName}`
  ].filter((line) => line !== null).join("\n");
}

export async function sendOfferEmail(provider: EmailProvider, message: string) {
  if (provider === "mock") {
    return {
      provider,
      status: "queued",
      providerId: `mock-${Date.now()}`,
      message
    };
  }

  return {
    provider,
    status: "not_configured",
    providerId: null,
    message
  };
}

export const emailProviderNotes = {
  outbound: "Use Resend, SendGrid, Mailgun, or AWS SES with verified sending domains and suppression lists.",
  inbound: "Generate a unique reply-to address per campaign and store provider webhooks as DealerMessage rows.",
  compliance: "Include unsubscribe handling for marketing-style follow-ups, avoid misleading sender identity, and monitor bounces and spam complaints."
};
