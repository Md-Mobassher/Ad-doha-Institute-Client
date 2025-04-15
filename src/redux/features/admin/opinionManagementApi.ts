import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-Types";

const opinionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOpinion: build.mutation({
      query: (data) => ({
        url: "/opinions",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.opinion],
    }),

    getAllOpinions: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/opinions",
        method: "GET",
        params: arg,
      }),
      // transformResponse: (response: IDepartment[], meta: IMeta) => {
      //   return {
      //     departments: response,
      //     meta,
      //   };
      // },
      providesTags: [tagTypes.opinion],
    }),

    getSingleOpinion: build.query({
      query: (id) => ({
        url: `/opinions/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.opinion],
    }),

    deleteOpinion: build.mutation({
      query: (id) => ({
        url: `/opinions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.opinion],
    }),

    updateOpinion: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `/opinions/${id}`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.opinion],
    }),
  }),
});

export const {
  useCreateOpinionMutation,
  useGetAllOpinionsQuery,
  useGetSingleOpinionQuery,
  useDeleteOpinionMutation,
  useUpdateOpinionMutation,
} = opinionApi;
