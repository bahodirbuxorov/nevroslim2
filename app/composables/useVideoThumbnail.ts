export function useYoutubeThumbnail() {
  function getThumbnail(url?: string): string | undefined {
    if (!url) return undefined
    const regex
      = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    const match = url.match(regex)
    if (!match) return undefined

    const videoId = match[1]
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }

  return { getThumbnail }
}
