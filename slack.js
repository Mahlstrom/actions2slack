const {WebClient} = require('@slack/web-api');

function send2slack(channelName, githubRepo, revData, status, githubId, slackToken) {
    const web = new WebClient(slackToken);

    const colors = {
        'STARTED': "#4f4f4f",
        'SUCCEEDED': "#36a64f",
        'FAILED': "#a6364f"
    };
    let convId = '';
    (async () => {
        const rres = await web.conversations.list();
        for (chan in rres.channels) {
            if (rres.channels[chan].name == channelName) {
                convId = rres.channels[chan].id
            }
        }

        const res = await web.chat.postMessage({
            channel: convId,
            username: 'Github Actions',
            'attachments': [{
                "color": colors[status],
                'fields': [
                    {
                        'title': githubRepo,
                        'value': status,
                        'short': true
                    },
                    {
                        'title': 'Revision',
                        'value': revData,
                        'short': true
                    },
                ],
                'footer': githubId + '.'
            }]
        });
        console.log('Message sent: ', res.ts);
        console.log('foundid: ', convId);
    })();
}

module.exports = send2slack;
