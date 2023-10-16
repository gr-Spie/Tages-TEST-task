const fetch = require('node-fetch');

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

async function createUsersWithPosts() {
    const users = await fetchData('http://jsonplaceholder.typicode.com/users');
    const posts = await fetchData('http://jsonplaceholder.typicode.com/posts');
  
    const result = users.map((user) => {
        const userPosts = posts
        .filter((post) => post.userId === user.id)
        .map((post) => ({
          id: post.id,
          title: post.title,
          body: post.body,
        }));
    
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        address: `${user.address.city}, ${user.address.street}, ${user.address.suite}`,
        website: `https://${user.website}`,
        company: user.company.name,
        posts: userPosts,
      };
    });
    
  
    return result;
  }
  
  createUsersWithPosts().then((result) => {
    console.log(result.slice(0, 10)); 
  });

