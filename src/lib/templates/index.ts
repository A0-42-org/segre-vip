export { bioMinimal } from './bio-minimal';
export { bioComplete } from './bio-complete';
export { bioBusiness } from './bio-business';
export { offerSimple } from './offer-simple';
export { offerDetailed } from './offer-detailed';

import { bioMinimal } from './bio-minimal';
import { bioComplete } from './bio-complete';
import { bioBusiness } from './bio-business';
import { offerSimple } from './offer-simple';
import { offerDetailed } from './offer-detailed';

export const allTemplates = [
  bioMinimal,
  bioComplete,
  bioBusiness,
  offerSimple,
  offerDetailed
];

export const bioTemplates = [bioMinimal, bioComplete, bioBusiness];
export const offerTemplates = [offerSimple, offerDetailed];
