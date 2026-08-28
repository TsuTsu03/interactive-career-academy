export interface SubmissionDraft {
  repositoryUrl: string;
  liveUrl: string;
}

export type SubmissionFieldError =
  | "required"
  | "invalid-url"
  | "not-github"
  | "not-repository"
  | null;

const MAX_URL_LENGTH = 2048;

export function freshSubmissionDraft(): SubmissionDraft {
  return { repositoryUrl: "", liveUrl: "" };
}

export function restoreSubmissionDraft(value: unknown): SubmissionDraft {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return freshSubmissionDraft();
  }

  const draft = value as Partial<SubmissionDraft>;
  return {
    repositoryUrl:
      typeof draft.repositoryUrl === "string" && draft.repositoryUrl.length <= MAX_URL_LENGTH
        ? draft.repositoryUrl
        : "",
    liveUrl:
      typeof draft.liveUrl === "string" && draft.liveUrl.length <= MAX_URL_LENGTH
        ? draft.liveUrl
        : "",
  };
}

function validWebUrl(value: string): URL | null {
  try {
    const url = new URL(value);
    return (url.protocol === "https:" || url.protocol === "http:") &&
      url.username === "" &&
      url.password === ""
      ? url
      : null;
  } catch {
    return null;
  }
}

export function validateRepositoryUrl(value: string): SubmissionFieldError {
  if (!value.trim()) return "required";
  const url = validWebUrl(value.trim());
  if (!url) return "invalid-url";
  if (url.hostname.toLowerCase() !== "github.com") return "not-github";
  return url.pathname.split("/").filter(Boolean).length >= 2 ? null : "not-repository";
}

export function validateSecureRepositoryUrl(value: string): SubmissionFieldError {
  const basic = validateRepositoryUrl(value);
  if (basic) return basic;
  const url = new URL(value.trim());
  return url.protocol === "https:" && url.pathname.split("/").filter(Boolean).length === 2 && !url.search && !url.hash
    ? null
    : "not-repository";
}

export function validateLiveUrl(value: string): SubmissionFieldError {
  if (!value.trim()) return "required";
  return validWebUrl(value.trim()) ? null : "invalid-url";
}

export function validateSecureLiveUrl(value: string): SubmissionFieldError {
  if (!value.trim()) return "required";
  const url = validWebUrl(value.trim());
  return url?.protocol === "https:" ? null : "invalid-url";
}
