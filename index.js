const { inspect } = require("util");
const core = require('@actions/core');
const github = require('@actions/github');


async function run() {
    try {
      const inputs = {
        token: core.getInput("token"),
        repository: core.getInput("repository"),
        issueNumber: core.getInput("issue-number"),
        commentId: core.getInput("comment-id"),
        body: core.getInput("body"),
      };
      console.log(inputs)
      console.log(process.env.GITHUB_REPOSITORY)
      core.debug(`Inputs: ${inspect(inputs)}`);
  
      const repository = inputs.repository
        ? inputs.repository
        : process.env.GITHUB_REPOSITORY;
      const repo = repository.split("/");
      core.debug(`repository: ${repository}`);
  
  
      const octokit = new github.GitHub(inputs.token);
  
     if (inputs.issueNumber) {
        // Create a comment
        if (!inputs.body) {
          core.setFailed("Missing comment 'body'.");
          return;
        }
        const { data: comment } = await octokit.issues.createComment({
          owner: repo[0],
          repo: repo[1],
          issue_number: inputs.issueNumber,
          body: inputs.body,
        });
        core.info(
          `Created comment id '${comment.id}' on issue '${inputs.issueNumber}'.`
        );
        core.setOutput("comment-id", comment.id);

      } else {
        core.setFailed("Missing either 'issue-number' or 'comment-id'.");
        return;
      }
    } catch (error) {
      core.debug(inspect(error));
      core.setFailed(error.message);
    }
  }
  
  run();