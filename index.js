const core = require('@actions/core');
const github = require('@actions/github');


try {
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    const comment = JSON.stringify(github.context.payload.comment.body, undefined, 2)
    const pr = JSON.stringify(github.context.payload.pull_request.body, undefined, 2)
    console.log(`The event comment: ${comment} & the event pr: ${pr}`);
    console.log(time)
  } catch (error) {
    core.setFailed(error.message);
  }
