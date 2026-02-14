import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
kit: {
// Using adapter-node for Dokploy deployment
adapter: adapter({
// Edge server is not needed for Dokploy
edge: false
})
},
preprocess: [mdsvex()],
extensions: ['.svelte', '.svx']
};

export default config;
