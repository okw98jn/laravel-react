export const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,

  // Laravelの特殊なステータスコード
  EXPIRED_SESSION: 419, // CSRFトークンの期限切れなど
} as const;
