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

      console.log("issue number: ", issue_number)
      console.log("listevents:",await octokit.issues.listEvents({
        owner,
        repo,
        issue_number
      }))
      console.log("issue: ", github.context.issue)
      console.log("payload: ", github.context.payload)
  
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
