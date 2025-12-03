import { config } from 'dotenv';
config();

import '@/ai/flows/generate-initial-codebase-from-prompt.ts';
import '@/ai/flows/enhance-ui-screenshot.ts';
import '@/ai/flows/verify-property.ts';
import '@/ai/flows/check-subscription-status.ts';
