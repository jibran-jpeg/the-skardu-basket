
/**
 * Helper function to resolve image paths for GitHub Pages deployment.
 * 
 * @param {string} path - The image path from the database/state
 * @returns {string} - The resolved path including the base URL if necessary
 */
export const getImageUrl = (path) => {
    if (!path) return '';

    // If path is a localhost URL (from development seeding), convert to relative
    if (path.startsWith('http://localhost') || path.startsWith('http://127.0.0.1')) {
        try {
            const url = new URL(path);
            path = url.pathname;
        } catch (e) {
            console.error('Error parsing localhost URL:', path);
        }
    }

    // If it's a full URL (Supabase or external), return as is
    if (path.startsWith('http') || path.startsWith('blob:') || path.startsWith('data:')) {
        return path;
    }

    // If it's a relative path stored in public folder
    // Clean the path to remove leading slash
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    // Get base URL from Vite env (handles both dev and prod)
    // import.meta.env.BASE_URL will be '/the-skardu-basket/' in prod and '/' in dev
    return `${import.meta.env.BASE_URL}${cleanPath}`;
};
