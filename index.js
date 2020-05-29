const core = require('@actions/core');
const github = require('@actions/github');


try {
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event comment: ${payload}`);
    console.log(time)
  } catch (error) {
    core.setFailed(error.message);
  }
