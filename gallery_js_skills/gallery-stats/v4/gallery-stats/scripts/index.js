async function getGalleryData() {
  const url = 'https://gallery-data.pages.dev/data.json';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Initialize variables to hold our specific values
    let totalDownloads = null;
    let currentUsers = null;

    // Map through the frames to find the specific icons
    data.frames.forEach((frame) => {
      if (frame.icon === 11537) {
        totalDownloads = frame.text;
      }
      if (frame.icon === 40354) {
        currentUsers = frame.text;
      }
    });

    // Create the result object
    const result = {
      'total downloads': totalDownloads,
      'current users': currentUsers,
    };

    // Return as a JSON string
    return JSON.stringify(result);
  } catch (error) {
    console.error('Could not fetch data:', error);
    return JSON.stringify({error: 'Failed to fetch or parse data'});
  }
}

window['ai_edge_gallery_get_result'] = async () => {
  return await getGalleryData();
};
