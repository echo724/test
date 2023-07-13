
const pr = await github.rest.pulls.get({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.issue.number
});
// find issue number from 'feat/foo-bar-1234' branch name where 1234 is issueNumber
const issueNumber = pr.data.head.ref.match(/.*-(\d+)/)[1];
const issue = await github.rest.issues.get({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: issueNumber
});
const issueBody = issue.data.body;
// find all tasks as multiple literals like "- [ ] task1\n - [ ] task2\n" under '### ✅ Tasks' section
const tasks = issueBody.match(/### ✅ Tasks\n- \[ \] .*\n/g);
console.log("tasks")
const newBody = `### 🛠️ Issue\n\n- close ${issueNumber}\n\n### ✅ Tasks\n\n${tasks}\n\n### ⏰ Time Difference\n\n- \n\n### 📝 Note\n\n- `;
await github.rest.pulls.update({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.issue.number,
    body: newBody
});