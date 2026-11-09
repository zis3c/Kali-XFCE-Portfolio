import { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { sendEmail } from './contactsController';

jest.mock('@sendgrid/mail', () => ({
  __esModule: true,
  default: {
    setApiKey: jest.fn(),
    send: jest.fn(),
  },
}));

const sendMock = sgMail.send as jest.Mock;
const setApiKeyMock = sgMail.setApiKey as jest.Mock;

interface MockResponse {
  statusCode: number;
  body: unknown;
  status: jest.Mock;
  json: jest.Mock;
}

const makeRes = (): MockResponse => {
  const res: MockResponse = {
    statusCode: 0,
    body: null,
    status: jest.fn(),
    json: jest.fn(),
  };
  res.status.mockImplementation((code: number) => {
    res.statusCode = code;
    return res;
  });
  res.json.mockImplementation((body: unknown) => {
    res.body = body;
    return res;
  });
  return res;
};

const makeReq = (body: Record<string, string>): NextApiRequest =>
  ({ body } as unknown as NextApiRequest);

describe('sendEmail', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      SENDGRID_API_KEY: 'SG.test',
      GOOGLE_EMAIL_ADDRESS: 'owner@example.com',
    };
    jest.clearAllMocks();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('sends the contact message through SendGrid', async () => {
    sendMock.mockResolvedValue([{ statusCode: 202 }, {}]);
    const res = makeRes();

    await sendEmail(
      makeReq({ name: 'Radzi', email: 'a@b.com', message: 'Hello' }),
      res as unknown as NextApiResponse
    );

    expect(setApiKeyMock).toHaveBeenCalledWith('SG.test');
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'owner@example.com',
        from: 'owner@example.com',
        subject: 'Message from Radzi',
        html: expect.stringContaining('Hello'),
      })
    );
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ success: true });
  });

  it('fails with 500 when the API key is missing', async () => {
    delete process.env.SENDGRID_API_KEY;
    const res = makeRes();

    await sendEmail(
      makeReq({ name: 'Radzi', email: 'a@b.com', message: 'Hello' }),
      res as unknown as NextApiResponse
    );

    expect(sendMock).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(500);
    expect(res.body).toMatchObject({ success: 'fail' });
  });

  it('fails with 500 when SendGrid rejects', async () => {
    sendMock.mockRejectedValue(new Error('sendgrid down'));
    const res = makeRes();

    await sendEmail(
      makeReq({ name: 'Radzi', email: 'a@b.com', message: 'Hello' }),
      res as unknown as NextApiResponse
    );

    expect(res.statusCode).toBe(500);
    expect(res.body).toMatchObject({ error: 'sendgrid down' });
  });
});
