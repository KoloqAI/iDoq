import { create } from "zustand";

export const useProjectsStore = create((set) => ({
  projects: [],
  loading: false,
  error: null,

  setProjects: (projects) => set({ projects }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  fetchProjects: async (axiosPrivate, orgId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosPrivate({
        method: "GET",
        url: `/api/v1/unstract/${orgId}/projects/`,
      });
      set({ projects: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createProject: async (axiosPrivate, orgId, projectData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosPrivate({
        method: "POST",
        url: `/api/v1/unstract/${orgId}/projects/`,
        data: projectData,
      });
      set((state) => ({
        projects: [...state.projects, response.data],
        loading: false,
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));
