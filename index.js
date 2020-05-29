const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
      const inputs = {
        token: core.getInput("token"),
      };
  
      const octokit = new github.GitHub(inputs.token);
      const issue_number = github.context.issue.number;
      const owner = github.context.issue.owner;
      const repo = github.context.issue.repo;

      const createdAt = await github.context.payload.pull_request.created_at;
      const closedAt = await github.context.payload.pull_request.closed_at;
      console.log(createdAt)
      console.log(closedAt)

      const convertSecondsToMinHoursDays = duration => {
        const d = Math.floor(duration / (3600*24));
        const h = Math.floor(duration % (3600*24) / 3600);
        const m = Math.floor(duration % 3600 / 60);
        const s = Math.floor(duration % 60);

        const dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
        const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        const mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
        const sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
        return dDisplay + hDisplay + mDisplay + sDisplay;
        }

      const elapsedTimeInSeconds = (closedAt - createdAt) / 1000;
      console.log(elapsedTimeInSeconds)
      const elapsedTime = convertSecondsToMinHoursDays(elapsedTimeInSeconds);
      console.log(elapsedTime)

      // Create a comment
      const { data: comment } = await octokit.issues.createComment({
        owner,
        repo,
        issue_number,
        body: `This PR took ${elapsedTime} to complete!`,
      });
      core.info(
        `Created comment id: '${comment.id}'.`
      );

    } catch (error) {
      core.setFailed(error.message);
    }
  }
  
  run();
