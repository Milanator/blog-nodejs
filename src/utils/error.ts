export const getError = (
  message: string,
  statusCode: number = 500,
  data: object | undefined = undefined
): Error => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.data = data;

  return error;
};
