import { apiSlice } from "../apiSlice";

export const managerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createManager: builder.mutation({
      query: (data) => ({
        url: "createManager",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Manager", "Dashboard"],
    }),
    updateManager: builder.mutation({
      query: ({ id, data }) => ({
        url: `updateManager/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Manager", "Dashboard"],
    }),
    deleteManager: builder.mutation({
      query: (id) => ({
        url: `deleteManager/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Manager", "Dashboard"],
    }),
    getManagersList: builder.query({
      query: () => "managers",
      providesTags: ["Manager"],
    }),
  }),
});

export const {
  useCreateManagerMutation,
  useGetManagersListQuery,
  useUpdateManagerMutation,
  useDeleteManagerMutation,
} = managerApi;
