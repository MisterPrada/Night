export function random(min, max)
{
    return Math.random() * (max - min) + min;
}

export function clamp(value, min, max)
{
    return Math.min(Math.max(value, min), max);
}

export const range = (value, inMin, inMax, outMin, outMax) =>
    ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

export function calculateParticleSize(windowHeight, minHeight, maxHeight, minSize, maxSize) {
    // Normalize height between 0 and 1
    let normalizedHeight = (windowHeight - minHeight) / (maxHeight - minHeight);
    normalizedHeight = Math.max(0, Math.min(1, normalizedHeight)); // Clamp between 0 and 1

    // Interpolate between minSize and maxSize based on normalizedHeight
    return minSize + (maxSize - minSize) * normalizedHeight;
}
