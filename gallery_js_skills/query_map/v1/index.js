window['ai_edge_gallery_get_result'] = async (data) => {
  const encodedData = encodeURIComponent(data);
  return JSON.stringify({
    webview: {
      iframe: true,
      url: `https://maps.google.com/maps?q=${encodedData}&output=embed`,
    },
  });
};
