// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
namespace App {
interface Locals {
auth: typeof import("$lib/auth").auth;
}
// interface PageData {}
// interface Platform {}
}
}

export {};
