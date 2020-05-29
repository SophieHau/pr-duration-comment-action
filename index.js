const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
      const inputs = {
        token: core.getInput("token"),
      };
      const repository = process.env.GITHUB_REPOSITORY;
      const ref = process.env.GITHUB_REF;
      const pr_ref = ref.split("/")

      const time = (new Date()).toTimeString();
      
      const repo = repository.split("/");
      core.debug(`repository: ${repository}`);
  
      const octokit = new github.GitHub(inputs.token);
      console.log("listevents:", octokit.issues.listEvents())
      console.log("meta: ", octokit.meta.get())
      console.log("issues get: ", octokit.issues.get())
      console.log("issues milestone: ", octokit.issues.getMilestone())
  
      // Create a comment
      const { data: comment } = await octokit.issues.createComment({
        owner: repo[0],
        repo: repo[1],
        issue_number: pr_ref[2],
        body: `this is the message at ${time}`,
      });
      core.info(
        `Created comment id '${comment.id} at ${time}'.`
      );
      core.setOutput("comment-id", comment.id, "time", time);

    } catch (error) {
      core.setFailed(error.message);
    }
  }
  
  run();
