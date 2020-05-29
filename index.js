const core = require('@actions/core');
const github = require('@actions/github');


async function run() {
    try {
      const inputs = {
        token: core.getInput("token"),
        body: core.getInput("body"),
      };
      console.log(inputs)
      console.log(process.env)  
      const repository = process.env.GITHUB_REPOSITORY;
    
      const repo = repository.split("/");
      core.debug(`repository: ${repository}`);
  
  
      const octokit = new github.GitHub(inputs.token);
      console.log(octokit)
  
      // Create a comment
      const { data: comment } = await octokit.issues.createComment({
        owner: repo[0],
        repo: repo[1],
        body: inputs.body,
      });
      core.info(
        `Created comment id '${comment.id}' on issue '${inputs.issueNumber}'.`
      );
      core.setOutput("comment-id", comment.id);

    } catch (error) {
      core.debug(inspect(error));
      core.setFailed(error.message);
    }
  }
  
  run();