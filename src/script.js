//import octokit from the node_modules folder
import {
  Octokit
} from "https://cdn.skypack.dev/@octokit/core";
const octokit = new Octokit({
  auth: gitToken,
});

var result = null;
var owner = "quentinmathieu"
var repo = "Github_API"


try {
  result = await octokit.request('GET /repos/{owner}/{repo}/commits', {
    owner: owner,
    repo: repo,

  })

} catch (error) {
  console.log(`Error! Status: ${error.status}. Rate limit remaining: ${error.headers["x-ratelimit-remaining"]}. Message: ${error.response.data.message}`)
}

















const commitSHAs = result.data.map(commit => commit.sha);


async function getCommitChanges(commitSHAs) {
  commitSHAs.forEach(async (commitSHA) => {
    const commit = await octokit.request('GET /repos/{owner}/{repo}/commits/{commit_sha}', {
      owner: owner,
      repo: repo,
      commit_sha: commitSHA
    });
    commit.data.files.forEach(file => {
      if ((file.filename.slice(0, 6)) != "node_m" && file.patch)
      {
        console.log(`Changes to ${file.filename}:`);
        console.log(file.patch);
        document.body.innerHTML = "<p style='white-space:pre'>" + file.patch + "</p>"+ document.body.innerHTML;
        
      }
    });
    document.body.innerHTML = "<h1>" + commit.data.commit.message + "</h1>" + document.body.innerHTML;
    // throw new Error("my error message");

  });
}

getCommitChanges(commitSHAs);

