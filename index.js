const core = require('@actions/core');
const github = require('@actions/github');


try {
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    const comment = JSON.stringify(github.context.payload.comment.body, undefined, 2)
    const pr = JSON.stringify(github.context.payload.pull_request.body)
    console.log(`The event comment: ${comment} & the event pr: ${pr}`);
<<<<<<< HEAD
    console.log(time)
  }  catch (error) {
=======
  } catch (error) {
>>>>>>> fac9ac0f44daeccd67278010be1e96f3e847e8a8
    core.setFailed(error.message);
  }
