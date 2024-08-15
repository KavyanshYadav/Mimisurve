import { useMemo } from "react";

type UseApiUrl = (endpoint: string) => string;

const useApiUrl: UseApiUrl = (endpoint) => {
  const domain = process.env.API_SERVER_DOMAIN;

  if (!domain) {
    throw new Error('API base URL is not defined in environment variables.');
  }

  return useMemo(() => `${domain}${endpoint}`, [domain, endpoint]);
};

export default useApiUrl;