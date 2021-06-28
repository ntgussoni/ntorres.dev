export async function getContributions(token, username) {
  const headers = {
    Authorization: `bearer ${token}`,
  };
  const body = {
    query: `query {
          user(login: "ntgussoni") {
            bio
            repositoriesContributedTo(first: 10 ){
              nodes{
                id
                url
                name
                description
              }
            }
          }
        }`,
  };
  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headers,
    });

    const { data } = await response.json();
    return data.user;
  } catch (e) {
    console.log('The data could not be loaded');
    return null;
  }
}
