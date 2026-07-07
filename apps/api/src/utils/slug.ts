import * as crypto from 'node:crypto';

export function slugify(name: string) {
    const base = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    const suffix = crypto.randomUUID().slice(0, 8);
    return `${base}-${suffix}`;
}
