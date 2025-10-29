import { Response } from 'express';

type ResponseJSONType = {
  success: boolean;
  res: Response;
  status: number;
  token?: string;
  data?: any;
  message?: string;
  meta?: {
    total: number;
    limit: number;
    offset: number;
  };
};

const responseJson = ({
  success,
  res,
  status,
  token,
  data,
  message,
  meta,
}: ResponseJSONType) => {
  if (token) {
    return res
      .status(status)
      .json({ success, status: status, token, data, message, meta });
  }

  if (meta) {
    return res
      .status(status)
      .json({ success, status: status, token, data, message, meta });
  }

  return res.status(status).json({ success, status: status, data, message });
};

export { responseJson };
