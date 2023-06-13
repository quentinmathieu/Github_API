//import octokit from the node_modules folder
import {
  Octokit
} from "https://cdn.skypack.dev/@octokit/core";
      const octokit = new Octokit({ 
auth: gitToken,
});

var result = null;




try {
  result = await octokit.request('GET /repos/{owner}/{repo}/commits', {
    owner: 'quentinmathieu',
    repo: 'SfEasyAdmin4',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  



} catch (error) {
  console.log(`Error! Status: ${error.status}. Rate limit remaining: ${error.headers["x-ratelimit-remaining"]}. Message: ${error.response.data.message}`)
}

// result.data.forEach((commit) => {
//     // console.log(commit.commit.message)
//     console.log(commit.commit)
// });
const commitSHAs = result.data.map(commit => commit.sha);
console.log(commitSHAs);


// const result = await octokit.repos.compareCommits({
//   owner: 'quentinmathieu',
//   repo: 'SfEasyAdmin4',
//   base: 'commit1_sha',
//   head: 'commit2_sha'
// });

// console.log(result.data.files);
