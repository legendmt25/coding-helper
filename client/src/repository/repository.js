import { getAuthentication } from '../components/utility';

function createHeaders(withAuthorization, withContentType = true) {
  let x = { Accept: 'application/json' };
  if (withAuthorization)
    x['Authorization'] = `Bearer ${getAuthentication().jwttoken}`;
  if (withContentType) {
    x['Content-Type'] = 'application/json';
  }
  return x;
}

const repository = {
  fetchGET(url, withAuthorization = false) {
    return fetch(`http://localhost:3000/${url}`, {
      headers: createHeaders(withAuthorization),
    }).then((res) => res.json());
  },
  fetchPOST(url, data, withAuthorization = false) {
    return fetch(`http://localhost:3000/${url}`, {
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
    return fetch(`http://localhost:3000/${url}`, {
      method: 'post',
      headers: createHeaders(withAuthorization, withContentType),
      body: formData,
    }).then((res) => res.json());
  },
  fetchDELETE(url, withAuthorization = true) {
    return fetch(`http://localhost:3000/${url}`, {
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
    return this.fetchGET(`problem/${id}`, true);
  },
  isProblemLiked(id) {
    return this.fetchPOST(
      `problem/${id}/is_liked`,
      {
        userEmail: getAuthentication().email,
      },
      true
    );
  },

  likeProblem(id) {
    return this.fetchPOST(
      `problem/${id}/like`,
      {
        userEmail: getAuthentication().email,
      },
      true
    );
  },
  createCategory(categoryName) {
    return this.fetchPOST('category/create', { name: categoryName }, true);
  },
  createProblem(formData) {
    return this.fetchPOSTwithFormData('problem/create', formData, true);
  },
  deleteProblem(id) {
    return this.fetchDELETE(`problem/${id}/delete`);
  },
  createSubmission(data) {
    return this.fetchPOST('submission/create', data, true);
  },
  uploadAvatar(formData) {
    return this.fetchPOSTwithFormData(
      'user/uploadAvatar',
      formData,
      true,
      false
    );
  },
};

export default repository;
