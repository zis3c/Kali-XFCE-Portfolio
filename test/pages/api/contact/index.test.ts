import { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from '../../../../backend/controllers/contactsController';
import handler, {
  isAllowedContactRequest,
} from '../../../../pages/api/contact/index';

jest.mock('../../../../backend/controllers/contactsController', () => ({
  sendEmail: jest.fn(),
}));

const sendEmailMock = sendEmail as jest.Mock;

interface MockResponse {
  statusCode: number;
  body: unknown;
  headers: Record<string, unknown>;
  redirectPath: string | null;
  status: jest.Mock;
  json: jest.Mock;
  redirect: jest.Mock;
  setHeader: jest.Mock;
}

const makeRes = (): MockResponse => {
  const res: MockResponse = {
    statusCode: 0,
    body: null,
    headers: {},
    redirectPath: null,
    status: jest.fn(),
    json: jest.fn(),
    redirect: jest.fn(),
    setHeader: jest.fn(),
  };
  res.status.mockImplementation((code: number) => {
    res.statusCode = code;
    return res;
  });
  res.json.mockImplementation((body: unknown) => {
    res.body = body;
    return res;
  });
  res.redirect.mockImplementation((path: string) => {
    res.redirectPath = path;
    return res;
  });
  res.setHeader.mockImplementation((key: string, value: unknown) => {
    res.headers[key] = value;
  });
  return res;
};

const makeReq = (
  method: string,
  overrides: Partial<NextApiRequest> = {}
): NextApiRequest =>
  ({
    method,
    url: '/api/contact',
    headers: {},
    body: {},
    socket: {},
    ...overrides,
  } as unknown as NextApiRequest);

const validBody = {
  name: 'Radzi',
  email: 'radzi@example.com',
  message: 'Hello',
};

describe('isAllowedContactRequest', () => {
  it('allows requests without an origin', () => {
    expect(isAllowedContactRequest(makeReq('POST'))).toBe(true);
  });

  it('allows the canonical site origin', () => {
    expect(
      isAllowedContactRequest(
        makeReq('POST', { headers: { origin: 'https://me.zis3c.dev' } })
      )
    ).toBe(true);
  });

  it('allows local development origin', () => {
    expect(
      isAllowedContactRequest(
        makeReq('POST', { headers: { origin: 'http://localhost:8888' } })
      )
    ).toBe(true);
  });

  it('rejects unknown origins', () => {
    expect(
      isAllowedContactRequest(
        makeReq('POST', { headers: { origin: 'https://evil.example' } })
      )
    ).toBe(false);
  });

  it('ignores invalid origin values', () => {
    expect(
      isAllowedContactRequest(
        makeReq('POST', { headers: { origin: 'not a url' } })
      )
    ).toBe(true);
  });
});

describe('POST /api/contact', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    sendEmailMock.mockImplementation(
      (_req: NextApiRequest, res: NextApiResponse) => {
        res.status(200).json({ success: true });
      }
    );
  });

  it('rejects invalid input with 400', async () => {
    const req = makeReq('POST', {
      headers: { 'x-forwarded-for': '10.0.0.1' },
      body: { name: '', email: 'bad', message: '' },
    });
    const res = makeRes();

    void handler(req, res as unknown as NextApiResponse);
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(res.statusCode).toBe(400);
    expect(res.body).toMatchObject({ success: false });
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  it('rejects cross-origin posts with 403', async () => {
    const req = makeReq('POST', {
      headers: {
        'x-forwarded-for': '10.0.0.2',
        origin: 'https://evil.example',
      },
      body: validBody,
    });
    const res = makeRes();

    void handler(req, res as unknown as NextApiResponse);
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(res.statusCode).toBe(403);
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  it('delegates valid requests to the email controller', async () => {
    const req = makeReq('POST', {
      headers: { 'x-forwarded-for': '10.0.0.3' },
      body: validBody,
    });
    const res = makeRes();

    void handler(req, res as unknown as NextApiResponse);
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(sendEmailMock).toHaveBeenCalledTimes(1);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ success: true });
  });

  it('sets a correlation id response header', async () => {
    const req = makeReq('POST', {
      headers: { 'x-forwarded-for': '10.0.0.4' },
      body: validBody,
    });
    const res = makeRes();

    void handler(req, res as unknown as NextApiResponse);
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(res.headers['X-Request-Id']).toEqual(expect.any(String));
  });
});

describe('unsupported methods', () => {
  it('returns JSON 404 for API clients', async () => {
    const req = makeReq('GET', { headers: { accept: 'application/json' } });
    const res = makeRes();

    void handler(req, res as unknown as NextApiResponse);
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ success: false, message: 'Not found.' });
  });

  it('redirects browsers to the 404 page', async () => {
    const req = makeReq('GET', { headers: { accept: 'text/html' } });
    const res = makeRes();

    void handler(req, res as unknown as NextApiResponse);
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(res.redirectPath).toBe('/404');
  });
});
