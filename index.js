const core = require('@actions/core');
const github = require('@actions/github');
const slack = require('./slack');
try {
  const slackToken=core.getInput('slack-token');
  const status = core.getInput('status');
  const slackChannel = core.getInput('slack-channel');
  const githubRunId=core.getInput('github-run-id');
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);

  slack(slackChannel,payload['repository']['name'],payload['head_commit']['message'],status, process.env.GITHUB_RUN_ID,slackToken)

} catch (error) {
  core.setFailed(error.message);
}
