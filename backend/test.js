// test.js
import test from 'node:test';
import assert from 'node:assert';

import { loadEnvFile } from "node:process";

loadEnvFile();

const TEST_RECIPIENT = process.env.BREVO_TEST_RECIPIENTS;


// Adjust this port to match whatever port your server.js runs on!
const API_URL = `http://localhost:${process.env.API_PORT || 8787}`; ; 

test('GET /api/send-welcome - Should return healthy status', async () => {
    const response = await fetch(`${API_URL}/api/send-welcome`);
    const data = await response.json();

    assert.strictEqual(response.status, 200);
    assert.strictEqual(data.ok, true);
    assert.strictEqual(data.status, 'healthy');
});

test('POST /api/send-welcome - Should return 400 for invalid recipient list', async () => {
    const response = await fetch(`${API_URL}/api/send-welcome`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: [{ email: 'bad-email' }] }) // Invalid payload
    });
    const data = await response.json();

    assert.strictEqual(response.status, 400);
    assert.strictEqual(data.ok, false);
    assert.strictEqual(data.error, 'Invalid recipient list. Expected [{ email, name? }] with valid email(s).');
});

test('POST /api/send-welcome - Should return 200 for valid recipient list', async () => {
    const response = await fetch(`${API_URL}/api/send-welcome`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: [{ email: TEST_RECIPIENT }] }) // Valid payload
    });
    const data = await response.json();

    assert.strictEqual(response.status, 200);
    assert.strictEqual(data.ok, true);
});


test('GET /api/subscribe - Should return healthy status', async () => {
    const response = await fetch(`${API_URL}/api/subscribe`);
    const data = await response.json();

    assert.strictEqual(response.status, 200);
    assert.strictEqual(data.ok, true);
    assert.strictEqual(data.status, 'healthy');
    assert.strictEqual(data.route, '/subscribe'); // Based on your code
});

test('POST /api/subscribe - Should return 400 for invalid email', async () => {
    const response = await fetch(`${API_URL}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'not-an-email' }) // Invalid email
    });
    const data = await response.json();

    assert.strictEqual(response.status, 400);
    assert.strictEqual(data.ok, false);
    assert.strictEqual(data.error, 'Invalid email address.');
});

test('POST /api/subscribe - Should return 200 for valid email', async () => {
    const response = await fetch(`${API_URL}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'valid@example.com' }) // Valid email
    });
    const data = await response.json();

    assert.strictEqual(response.status, 201);
    assert.strictEqual(data.ok, true);
});
