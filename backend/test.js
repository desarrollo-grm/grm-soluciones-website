// test.js
import test from 'node:test';
import assert from 'node:assert';

import { loadEnvFile } from "node:process";

loadEnvFile();

const TEST_RECIPIENT = process.env.BREVO_TEST_RECIPIENT;


// Adjust this port to match whatever port your server.js runs on!
const API_URL = `http://localhost:${process.env.API_PORT || 8787}`; ; 

/** ---------------------------------------------------------
 *
 *  TEST SEND WELCOME EMAIL
 * 
 * --------------------------------------------------------- */ 

// test('GET /api/send-welcome - Should return healthy status', async () => {
//     const response = await fetch(`${API_URL}/api/send-welcome`);
//     const data = await response.json();
// 
//     assert.strictEqual(response.status, 200);
//     assert.strictEqual(data.ok, true);
//     assert.strictEqual(data.status, 'healthy');
//     assert.strictEqual(data.route, '/send-welcome');
// });
// 
// test('POST /api/send-welcome - Should return 400 for invalid recipient list', async () => {
//     const response = await fetch(`${API_URL}/api/send-welcome`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ to: [{ email: 'bad-email' }] }) // Invalid payload
//     });
//     const data = await response.json();
// 
//     assert.strictEqual(response.status, 400);
//     assert.strictEqual(data.ok, false);
//     assert.strictEqual(data.error, 'Invalid recipient list. Expected [{ email, name? }] with valid email(s).');
// });
// 
// test('POST /api/send-welcome - Should return 200 for valid recipient list', async () => {
//     const response = await fetch(`${API_URL}/api/send-welcome`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ to: [{ email: TEST_RECIPIENT }] }) // Valid payload
//     });
//     const data = await response.json();
// 
//     assert.strictEqual(response.status, 200);
//     assert.strictEqual(data.ok, true);
// });
// 
/** --------------------------------------------------------- 
 * 
 *  TEST SEND NEW POST EMAIL
 * 
 *  --------------------------------------------------------- */

test('GET /api/send-new-post - Should return 200 health check', async () => {
    const response = await fetch(`${API_URL}/api/send-new-post`, {
        method: 'GET'
    });
    const data = await response.json();

    assert.strictEqual(response.status, 200);
    assert.strictEqual(data.ok, true);
    assert.strictEqual(data.status, "healthy");
});

test('PUT /api/send-new-post - Should return 405 Method Not Allowed', async () => {
    const response = await fetch(`${API_URL}/api/send-new-post`, {
        method: 'PUT', // Testing a disallowed method
    });
    const data = await response.json();

    assert.strictEqual(response.status, 405);
    assert.strictEqual(data.ok, false);
    assert.strictEqual(data.error, "Method not allowed");
});

test('POST /api/send-new-post - Should send bulk email via BCC (200)', async () => {
    // 1. Ensure at least one contact exists in the DB so it has someone to BCC
    await fetch(`${API_URL}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: TEST_RECIPIENT }) // Ensure a test recipient exists
    });

    // 2. Trigger the new post email blast
    const response = await fetch(`${API_URL}/api/send-new-post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "title": "Test Post Title",
            "excerpt": "This is a test excerpt for the new post email.",
            "slug": { "current": "test-post-slug" },
            "tags": ["test", "email"]
        }) // Empty body since it fetches from DB
    });
    const data = await response.json();

    // 3. Assertions
    assert.strictEqual(response.status, 200, "Expected 200 OK after successful blast");
    assert.strictEqual(data.ok, true);
    
    // We check that messageId exists and is not null
    assert.ok(data.messageId !== null && data.messageId !== undefined, "Expected a valid messageId from Brevo");
});

/** ---------------------------------------------------------
 *
 *  TEST SUBSCRIBE
 * 
 * --------------------------------------------------------- */ 

