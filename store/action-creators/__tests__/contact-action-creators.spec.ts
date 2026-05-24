import { sendEmailViaSendgrid, clearEmailState } from '../contact-action-creators';
import { ContactActionTypes, ContactFormData } from '../../../types/redux/contact-reducer-types';
import { sendEmailWith } from '../../../frontend-rest-client/rest/contact';

// Mock the API client
jest.mock('../../../frontend-rest-client/rest/contact', () => ({
  sendEmailWith: jest.fn(),
}));

describe('Contact Action Creators', () => {
  const mockFormData: ContactFormData = {
    name: 'Test User',
    email: 'test@example.com',
    message: 'Hello World',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('clearEmailState should return the correct action object', () => {
    const action = clearEmailState();
    expect(action).toStrictEqual({
      type: ContactActionTypes.CLEAR_EMAIL_STATE,
    });
  });

  test('sendEmailViaSendgrid dispatches SEND_EMAIL and EMAIL_WAS_SENT on success', async () => {
    const mockResponse = { data: { success: true } };
    (sendEmailWith as jest.Mock).mockResolvedValue(mockResponse);

    const dispatch = jest.fn();
    const thunk = sendEmailViaSendgrid(mockFormData);

    await thunk(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ContactActionTypes.SEND_EMAIL,
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: ContactActionTypes.EMAIL_WAS_SENT,
      payload: true,
    });
    expect(sendEmailWith).toHaveBeenCalledWith(mockFormData);
  });

  test('sendEmailViaSendgrid dispatches SEND_EMAIL and EMAIL_SEND_ERROR on failure', async () => {
    const mockError = new Error('Network Failure');
    (sendEmailWith as jest.Mock).mockRejectedValue(mockError);

    const dispatch = jest.fn();
    const thunk = sendEmailViaSendgrid(mockFormData);

    await thunk(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ContactActionTypes.SEND_EMAIL,
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: ContactActionTypes.EMAIL_SEND_ERROR,
      payload: 'Network Failure',
    });
    expect(sendEmailWith).toHaveBeenCalledWith(mockFormData);
  });
});
