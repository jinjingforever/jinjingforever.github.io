/**
 * Fetches the intro extract for a Wikipedia page.
 * @param {string} title - The Wikipedia page title to search for.
 */
async function fetchWikiIntro(topic) {
  const baseUrl = 'https://en.wikipedia.org/w/api.php';

  // Define the query parameters
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    prop: 'extracts',
    exintro: '', // Boolean flags are often passed as empty strings or "1"
    explaintext: '',
    redirects: '1',
    titles: topic,
    origin: '*', // Required for cross-origin (CORS) requests from a browser
  });

  const response = await fetch(`${baseUrl}?${params.toString()}`, {
    method: 'GET',
    headers: {
      'User-Agent': 'MyWikiScript/1.0',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

window['ai_edge_gallery_get_result'] = async (data) => {
  try {
    const jsonData = JSON.parse(data);
    const ret = await fetchWikiIntro(jsonData.topic);
    const pages = ret.query?.pages ?? [];
    if (Object.keys(pages).length > 0) {
      const firstPageKey = [...Object.keys(pages)][0];
      const firstPage = pages[firstPageKey];
      return firstPage?.extract ?? 'Failed to query';
    } else {
      return {error: `Failed to query wikipedia: ${e.message}`};
    }
  } catch(e) {
    console.error(e);
    return {error: `Failed to query wikipedia: ${e.message}`};
  }
};
