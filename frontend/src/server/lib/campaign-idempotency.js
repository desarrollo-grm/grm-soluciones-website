import { getStore } from "@netlify/blobs";

const STORE_NAME = "newsletter-campaigns";
const memoryClaims = globalThis.__grmNewsletterCampaignClaims || new Map();
globalThis.__grmNewsletterCampaignClaims = memoryClaims;

function getClaimStore() {
    try {
        return getStore(STORE_NAME);
    } catch (error) {
        console.warn("[Newsletter] Netlify Blobs is unavailable, using in-memory campaign dedupe.", error.message);
        return null;
    }
}

export async function claimCampaignSend(postId, rev) {
    const key = `posts/${encodeURIComponent(postId)}`;
    const store = getClaimStore();

    if (store) {
        try {
            const { modified } = await store.setJSON(
                key,
                { rev, claimedAt: new Date().toISOString() },
                { onlyIfNew: true },
            );
            return modified;
        } catch (error) {
            console.warn("[Newsletter] Blobs campaign claim failed, using in-memory dedupe.", error.message);
        }
    }

    if (memoryClaims.has(key)) {
        return false;
    }
    memoryClaims.set(key, { rev, claimedAt: new Date().toISOString() });
    return true;
}

export async function releaseCampaignSend(postId) {
    const key = `posts/${encodeURIComponent(postId)}`;
    const store = getClaimStore();

    if (store) {
        try {
            await store.delete(key);
            return;
        } catch (error) {
            console.warn("[Newsletter] Blobs campaign release failed, clearing in-memory claim.", error.message);
        }
    }

    memoryClaims.delete(key);
}
