import Contact from './Contact';

describe('Contact model', () => {
  it('validates a complete contact document', async () => {
    const contact = new Contact({
      name: 'Radzi',
      email: 'radzi@example.com',
      message: 'Hello there',
    });

    await expect(contact.validate()).resolves.toBeUndefined();
    expect(contact.read).toBe(false);
  });

  it('requires a name', async () => {
    const contact = new Contact({
      email: 'radzi@example.com',
      message: 'Hello there',
    });

    await expect(contact.validate()).rejects.toMatchObject({
      errors: { name: expect.anything() },
    });
  });

  it('requires a valid email', async () => {
    const contact = new Contact({
      name: 'Radzi',
      email: 'not-an-email',
      message: 'Hello there',
    });

    await expect(contact.validate()).rejects.toMatchObject({
      errors: { email: expect.anything() },
    });
  });

  it('requires a message', async () => {
    const contact = new Contact({
      name: 'Radzi',
      email: 'radzi@example.com',
    });

    await expect(contact.validate()).rejects.toMatchObject({
      errors: { message: expect.anything() },
    });
  });

  it('enforces the name length limit', async () => {
    const contact = new Contact({
      name: 'a'.repeat(101),
      email: 'radzi@example.com',
      message: 'Hello',
    });

    await expect(contact.validate()).rejects.toMatchObject({
      errors: { name: expect.anything() },
    });
  });

  it('enforces the message length limit', async () => {
    const contact = new Contact({
      name: 'Radzi',
      email: 'radzi@example.com',
      message: 'a'.repeat(5001),
    });

    await expect(contact.validate()).rejects.toMatchObject({
      errors: { message: expect.anything() },
    });
  });
});
