/**
 * Jednotné re-exporty typů pro import z `@/lib/types/public`.
 * Zdroj pravdy zůstává u doménových modulů — tento soubor jen zjednodušuje discoverability.
 */

export type { BlogPost } from "@/lib/posts";
export type { LeadCategory, LeadSourceType, LeadStatus } from "@/lib/leads/domain";
export type { InterestSegment, SubscriberSource, SubscriberStatus } from "@/lib/subscribers/domain";
export type { PostDistributionStatus } from "@/lib/content/distribution";
export type { CalculatorLeadBody } from "@/lib/validation/calculatorLeadSchema";
export type { SubscriberBody } from "@/lib/validation/subscriberSchema";
