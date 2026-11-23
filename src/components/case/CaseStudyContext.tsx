"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { CaseStudyMetadata } from "@/lib/schema";

export interface CaseStudyContextValue {
  metadata: CaseStudyMetadata;
  nextCase?: CaseStudyMetadata;
}

const CaseStudyContext = createContext<CaseStudyContextValue | null>(null);

export function CaseStudyProvider({
  metadata,
  nextCase,
  children,
}: CaseStudyContextValue & { children: ReactNode }) {
  return (
    <CaseStudyContext.Provider value={{ metadata, nextCase }}>
      {children}
    </CaseStudyContext.Provider>
  );
}

export function useCaseStudy(): CaseStudyContextValue | null {
  return useContext(CaseStudyContext);
}
