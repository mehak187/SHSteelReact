import { apiSlice } from "../apiSlice";

export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (data) => ({
        url: "createProject",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Project", "Dashboard"],
    }),
  }),
});

export const { useCreateProjectMutation } = projectApi;
