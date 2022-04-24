import { getAuthentication, parseJwt } from '../components/utility';

export const domain = 'http://192.168.100.4:3000';

function createHeaders(withAuthorization, withContentType = true) {
  let x = { Accept: 'application/json' };
  if (withAuthorization)
    x['Authorization'] = `Bearer ${getAuthentication().jwttoken}`;
  if (withContentType) x['Content-Type'] = 'application/json';
  return x;
}

const repository = {
  fetchGET(url, withAuthorization = false) {
    return fetch(`${domain}/api/${url}`, {
      headers: createHeaders(withAuthorization),
    }).then((res) => res.json());
  },
  fetchPOST(url, data, withAuthorization = false) {
    return fetch(`${domain}/api/${url}`, {
      method: 'post',
      headers: createHeaders(withAuthorization),
      body: JSON.stringify(data),
    }).then((res) => res.json());
  },
  fetchPOSTwithFormData(
    url,
    formData,
    withAuthorization = false,
    withContentType = false
  ) {
    return fetch(`${domain}/api/${url}`, {
      method: 'post',
      headers: createHeaders(withAuthorization, withContentType),
      body: formData,
    }).then((res) => {
      if (!res.ok) throw new Error('Something happend, try again later');
      return res.json();
    });
  },
  fetchDELETE(url, withAuthorization = true) {
    return fetch(`${domain}/api/${url}`, {
      method: 'delete',
      headers: createHeaders(withAuthorization),
    }).then((res) => res.json());
  },
  findAllSubmissions(data) {
    return this.fetchPOST('submissions', data, true);
  },
  findAllProblems(filters) {
    return this.fetchPOST('problems', {
      categories: [...filters],
    });
  },
  findTop10Problems() {
    return this.fetchGET('problems/top10');
  },
  findAllCategories() {
    return this.fetchGET('categories');
  },
  findProblemById(id) {
    return this.fetchGET(`problem/${id}`, false);
  },
  isProblemLiked(id, data) {
    return this.fetchPOST(`problem/${id}/is_liked`, data, true);
  },

  likeProblem(id, data) {
    return this.fetchPOST(`problem/${id}/like`, data, true);
  },
  createCategory(categoryName) {
    return this.fetchPOST('category/create', { name: categoryName }, true);
  },
  createProblem(formData) {
    return this.fetchPOSTwithFormData('problem/create', formData, true);
  },
  updateProblem(id, data) {
    return this.fetchPOST(`problem/${id}/edit`, data, true);
  },
  deleteProblem(id) {
    return this.fetchDELETE(`problem/${id}/delete`);
  },
  createSubmission(data) {
    return this.fetchPOST('submission/create', data, true);
  },
  uploadAvatar(formData) {
    return this.fetchPOSTwithFormData(
      'user/upload-avatar',
      formData,
      true,
      false
    );
  },
  findAllContests() {
    return this.fetchGET('contests');
  },
  findContestById(id) {
    return this.fetchGET(`contest/${id}`);
  },
  createContest(data) {
    return this.fetchPOST('contest/create', data, true);
  },
  updateContest(id, data) {
    return this.fetchPOST(`contest/${id}/edit`, data, true);
  },
  createContestProblem(contestId, formData) {
    return this.fetchPOSTwithFormData(
      `contest/${contestId}/add-problem`,
      formData,
      true
    );
  },
  removeContestProblem(contestId, problemId) {
    return this.fetchDELETE(
      `contest/${contestId}/remove-problem/${problemId}`
    );
  },
  setContestProblemScore(contestId, problemId, score) {
    return this.fetchPOST(
      `contest/${contestId}/problem/${problemId}/set-score`,
      { score: score },
      true
    );
  },
  startContest(id) {
    return this.fetchGET(`contest/${id}/start`, true);
  },
  closeContest(id) {
    return this.fetchGET(`contest/${id}/close`, true);
  },
  getContestProblem(contestId, problemId) {
    return this.fetchGET(`contest/${contestId}/problem/${problemId}`, true);
  },
  deleteContest(contestId) {
    return this.fetchDELETE(`contest/${contestId}/delete`, true);
  },
  runCode(data) {
    return this.fetchPOST('run-code', data, true);
  },
  getUsersWithTotalSolved() {
    return this.fetchGET('users-with-total-accepted');
  },
};

export default repository;
