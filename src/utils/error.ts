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

export const getErrorResponse = (err: any) => {
  if (!err.originalError) {
    return err;
  }

  console.log(err);

  const data = err.originalError.data;
  const message = err.message || "An error occured.";
  const code = err.originalError.code || 500;

  return { data, message, code };
};
