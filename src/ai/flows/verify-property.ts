
'use server';

/**
 * @fileOverview A Genkit flow for verifying UK property information.
 * This serves as the core business logic, making it platform-independent.
 *
 * - verifyProperty - The main function to call for property verification.
 * - VerifyPropertyInput - The input type for the verification flow.
 * - VerifyPropertyOutput - The return type for the verification flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// Input Schema
const VerifyPropertyInputSchema = z.object({
  propertyIdentifier: z.string().describe('The property identifier, which can be a title number, postcode, or full address.'),
  identifierType: z.enum(['title', 'postcode', 'address']).describe('The type of the property identifier.'),
  checks: z.object({
    pricePaid: z.boolean().describe('Whether to include price paid history.'),
    companyOwnership: z.boolean().describe('Whether to check for company ownership details.'),
    localData: z.boolean().describe('Whether to include additional local data.'),
  }),
});
export type VerifyPropertyInput = z.infer<typeof VerifyPropertyInputSchema>;

// Output Schema
const VerifyPropertyOutputSchema = z.object({
  verificationId: z.string().describe('A unique ID for this verification transaction.'),
  timestamp: z.string().describe('The ISO 8601 timestamp of when the verification was completed.'),
  propertyDetails: z.object({
    titleNumber: z.string().describe('The official Land Registry title number.'),
    address: z.string().describe('The full address of the property.'),
    tenure: z.string().describe('The tenure type (e.g., Freehold, Leasehold).'),
  }),
  ownership: z.object({
    proprietors: z.array(z.string()).describe('A list of the registered proprietors (owners).'),
    ownershipType: z.string().describe('The type of ownership (e.g., Individual, Company).'),
  }),
  pricePaidHistory: z.array(
    z.object({
      date: z.string().describe('The date of the transaction.'),
      price: z.string().describe('The price paid in the transaction.'),
    })
  ).optional().describe('A history of prices paid for the property.'),
  companyDetails: z.object({
    companyName: z.string(),
    companyNumber: z.string(),
    directors: z.array(z.string()),
  }).optional().describe('Details of the owning company, if applicable.'),
  alerts: z.array(
    z.object({
      level: z.enum(['info', 'warning', 'critical']),
      message: z.string(),
    })
  ).describe('Any alerts or warnings related to the property.'),
});
export type VerifyPropertyOutput = z.infer<typeof VerifyPropertyOutputSchema>;


/**
 * A wrapper function that invokes the verification flow.
 * This is the primary entry point for the frontend.
 * @param input The property details to verify.
 * @returns A promise that resolves to the verification report.
 */
export async function verifyProperty(input: VerifyPropertyInput): Promise<VerifyPropertyOutput> {
  return verifyPropertyFlow(input);
}


// This is the Genkit flow that defines the business logic.
// For now, it returns mock data. In a real application, this flow
// would call external APIs (e.g., UK Land Registry, Companies House).
const verifyPropertyFlow = ai.defineFlow(
  {
    name: 'verifyPropertyFlow',
    inputSchema: VerifyPropertyInputSchema,
    outputSchema: VerifyPropertyOutputSchema,
  },
  async (input) => {
    // Simulate an API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // MOCK DATA: In a real app, this would be fetched from official sources.
    const mockReport: VerifyPropertyOutput = {
      verificationId: `ASSETRAZ-${Date.now()}`,
      timestamp: new Date().toISOString(),
      propertyDetails: {
        titleNumber: input.propertyIdentifier.startsWith('DN') ? input.propertyIdentifier : 'DN123456',
        address: input.identifierType === 'address' ? input.propertyIdentifier : '10 Downing Street, London, SW1A 2AA',
        tenure: 'Freehold',
      },
      ownership: {
        proprietors: ['THE CROWN ESTATE'],
        ownershipType: 'Corporate Body',
      },
      alerts: [
        {
          level: 'info',
          message: 'This is a demonstration report. Data is illustrative and not from live sources.',
        },
        {
          level: 'warning',
          message: 'No restrictions on title found.',
        },
        {
          level: 'critical',
          message: 'Litigation risk detected: Pending boundary dispute (Case #2024-C08-1138).',
        },
         {
          level: 'critical',
          message: 'Outstanding charge found: A mortgage from Barclays Bank PLC is registered against this title.',
        },
      ],
    };
    
    if (input.checks.pricePaid) {
        mockReport.pricePaidHistory = [
            { date: '2015-08-21', price: '£5,250,000' },
            { date: '2002-01-10', price: '£2,100,000' },
        ];
    }
    
    if (input.checks.companyOwnership) {
        mockReport.companyDetails = {
            companyName: 'THE CROWN ESTATE',
            companyNumber: 'CE000001',
            directors: ['John Doe', 'Jane Smith'],
        };
    }

    return mockReport;
  }
);
