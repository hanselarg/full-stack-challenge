import { takeLatest, call, put } from 'redux-saga/effects';
import { setProjects, setError, setLoading } from './projectSlice';

const API_URL = 'http://localhost:8000/api';

function* fetchProjects(action) {
  try {
    yield put(setLoading(true));
    const type = action.payload;
    const url = type ? `${API_URL}/projects?project_type=${type}` : `${API_URL}/projects`;
    const response = yield call(fetch, url);
    const data = yield response.json();
    yield put(setProjects(data));
  } catch (error) {
    yield put(setError(error.message));
  }
}

export function* projectSaga() {
  yield takeLatest('FETCH_PROJECTS', fetchProjects);
} 