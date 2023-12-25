import axios from 'axios';
import { ProfilesInfo, Tag } from '../common/types';

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

export const fetchTags = async (): Promise<Tag[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tags`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const searchProfiles = async (
  page: number,
  pageSize: number,
  keyword: string,
): Promise<ProfilesInfo> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/users/all?page=${page}&pageSize=${pageSize}&keyword=${keyword}`,
    );
    return {
      totalPages: response.data.totalPages,
      profiles: response.data.data,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
