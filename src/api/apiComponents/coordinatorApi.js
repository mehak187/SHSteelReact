import { apiSlice } from "../apiSlice";

export const coordinatorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoordinatorsList: builder.query({
      query: () => "coordinators",
      providesTags: ["Coordinator"],
    }),
    createCoordinator: builder.mutation({
      query: (data) => ({
        url: "createCoordinator",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Coordinator", "Dashboard"],
    }),
    updateCoordinator: builder.mutation({
      query: ({ id, data }) => ({
        url: `updateCoordinator/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Coordinator", "Dashboard"],
    }),
    deleteCoordinator: builder.mutation({
      query: (id) => ({
        url: `deleteCoordinator/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coordinator", "Dashboard"],
    }),
  }),
});

export const {
  useGetCoordinatorsListQuery,
  useCreateCoordinatorMutation,
  useUpdateCoordinatorMutation,
  useDeleteCoordinatorMutation,
} = coordinatorApi;
