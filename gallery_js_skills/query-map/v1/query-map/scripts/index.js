window['ai_edge_gallery_get_result'] = async (data) => {
  try {
    const jsonData = JSON.parse(data);
    const location = jsonData.location;
    const encodedLocation = encodeURIComponent(location);
    return JSON.stringify({
      webview: {
        iframe: true,
        url: `https://maps.google.com/maps?q=${encodedLocation}&output=embed`,
      },
    });
  } catch (e) {
    console.error(e);
    return {error: `Failed to query location on map: ${e.message}`};
  }
};
