import { cerberus } from '@skeletonlabs/skeleton';

/** @type {import('@skeletonlabs/skeleton').Config} */
export default {
themes: [cerberus],
structure: {
base: [
{
id: 'cerberus',
name: 'Cerberus',
description: 'Dark theme with luxury aesthetic'
}
],
components: [],
presets: []
},
themesPlugin: {
strategy: 'default',
auto: {
cssPath: 'src/routes/layout.css',
cssLayer: {
base: 'base',
components: 'components',
utilities: 'utilities',
theme: 'theme'
}
}
}
};
