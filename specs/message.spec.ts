import { describe, expect, test } from 'bun:test';
import type { Message } from '@src/types/Message.type';

const endpoint = `http://localhost:${process.env.SERVER_PORT}/api/message`;

describe('sending messages', () => {
  test('empty values', async () => {
    await fetch(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        sender: '',
        email: '',
        subject: '',
        body: ''
      } as Message)
    })
      .then(response => {
        expect(response.status).toBe(400);
      });
  });
  test('not a valid email', async () => {
    await fetch(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        sender: 'Tester',
        email: 'some@email',
        subject: 'Some Email',
        body: 'Some text here...'
      } as Message)
    })
      .then(response => {
        expect(response.status).toBe(400);
      });
  });
  test('send a valid message', async () => {
    await fetch(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        sender: 'Tester',
        email: process.env.PUBLIC_EMAIL,
        subject: 'Some Email',
        body: 'Some text here...'
      } as Message)
    })
      .then(response => {
        expect(response.status).toBe(201);
      });
  });
});