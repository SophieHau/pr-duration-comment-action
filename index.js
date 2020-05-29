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
      const issue_number = github.context.issue.number;
      const owner = github.context.issue.owner;
      const repo = github.context.issue.repo;

      const created_at = github.context.payload.pull_request.created_at;
      console.log("created: ", created_at)
      const closed_at = github.context.payload.pull_request.closed_at;
      console.log("closed: ", closed_at)

      // Create a comment
      const { data: comment } = await octokit.issues.createComment({
        owner,
        repo,
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