// test('GET /api/subscribe - Should return healthy status', async () => {
//     const response = await fetch(`${API_URL}/api/subscribe`);
//     const data = await response.json();
// 
//     assert.strictEqual(response.status, 200);
//     assert.strictEqual(data.ok, true);
//     assert.strictEqual(data.status, 'healthy');
//     assert.strictEqual(data.route, '/subscribe');
// });
// 
// test('POST /api/subscribe - Should return 400 for invalid email', async () => {
//     const response = await fetch(`${API_URL}/api/subscribe`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: 'not-an-email' }) // Invalid email
//     });
//     const data = await response.json();
// 
//     assert.strictEqual(response.status, 400);
//     assert.strictEqual(data.ok, false);
//     assert.strictEqual(data.error, 'Invalid email address.');
// });
// 
// test('POST /api/subscribe - Should return 200 for valid email', async () => {
//     const response = await fetch(`${API_URL}/api/subscribe`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: 'valid@example.com' }) // Valid email
//     });
//     const data = await response.json();
// 
//     assert.strictEqual(response.status, 201);
//     assert.strictEqual(data.ok, true);
// });
// 
// test('POST /api/subscribe - Should return 409 for duplicate email', async () => {
//     // 1. Ensure we have a specific email for the duplicate test
//     const duplicateEmail = "duplicate-tester@example.com";
//     const payload = JSON.stringify({ email: duplicateEmail });
// 
//     // 2. Make the first request. 
//     // (We don't assert this one, because depending on the database state, 
//     // it might return 201 Created or 409 Conflict. We just need it to exist).
//     await fetch(`${API_URL}/api/subscribe`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: payload
//     });
// 
//     // 3. Make the second request. This one is GUARANTEED to be a duplicate.
//     const response = await fetch(`${API_URL}/api/subscribe`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: payload
//     });
//     
//     const data = await response.json();
// 
//     // 4. Assert that the server caught the Brevo error and returned our custom response
//     assert.strictEqual(response.status, 409, "Expected status code 409 Conflict");
//     assert.strictEqual(data.ok, false);
//     assert.strictEqual(data.code, "duplicate_parameter");
//     assert.strictEqual(data.error, "This email is already subscribed.");
// });
// 
// /** ---------------------------------------------------------
//  *
//  *  TEST UNSUBSCRIBE
//  * 
//  * --------------------------------------------------------- */ 
// 
// test('GET /api/unsubscribe - Should return healthy status', async () => {
//     const response = await fetch(`${API_URL}/api/unsubscribe`);
//     const data = await response.json();
// 
//     assert.strictEqual(response.status, 200);
//     assert.strictEqual(data.ok, true);
//     assert.strictEqual(data.status, 'healthy');
//     assert.strictEqual(data.route, '/unsubscribe');
// });
// 
// test('POST /api/unsubscribe - Should return 400 for invalid email payload', async () => {
//     const response = await fetch(`${API_URL}/api/unsubscribe`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: "invalid-email-format" })
//     });
//     const data = await response.json();
// 
//     assert.strictEqual(response.status, 400);
//     assert.strictEqual(data.ok, false);
// });
// 
// test('POST /api/unsubscribe - Should return 404 if email does not exist in Brevo', async () => {
//     const nonExistentEmail = "ghost-contact-12345@example.com";
//     const response = await fetch(`${API_URL}/api/unsubscribe`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: nonExistentEmail })
//     });
//     const data = await response.json();
// 
//     // 404 means our catch block successfully caught Brevo's "document_not_found"
//     assert.strictEqual(response.status, 404);
//     assert.strictEqual(data.code, "document_not_found");
// });
// 
// test('POST /api/unsubscribe - Should successfully unsubscribe an existing user (200)', async () => {
//     const targetEmail = "unsub-tester@example.com";
//     
//     // 1. Ensure the contact exists by subscribing them first
//     await fetch(`${API_URL}/api/subscribe`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: targetEmail })
//     });
// 
//     // 2. Now attempt to delete (unsubscribe) them
//     const response = await fetch(`${API_URL}/api/unsubscribe`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: targetEmail })
//     });
//     const data = await response.json();
// 
//     assert.strictEqual(response.status, 200, "Expected 200 OK after successful deletion");
//     assert.strictEqual(data.ok, true);
//     assert.strictEqual(data.message, "Successfully unsubscribed.");
// });
// 
// test('GET /api/unsubscribe?email=... - Should handle clicks from email links', async () => {
//     // Simulating a user clicking the URL directly from their email inbox
//     const encodedEmail = encodeURIComponent("link-clicker@example.com");
//     
//     // Using GET request with query params
//     const response = await fetch(`${API_URL}/api/unsubscribe?email=${encodedEmail}`, {
//         method: 'GET'
//     });
//     const data = await response.json();
// 
//     // If it returns 404/document_not_found, it proves the GET query parsing is working perfectly!
//     assert.strictEqual(response.status, 404);
//     assert.strictEqual(data.code, "document_not_found");
// });