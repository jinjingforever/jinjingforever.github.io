async function createGithubIssue(repo, token, title, content) {
  const URL = `https://api.github.com/repos/${repo}/issues`;

  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        body: content,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `GitHub API Error: ${response.status} - ${errorData.message}`,
      );
    }

    const data = await response.json();
    console.log('Issue created successfully!');
    console.log('Issue URL:', data.html_url);
    return `Success! The issue url is: ${data.html_url}`;
  } catch (error) {
    console.error('Failed to create issue:', error.message);
    return 'failed';
  }
}

window['ai_edge_gallery_get_result'] = async (data, token) => {
  try {
    const jsonData = JSON.parse(data);
    return await createGithubIssue(
      jsonData.repo,
      token,
      jsonData.title,
      jsonData.content,
    );
  } catch (e) {
    return "failed"
  }
};
