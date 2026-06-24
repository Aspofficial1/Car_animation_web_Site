/**
 * Preloads all scroll animation frames into memory
 * Returns array of Image objects (already decoded)
 */
export async function preloadFrames(totalFrames = 240, basePath = '/assets/scorll_based_images/ezgif-11fee8090461b62a-png-split/') {
  const images = new Array(totalFrames)

  const loadImage = (index) => {
    return new Promise((resolve) => {
      const frameNum = String(index + 1).padStart(3, '0')
      const img = new Image()
      img.src = `${basePath}ezgif-frame-${frameNum}.png`
      img.onload = () => resolve(img)
      img.onerror = () => {
        // Fallback: resolve with null if image fails
        console.warn(`Frame ${frameNum} failed to load`)
        resolve(null)
      }
    })
  }

  // Load in batches of 20 for performance
  const batchSize = 20
  for (let i = 0; i < totalFrames; i += batchSize) {
    const batch = []
    for (let j = i; j < Math.min(i + batchSize, totalFrames); j++) {
      batch.push(loadImage(j))
    }
    const loaded = await Promise.all(batch)
    loaded.forEach((img, idx) => {
      images[i + idx] = img
    })
  }

  return images
}
