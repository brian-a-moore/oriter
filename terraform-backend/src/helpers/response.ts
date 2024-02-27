export const responseHelper = <T = { error: string }>({ statusCode, data }: { statusCode?: number; data?: T }) => ({
  statusCode: statusCode || 500,
  body: data ? JSON.stringify({ data }) : JSON.stringify({ error: 'Internal Server Error' }),
});
