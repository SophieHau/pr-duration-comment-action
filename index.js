const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
      const inputs = {
        token: core.getInput("token"),
      };
      // const repository = process.env.GITHUB_REPOSITORY;
      // const ref = process.env.GITHUB_REF;
      // const pr_ref = ref.split("/")

      const time = (new Date()).toTimeString();
      
      // const repo = repository.split("/");
      // core.debug(`repository: ${repository}`);
  
      const octokit = new github.GitHub(inputs.token);
      issue_number = github.context.issue.number
      console.log("issue number: ", issue_number)
      console.log("listevents:",await octokit.issues.listEvents({issue_number: issue_number}))
      console.log("meta: ", await octokit.meta.get({issue_number: issue_number}))
      console.log("issues get: ", await octokit.issues.get({issue_number: issue_number}))
      console.log("issues milestone: ", await octokit.issues.getMilestone({issue_number: issue_number}))
  
      // Create a comment
      const { data: comment } = await octokit.issues.createComment({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        issue_number,
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
