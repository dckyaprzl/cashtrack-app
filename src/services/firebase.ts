import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth } from 'firebase/auth';
import * as FirebaseAuth from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const getReactNativePersistence = (
    FirebaseAuth as typeof FirebaseAuth & {
        getReactNativePersistence?: (storage: typeof AsyncStorage) => unknown;
    }
).getReactNativePersistence;

// #region agent log
fetch('http://127.0.0.1:7517/ingest/f92ec44b-bae2-46ec-be50-69ece1e6334b', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '55f8b1' },
    body: JSON.stringify({
        sessionId: '55f8b1',
        runId: 'pre-fix',
        hypothesisId: 'A',
        location: 'src/services/firebase.ts:auth-exports',
        message: 'firebase/auth runtime export check',
        data: {
            platform: Platform.OS,
            hasGetReactNativePersistence: typeof getReactNativePersistence === 'function',
            persistenceRelatedKeys: Object.keys(FirebaseAuth).filter((k) =>
                /persist|initializeAuth|getAuth/i.test(k)
            ),
        },
        timestamp: Date.now(),
    }),
}).catch(() => {});
const metroRequire = require as unknown as { resolve?: (id: string) => string };
fetch('http://127.0.0.1:7517/ingest/f92ec44b-bae2-46ec-be50-69ece1e6334b', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '55f8b1' },
    body: JSON.stringify({
        sessionId: '55f8b1',
        runId: 'pre-fix',
        hypothesisId: 'B',
        location: 'src/services/firebase.ts:auth-react-native-path',
        message: 'RN require has no Node resolve; skip firebase/auth/react-native',
        data: {
            hasRequireResolve: typeof metroRequire.resolve === 'function',
            skippedMissingAuthReactNativeImport: true,
        },
        timestamp: Date.now(),
    }),
}).catch(() => {});
// #endregion

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

let authInitPath: 'rn-persistence' | 'initializeAuth-default' | 'initializeAuth-error' =
    'initializeAuth-default';
let authInitError: string | null = null;
let authInstance: ReturnType<typeof initializeAuth>;

try {
    if (typeof getReactNativePersistence === 'function') {
        authInitPath = 'rn-persistence';
        authInstance = initializeAuth(app, {
            persistence: getReactNativePersistence(AsyncStorage) as never,
        });
    } else {
        authInitPath = 'initializeAuth-default';
        authInstance = initializeAuth(app);
    }
} catch (error) {
    authInitPath = 'initializeAuth-error';
    authInitError = String(error);
    authInstance = initializeAuth(app);
}

// #region agent log
fetch('http://127.0.0.1:7517/ingest/f92ec44b-bae2-46ec-be50-69ece1e6334b', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '55f8b1' },
    body: JSON.stringify({
        sessionId: '55f8b1',
        runId: 'pre-fix',
        hypothesisId: 'D',
        location: 'src/services/firebase.ts:initializeAuth',
        message: 'initializeAuth result',
        data: { platform: Platform.OS, authInitPath, authInitError, hasAuth: Boolean(authInstance) },
        timestamp: Date.now(),
    }),
}).catch(() => {});
// #endregion

export const auth = authInstance; 