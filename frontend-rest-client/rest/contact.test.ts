import { makeRequest } from '../makeRequest';
import { sendEmailWith } from './contact';

jest.mock('../makeRequest', () => ({
  makeRequest: jest.fn(),
}));

const makeRequestMock = makeRequest as jest.Mock;

describe('sendEmailWith', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('posts the contact form as JSON to the contact API', () => {
    const data = { name: 'Radzi', email: 'a@b.com', message: 'Hi' };
    makeRequestMock.mockResolvedValue({ data: { success: true } });

    sendEmailWith(data);

    expect(makeRequestMock).toHaveBeenCalledWith({
      url: '/api/contact',
      method: 'POST',
      data,
      headers: { 'Content-Type': 'application/json' },
    });
  });
});
