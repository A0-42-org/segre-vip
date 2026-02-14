// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

declare global {
namespace App {
interface Locals {
auth: typeof import("$lib/auth").auth;
session?: {
user: {
id: string;
name: string | null;
email: string;
createdAt: Date;
updatedAt: Date;
};
expiresAt: Date;
token: string;
};
}
// interface PageData {}
// interface Platform {}
}
}

export {};
