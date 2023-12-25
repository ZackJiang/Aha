import axios from 'axios';
import { ProfilesInfo } from '../common/types';

const API_BASE_URL = 'https://avl-frontend-exam.herokuapp.com/api';

export const fetchProfiles = async (
  page: number,
  pageSize: number,
  isFollowingMode: boolean,
): Promise<ProfilesInfo> => {
  try {
    let response;
    if (isFollowingMode) {
      response = await axios.get(
        `${API_BASE_URL}/users/friends?page=${page}&pageSize=${pageSize}`,
      );
    } else {
      response = await axios.get(
        `${API_BASE_URL}/users/all?page=${page}&pageSize=${pageSize}`,
      );
    }
    return {
      totalPages: response.data.totalPages,
      profiles: response.data.data,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchData = async () => {};
